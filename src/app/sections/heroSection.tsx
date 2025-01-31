'use client'
import { HambergerMenu } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MobileNav } from './mobile-nav'

const HeroSection = () => {
  const router = useRouter();
  const [navState, setNavState] = useState(false);
  return (
    <div className='lg:h-[90vh] h-[75vh] w-full bg-image-with-overlay'>
        <nav className='flex p-6 items-center justify-between'>
            <Link href={'/'}>
              <Image 
                src={'https://res.cloudinary.com/tech-aku/image/upload/v1738105945/mallgrid/67719ec26cf2f770a4bfc32e/e2otimzj8zlvvbfaxa0v.png'}
                alt='YEMs-logo'
                width={60}
                height={60}
              />
            </Link>
            <HambergerMenu onClick={() => setNavState(!navState)} size="32" color="#ffffff"/>
        </nav>
        <div className=' flex flex-col items-center justify-center h-[55vh]'>
        <h1 className='text-white lg:text-[3rem] font-gara text-[1.8rem] text-center font-semibold px-4 lg:w-[800px]'>Young People Love Jesus Camp Meeting 2025</h1>
        <p className='text-white text-center  font-gara p-6 text-[18px]'>Breaking Limits, a moment of an encounter with God, through worship and fellowship.</p>
        <button onClick={() => router.push('/register')} className='w-[240px] border-white border text-white py-4 font-semibold text-[18px]'>Register Here</button>
        </div>
        <MobileNav open={navState} close={() => setNavState(false)}/>
    </div>
  )
}


export default HeroSection