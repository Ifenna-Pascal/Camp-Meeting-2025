/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import AppModal from './modal'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { seminarImages } from '@/__mock_data__/events';

interface IProp {
    close: ()=> void, 
    open: boolean;
    images: string[];
    title: string
}

export const DetailsModal = ({open, close, title}: IProp ) => {
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
    <AppModal openState={open} closeModal={close} title={title}>
     <div className='w-full'>
     <Slider {...settings}>
        {seminarImages.map((image, i) => {
            return (
                <Image key={i} src={image} width={300} height={200} alt="event-img" className='w-[300px] rounded-[10px] h-[200px] object-cover mb-3' />   
            )
        })}
      </Slider>
     </div>
    </AppModal>
  )
}
