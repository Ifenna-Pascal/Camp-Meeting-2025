'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import Timer from './timer';
import { useRouter } from 'next/navigation';
import { DetailsModal } from '../details-modal';
import { seminarImages } from '@/__mock_data__/events';

interface IEvent {
    img: string;
    title: string,
    imgs: string[],
    point: number,
}

const events = [
    {
        img: '/img/study.jpg',
        title: 'The Word',
        imgs: []
    },
    {
        img: '/img/people.jpg',
        title: 'Heart of Music',
        imgs: []
    },
    {
        img: '/img/chess.jpg',
        title: 'Games & Sports',
        imgs: []
    },
    {
        img: '/img/seminar-2.jpg',
        title: 'Seminars',
        imgs: seminarImages
    },
]

const Event = ({img, title, imgs, point}: IEvent) => {
    const [showDetails, setShowDetails] = useState(false);
    // const [current, setCurrent] = useState(0)
    // const setAction = (index: number) => {
    //     setCurrent(index);
    //     setShowDetails(true)
    // }
    // onClick={() => setAction(point)}
    return (
        <div className='flex flex-col w-full h-[250px]' >
        <Image src={img} width={200} height={220} alt="event-img" className='w-[210px] h-[210px] rounded-md object-cover mb-3' />
        <span className='text-center h-[50px] font-poppins text-[14px] font-semibold'>{title}</span>
        {/* {showDetails && point === current && <DetailsModal images={imgs} open={showDetails} close={() => setShowDetails(false)} title={`${title} In A Glance`} />} */}
    </div>

    )
}
 
const TopEvents = () => {
    const router = useRouter();
  return (
    <div id='events' className='flex pb-8 flex-col' >
        <h2 className='text-[25px] text-center font-semibold py-8'>Top Events</h2>
        <div className='px-5 grid grid-cols-2 gap-4' data-aos="fade-right">
            {
                events.map((event, index) => {
                    return (
                        <Event imgs={event.imgs} key={index} point={index} img={event.img}  title={event.title}/>
                    )
                })
            }
        </div>
        <Timer />
        <div className='mt-10 bg-red-300'>
            <Image src={'/img/flyer.jpeg'} alt='flyer-img' className='w-full h-[300px]' width={320} height={300}  />
        </div>
        <div className='bg-image-with-overlay  study-bg-imgs p-10 relative h-[400px]'>
            <Image src={'/img/president.jpeg'} alt='pastor_image' className='absolute rounded-t-xl -bottom-3' width={320} height={300} />
        </div>
        <div className='flex flex-col p-10  items-center justify-center'>
            <span className='font-semibold font-gara text-[16px] pb-2'>FROM THE OFFICE OF THE PRESIDENT</span>
            <p className='text-center text-[16px]'>I wish to welcome everyone to the Young People Love Jesus Camp Meeting 2025, with theme Breaking Limits, a moment of encounter with God, where purpose is defined and our fire for God stirred. Your expectations and anticipations, will not be cut short. </p>
            <button 
            onClick={() => router.push('/register')}
            className='w-[270px] mt-8 bg-gray-700  border-none text-white py-4 font-semibold text-[18px]'>Register Here</button>
            
        </div>
        
    </div>
    
  )
}

export default TopEvents