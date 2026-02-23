'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AppModal from '../modal'

const BASE_URL = 'https://api.mallgrid.com'

enum CamperPaymentStatus {
  PENDING_PAYMENT = 'pending_payment',
  PAID = 'paid',
  FAILED = 'failed',
}

function normalizePaymentStatus(value: unknown): CamperPaymentStatus | null {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : ''
  if (raw === CamperPaymentStatus.PENDING_PAYMENT) return CamperPaymentStatus.PENDING_PAYMENT
  if (raw === CamperPaymentStatus.PAID) return CamperPaymentStatus.PAID
  if (raw === CamperPaymentStatus.FAILED) return CamperPaymentStatus.FAILED
  return null
}

async function verifyPaymentReference(reference: string) {
  const url = `${BASE_URL}/api/v1/camping/verify-payment-reference?reference=${encodeURIComponent(reference)}`
  const res = await fetch(url, { method: 'GET' })
  const json = await res.json().catch(() => ({}))
  return { ok: res.ok, json }
}

function RecieptPageContent() {
  const searchParams = useSearchParams()
  const reference = useMemo(() => searchParams.get('trxref')?.trim() ?? '', [searchParams])

  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<CamperPaymentStatus | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    let cancelled = false

    async function run() {
      setLoading(true)
      setErrorMessage('')
      setPaymentStatus(null)

      if (!reference) {
        if (!cancelled) {
          setPaymentStatus(CamperPaymentStatus.FAILED)
          setErrorMessage('Missing Paystack reference in callback URL.')
          setOpen(true)
          setLoading(false)
        }
        return
      }

      try {
        const { ok, json } = await verifyPaymentReference(reference)

        const statusCandidate =
          json?.data?.paymentStatus ??
          json?.data?.payment_status ??
          json?.data?.status ??
          json?.paymentStatus ??
          json?.status

        const status = normalizePaymentStatus(statusCandidate) ?? (ok ? CamperPaymentStatus.PAID : CamperPaymentStatus.FAILED)

        if (!cancelled) {
          setPaymentStatus(status)
          if (!ok) {
            setErrorMessage(json?.message ?? 'Unable to verify payment reference.')
          }
          setOpen(true)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setPaymentStatus(CamperPaymentStatus.FAILED)
          setErrorMessage('Network error while verifying payment.')
          setOpen(true)
          setLoading(false)
        }
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [reference])

  const modalTitle =
    paymentStatus === CamperPaymentStatus.PAID
      ? 'Payment Successful'
      : paymentStatus === CamperPaymentStatus.PENDING_PAYMENT
        ? 'Payment Pending'
        : 'Payment Failed'

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto w-full max-w-[900px] px-6 py-10">
        <h1 className="font-poppins text-[28px] font-semibold text-grey-900">Receipt</h1>
        <p className="mt-2 text-[14px] text-gray-600">
          {reference ? (
            <>
              Verifying payment reference: <span className="font-semibold">{reference}</span>
            </>
          ) : (
            'No payment reference found in the URL.'
          )}
        </p>

        <div className="mt-6 rounded-xl bg-white p-6">
          {loading ? (
            <p className="text-gray-700">Verifying payment…</p>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-700">
                Status:{' '}
                <span className="font-semibold">
                  {paymentStatus ?? CamperPaymentStatus.FAILED}
                </span>
              </p>
              {!!errorMessage && <p className="text-[14px] text-red-600">{errorMessage}</p>}
              <div className="pt-2">
                <Link className="text-[14px] font-medium text-blue-600 underline" href="/register">
                  Go back to registration
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <AppModal openState={open} closeModal={() => setOpen(false)} title={modalTitle}>
        <div className="px-6 py-6 font-poppins">
          {paymentStatus === CamperPaymentStatus.PAID && (
            <div className="space-y-2">
              <p className="text-[18px] font-semibold text-green-700">Your payment was successful.</p>
              <p className="text-gray-700">You can close this page or return to registration.</p>
            </div>
          )}

          {paymentStatus === CamperPaymentStatus.PENDING_PAYMENT && (
            <div className="space-y-2">
              <p className="text-[18px] font-semibold text-amber-700">Your payment is still pending.</p>
              <p className="text-gray-700">Please wait a moment and refresh this page, or try again later.</p>
            </div>
          )}

          {paymentStatus === CamperPaymentStatus.FAILED && (
            <div className="space-y-2">
              <p className="text-[18px] font-semibold text-red-700">We couldn’t confirm your payment.</p>
              {!!errorMessage && <p className="text-[14px] text-red-600">{errorMessage}</p>}
              <p className="text-gray-700">If you were charged, contact support and share the reference.</p>
              {reference && <p className="text-gray-700">Reference: <span className="font-semibold">{reference}</span></p>}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-gray-900 px-4 py-2 text-[14px] font-semibold text-white"
            >
              Close
            </button>
            <Link
              href="/"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-semibold text-gray-900"
            >
              Register again
            </Link>
          </div>
        </div>
      </AppModal>
    </div>
  )
}

export default function RecieptPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA]">
          <div className="mx-auto w-full max-w-[900px] px-6 py-10">
            <h1 className="font-poppins text-[28px] font-semibold text-grey-900">Receipt</h1>
            <p className="mt-2 text-[14px] text-gray-600">Loading receipt…</p>
            <div className="mt-6 rounded-xl bg-white p-6">
              <p className="text-gray-700">Verifying payment…</p>
            </div>
          </div>
        </div>
      }
    >
      <RecieptPageContent />
    </Suspense>
  )
}
