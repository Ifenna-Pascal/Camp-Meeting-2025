'use client'
import { CalendarEdit, Information } from 'iconsax-react'
import React from 'react'

const CountDown = () => {
  return (
    <div className='pt-8' >
        <div data-aos="fade-left" className='flex flex-col  items-center justify-center pb-10'>
            <CalendarEdit size="32" color="#697689" variant="Bold"/>
            <span className='py-2 text-[16px]'>5 Days</span>
            <span className='text-center  w-[300px]'>Monday(17th February) - Friday(22nd February).</span>
        </div>
        <div data-aos="fade-right" className='flex flex-col items-center justify-center pb-14'>
        <Information size="32" color="#697689" variant="Bold"/>          
          <span  className='py-2'>3 Sessions Per Day</span>
            <span className='text-center  w-[300px]'>Morning Worship, Variety Sessions, Evening Sessions.</span>
        </div>
        <div data-aos="fade-left" className='flex flex-col items-center justify-center pb-14'>
            <CalendarEdit size="32" color="#697689" variant="Bold"/>
            <span  className='py-2'>Various Games</span>
            <span className='text-center  w-[300px]'>We bond through game and fun activities. Indoor and outdoor games, riddles, bible quiz and lot more.</span>
        </div>
    </div>
  )
}

export default CountDown