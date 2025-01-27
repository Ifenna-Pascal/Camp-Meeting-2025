'use client'
import { HambergerMenu } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className='lg:h-[90vh] h-[75vh] w-full bg-image-with-overlay'>
        <nav className='flex p-6 items-center justify-between'>
            <div></div>
            <HambergerMenu size="32" color="#ffffff"/>
        </nav>
        <div className=' flex flex-col items-center justify-center h-[65vh]'>
        <h1 className='text-white lg:text-[4rem]  text-[2.5rem] text-center font-semibold lg:w-[800px]'>Young People Love Jesus Camp Meeting 2025</h1>
        <p className='text-white text-center p-6 text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ad, cum tenetur aspernatur Mollitia animi eaque saepe, obcaecati sed iure!</p>
        <button onClick={() => router.push('/register')} className='w-[240px] border-white border text-white py-4 font-semibold text-[18px]'>Register Here</button>
        </div>
    </div>
  )
}

export default HeroSection