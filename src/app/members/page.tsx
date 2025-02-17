/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { SearchNormal } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { useDebounce } from './debounce';

interface IMember {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    branch: string;
    ageRange: string;
    location: string;
    origin: string;
    gender: string;
    hasDisability: string;
    expectations: string;
    accessToken: string
}

const Members = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false)
     const [members, setMembers] = useState<IMember[] | null>(null)
    const handleChange = (e:any) => {
        setInput(e.target.value)
    }

const search = useDebounce(input)
useEffect(()=> {
    setLoading(true)
    const getMembers = () => {
       if(search){
        fetch(`https://sheetdb.io/api/v1/uvetxjfjpms7z/search?accessToken=YPLJ-2025-${search}`)
        .then((response) => response.json())
        .then((data) => {
            setMembers(data)
            setLoading(false)
        });
       }else {
        fetch(`https://sheetdb.io/api/v1/uvetxjfjpms7z?sort_by=id&sort_order=desc`)
        .then((response) => response.json())
        .then((data) => {
            setLoading(false)
            setMembers(data)
        });
       }
    }
    getMembers()
}, [search])

  return (
    <div>
    <div className='lg:h-[40vh] flex items-center justify-center h-[75vh] w-full bg-image-with-overlay'> 
    <h1 className='font-semibold font-montserat text-white text-[32px]'>CAMP MEETING REGISTERED MEMBERS</h1>
    </div>
       
       <div className='p-6 relative'>
       <SearchNormal size="20" color="#697689" className='absolute left-10 top-10'/>
        <input type="text" onChange={handleChange} placeholder='Search by access code 4 digit numbers' className='w-full text-[16px] h-[35px] font-poppins bg-gray-50 p-6 pl-12 focus:outline-none mb-6' />
       <div>
      <div className="overflow-x-auto font-poppins">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">S/N</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Access Token</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Fullname</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Branch</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Has Disability</th>

            </tr>
          </thead>
          <tbody className='capitalize'>
            {loading && <div className='flex items-center text-[18px] justify-center'>Loading...</div>}
            {members && members.map((user, index) => (
              <tr
                key={user.email}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.accessToken}</td>
                <td className="px-6 py-4">{`${user.firstname} ${user.lastname}`}</td>
                <td className="px-6 lowercase py-4">{user.email}</td>
                <td className="px-6 py-4">{user.branch}</td>
                <td className="px-6 py-4">{user.location}</td>            
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">{user.hasDisability}</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
       </div>
    </div>
  )
}

export default Members


