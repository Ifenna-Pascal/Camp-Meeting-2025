'use client'
import Image from 'next/image';
import React from 'react'
import Timer from './timer';
import { useRouter } from 'next/navigation';

interface IEvent {
    img: string;
    title: string
}

const events = [
    {
        img: '/img/hero.jpg',
        title: 'The Word'
    },
    {
        img: '/img/chess.jpg',
        title: 'Games & Sports'
    },

    {
        img: '/img/chess.jpg',
        title: 'Heart of Music'
    },
    {
        img: '/img/chess.jpg',
        title: 'Seminars (Academic & Career)'
    },
]

const Event = ({img, title}: IEvent) => {
    return (
        <div className='flex flex-col w-full h-[250px]'>
        <Image src={img} width={200} height={220} alt="event-img" className='w-[200px] h-[200px] object-cover mb-3' />
        <span className='text-center h-[50px] text-[18px] font-semibold'>{title}</span>
    </div>
    )
}
 
const TopEvents = () => {
    const router = useRouter();
  return (
    <>

    <div className='flex pb-8 flex-col'>
        <h2 className='text-[25px] text-center font-semibold py-8'>Top Events</h2>
        <div className='px-5 grid grid-cols-2 gap-6'>
            {
                events.map((event, index) => {
                    return (
                        <Event key={index} img={event.img}  title={event.title}/>
                    )
                })
            }
        </div>
        <Timer />
        <div className='bg-image-with-overlay mt-10 study-bg-imgs p-10 relative h-[400px]'>
            <Image src={'/img/president.jpeg'} alt='pastor_image' className='absolute  -bottom-3' width={320} height={300} />
        </div>
        <div className='flex flex-col p-10  items-center justify-center'>
            <span className='font-semibold font-gara text-[16px] pb-2'>FROM THE OFFICE OF THE PRESIDENT</span>
            <p className='text-center text-[16px]'>I wish to welcome everyone to the Young People Love Jesus Camp Meeting 2025, with theme Breaking Limits, a moment of encounter with God, where purpose is defined and our fire for God stirred. Your expectations and anticipations, will not be cut short. </p>
            <button 
            onClick={() => router.push('/register')}
            className='w-[270px] mt-8 bg-gray-700  border-none text-white py-4 font-semibold text-[18px]'>Register Here</button>
            
        </div>
        
    </div>
    </>
  )
}

export default TopEvents