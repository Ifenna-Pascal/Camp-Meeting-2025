"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loader from "../components/loader";

const BASE_URL = "https://api.mallgrid.com";

enum CamperPaymentStatus {
  PENDING_PAYMENT = "pending_payment",
  PAID = "paid",
  FAILED = "failed",
}

function normalizePaymentStatus(value: unknown): CamperPaymentStatus | null {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (raw === CamperPaymentStatus.PENDING_PAYMENT)
    return CamperPaymentStatus.PENDING_PAYMENT;
  if (raw === CamperPaymentStatus.PAID) return CamperPaymentStatus.PAID;
  if (raw === CamperPaymentStatus.FAILED) return CamperPaymentStatus.FAILED;
  return null;
}

async function verifyPaymentReference(reference: string) {
  const url = `${BASE_URL}/api/v1/camping/verify-payment-reference?reference=${encodeURIComponent(reference)}`;
  const res = await fetch(url, { method: "GET" });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, json };
}

function RecieptPageContent() {
  const searchParams = useSearchParams();
  const reference = useMemo(
    () => searchParams.get("trxref")?.trim() ?? "",
    [searchParams],
  );

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] =
    useState<CamperPaymentStatus | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setErrorMessage("");
      setPaymentStatus(null);

      if (!reference) {
        if (!cancelled) {
          setPaymentStatus(CamperPaymentStatus.FAILED);
          setErrorMessage("Missing Paystack reference in callback URL.");
          setLoading(false);
        }
        return;
      }

      try {
        const { ok, json } = await verifyPaymentReference(reference);

        const statusCandidate =
          json?.data?.paymentStatus ??
          json?.data?.payment_status ??
          json?.data?.status ??
          json?.paymentStatus ??
          json?.status;

        const status =
          normalizePaymentStatus(statusCandidate) ??
          (ok ? CamperPaymentStatus.PAID : CamperPaymentStatus.FAILED);

        if (!cancelled) {
          setPaymentStatus(status);
          if (!ok) {
            setErrorMessage(
              json?.message ?? "Unable to verify payment reference.",
            );
          }
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setPaymentStatus(CamperPaymentStatus.FAILED);
          setErrorMessage("Network error while verifying payment.");
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen bg-image-with-overlay flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-white text-[18px] font-gara mt-6">
            Verifying payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-image-with-overlay flex items-center justify-center px-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl">
s     
        {paymentStatus === CamperPaymentStatus.PAID && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-[28px] font-gara font-semibold text-gray-900">
              Payment Successful!
            </h2>
            <p className="text-gray-600 font-poppins">
            Your registration for has been confirmed.
              Check your email for your <b>ACCESS TOKEN</b>.
            </p>
           
          </div>
        )}

        {/* Pending State */}
        {paymentStatus === CamperPaymentStatus.PENDING_PAYMENT && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-amber-600 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-[28px] font-gara font-semibold text-gray-900">
              Payment Pending
            </h2>
            <p className="text-gray-600 font-poppins">
              Your payment is being processed. This usually takes a few minutes.
            </p>
            <p className="text-[14px] text-gray-500">
              Please wait a moment and refresh this page to check the status.
            </p>
          </div>
        )}

        {/* Failed State */}
        {paymentStatus === CamperPaymentStatus.FAILED && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-[28px] font-gara font-semibold text-gray-900">
              Payment Failed
            </h2>
            <p className="text-gray-600 font-poppins">
              We couldn&apos;t confirm your payment. Please try again.
            </p>
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                <p className="text-[14px] text-red-700">{errorMessage}</p>
              </div>
            )}
            {reference && (
              <p className="text-[14px] text-gray-500">
                Reference:{" "}
                <span className="font-mono font-semibold">{reference}</span>
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Link
            href="/"
            className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-poppins font-semibold text-center block hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>

          {paymentStatus === CamperPaymentStatus.FAILED && (
            <Link
              href="/register"
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-poppins font-semibold text-center block hover:bg-gray-50 transition-colors"
            >
              Try Again
            </Link>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-[12px] text-gray-500 font-poppins">
            #GreaterGlory 🔥 YPLJ Camp Meeting 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RecieptPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-image-with-overlay flex items-center justify-center">
          <div className="text-center">
            <Loader />
            <p className="text-white text-[18px] font-gara mt-6">
              Loading receipt...
            </p>
          </div>
        </div>
      }
    >
      <RecieptPageContent />
    </Suspense>
  );
}
