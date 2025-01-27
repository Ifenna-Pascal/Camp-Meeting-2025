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
        title: 'Games & Sports'
    },

    {
        img: '/img/chess.jpg',
        title: 'Heart of worship'
    },
    {
        img: '/img/chess.jpg',
        title: 'Games & Sports'
    },

    {
        img: '/img/hero.jpg',
        title: 'Heart of worship'
    }
]

const Event = ({img, title}: IEvent) => {
    return (
        <div className='flex flex-col w-full h-[250px]'>
        <Image src={img} width={200} height={200} alt="event-img" className='w-[200px] h-[200px] object-cover mb-3' />
        <span className='text-center text-[18px] font-semibold'>{title}</span>
    </div>
    )
}
 
const TopEvents = () => {
    const router = useRouter();
  return (
    <>

    <div className='flex pb-16 flex-col'>
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
        <div className='bg-image-with-overlay mt-10 study-bg-imgs p-10 relative pt-12 h-[550px]'>
            <Image src={'/img/man.jpg'} alt='pastor_image' className='absolute -bottom-12' width={320} height={350} />
        </div>
        <div className='flex flex-col p-10 pt-20     items-center justify-center'>
            <span className='font-semibold text-[16px] pb-2'>FROM THE OFFICE OF THE PRESIDENT</span>
            <p className='text-center text-[16px]'>Lorem ipsum, dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui labore, consequatur voluptatum mollitia sint distinctio laudantium nostrum aliquam? Doloribus, assumenda? sit amet consectetur adipisicing elit. Distinctio a eaque labore quas rerum quidem, quaerat itaque maiores rem natus optio voluptates laboriosam similique fugit iusto architecto! Perferendis, voluptas debitis.</p>
            <button 
            onClick={() => router.push('/register')}
            className='w-[270px] mt-8 bg-gray-700  border-none text-white py-4 font-semibold text-[18px]'>Register Here</button>
            
        </div>
        
    </div>
    </>
  )
}

export default TopEvents