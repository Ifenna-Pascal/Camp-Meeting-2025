/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import AppModal from './modal'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

interface IProp {
    close: ()=> void, 
    open: boolean;
    images: string[];
    title: string
}

export const DetailsModal = ({open, images,  close, title}: IProp ) => {
  
  return (
    <AppModal openState={open} closeModal={close} title={title}>
     <div className='px-4 py-2 h-[480px] overflow-auto'>
        {images.map((image, i) => {
            return (
              <div key={i} className='relative'>
              <Image  src={image} width={300} height={200} alt="event-img" className='w-full  mx-auto rounded-[10px] h-[250px] object-cover mb-3' />  
              <div className='absolute top-0 left-0 bg-black/30 w-full rounded-[10px] h-[250px]'></div> 
              </div>
            )
        })}
        </div>
    </AppModal>
  )
}
