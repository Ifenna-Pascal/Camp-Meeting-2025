/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ministers } from "@/__mock_data__/ministers";
import Image from "next/image";

const Guests = () => {
  const [current, setCurrent] = useState(0);
  const settings = {
    className: "center",
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    arrows: false,
    slideToScrool: 2,
    focusOnSelect: true,
    draggable: true,
    dots: true,
    autoplaySpeed: 5000,
    speed: 2000,
    afterChange: (current: number) => setCurrent(current),
    customPaging: (i: any) => (
      <div
        className={`w-[25px]  mt-8 h-[4px] rounded-[10px] ${
          current === i ? "bg-black" : "bg-gray-300"
        }`}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 450,
        settings: {
          autoplay: true,
          centerMode: false,
          infinite: true,
          slidesToShow: 1,
          slideToScroll: 1,
          arrows: false,
          draggable: true,
          dots: true,
          autoplaySped: 1000,
          speed: 500,
          beforeChange: (current:number) => setCurrent(current),
          customPaging: (i: any) => (
            <div
              className={`w-[3px]  mt-3 h-[3px] rounded-[3px] ${
                current === i ? "bg-gray-900" : "bg-gray-400"
              }`}
            ></div>
          ),
        },
      },
    ],
  };

  return (
    <div className="lg:max-w-[1100px] mx-11  mb-12">
    <h2 className='font-semibold text-[22px] mb-2   text-center flex items-center justify-center pb-2'>Our Ministers</h2>
      <Slider {...settings}>
        {
            ministers.map((minister, i) => {
                return (
                    <div key={i} className='flex items-center justify-center flex-col mx-auto w-full h-[450px]'>
                        <Image src={minister.img} width={300} height={400} alt="event-img" className='w-full rounded-[10px] h-[400px] object-cover mb-3' />
                        <span className='text-center flex items-center w-full justify-center font-poppins uppercase text-[14px] font-semibold'>{minister.name}</span>
                     </div>
                )
            })
        }
      </Slider>
    </div>
  );
};

export default Guests;