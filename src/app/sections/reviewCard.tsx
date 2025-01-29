/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

function ReviewCard({ name, role, src, review }: any) {
  return (
    <div className="min-w-[300px] relative  mx-4 min-h-[300px] flex shadow-md">
      <div className="flex absolute top-2 left-2 py-2">
        <i className="ri-single-quotes-r text-5xl text-gray-300 font-semibold"></i>
        <i className="ri-single-quotes-r text-5xl -ml-5  text-gray-300 font-semibold"></i>
      </div>
      <div className="flex flex-col relative pt-16 pb-6 px-5">
        <p className="py-4 text-[14px] font-poppins text-gray-600">{review}</p>
        <div className="flex flex-col w-full">
          <div className="w-[60px] mt-3 h-[60px]">
            <Image
              className="w-full rounded-[50%] object-center object-cover bg-center bg-cover h-full"
              src={src}
              alt="image"
              width={100}
              height={100}
            />
          </div>
          <h1 className="font-sono pt-2 text-lg font-semibold">{name}</h1>
          <p className="text-base font-sono text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
