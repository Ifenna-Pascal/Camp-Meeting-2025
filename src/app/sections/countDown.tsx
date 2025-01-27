import { CalendarEdit, Star1 } from 'iconsax-react'
import React from 'react'

const CountDown = () => {
  return (
    <div>
        <div className='bg-image-with-overlays items-center flex flex-col justify-center -mt-5 study-bg-imgs p-10 pt-12 h-[450px]'>
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
                {[1,3,4,5].map((x, index) => <Star1 key={index} size="25" className='mb-3' color="#ff8a65" variant="Bold"/>)}
            </div>
            <span className='text-center text-white text-[18px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi facere nisi voluptatibus saepe. Quis dolorum voluptates ratione, veniam, sint quaerat nam sed incidunt qui enim laudantium, eius doloremque? Aliquam reiciendis cupiditate quia quaerat placeat nihil mollitia nisi eligendi ex exercitationem, harum recusandae aperiam omnis nobis eum beatae dolore ad repellat.</span>
            <span className='uppercase text-white font-bold pt-6 text-[16px]'>John .C. Peterson</span>
            </div>
        </div>
        <div className='flex flex-col  items-center justify-center py-10'>
            <CalendarEdit size="32" color="#697689" variant="Bold"/>
            <span className='py-2'>5 Days</span>
            <span className='text-center  w-[300px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, totam.</span>
        </div>
        <div className='flex flex-col items-center justify-center pb-12'>
            <CalendarEdit size="32" color="#697689" variant="Bold"/>
            <span  className='py-2'>5 Days</span>
            <span className='text-center  w-[300px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, totam.</span>
        </div>
        <div className='flex flex-col items-center justify-center pb-12'>
            <CalendarEdit size="32" color="#697689" variant="Bold"/>
            <span  className='py-2'>5 Days</span>
            <span className='text-center  w-[300px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, totam.</span>
        </div>
    </div>
  )
}

export default CountDown