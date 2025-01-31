/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { InputComponent, SelectInput, TextAreaInput } from './input'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { nigeriaStates } from '@/__mock_data__/states';
import { emailExists, generateRandomToken } from '../config/random';
import Image from 'next/image';
import Link from 'next/link';
import { HambergerMenu } from 'iconsax-react';
import SuccessModal from '../success-modal';
import { MobileNav } from '../sections/mobile-nav';


const contactSchema = yup.object().shape({
  firstname: yup.string().required("first name is required"),
  lastname: yup.string().required("last name is required"),
  email: yup.string().email().required("email is required"),
  branch: yup.string().optional(),
  ageRange: yup.string().required('select age range'),
  location: yup.string().required("location is required"),
  origin : yup.string().required('state of origin is required'),
  gender: yup.string().required('gender is required'),
  hasDisability: yup.string().required(),
  expectations: yup.string().optional(),
});

const RegistrationPage = () => {
    const [open, setOpen] = useState(false);
    const [navState, setNavState] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(contactSchema),
      });

      const submitHandler = async (data: any) => {
        setLoading(true);
        const info = await emailExists(data.email, 'https://sheetdb.io/api/v1/bx688nkln60rt' as string).catch(() => {
          setLoading(false);
         return  toast.error('something went wrong!!');
        });
        if (info) {
          toast.error(info);
          setLoading(false);
          return;
        }
        const token = generateRandomToken()
        fetch('https://sheetdb.io/api/v1/bx688nkln60rt' as string, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            ...data,
            accessToken: token,
            id: "TIMESTAMP",
          }),
        })
          .then(() => {
            fetch( `https://mallgrid-backend-5gh9.onrender.com/api/v1/auth/send-camp-mail`, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                code: token,
                firstName: data.firstname,
                email: data.email
              }),
            })
            .then(() => {
              setLoading(false);
              toast.success("Message sent successfully");
              setOpen(true)
              reset();
            })
            .catch((err) => {
              setLoading(false);
              throw err
            })
          })
         
          .catch((err) => {
            setLoading(false);
            console.error("Error submitting form:", err);
            toast.error("An error occurred. Please try again");
          })
       
      };
  return (
  <div>
    <div className='lg:h-[30vh] h-[30vh] w-full bg-image-with-overlay'>
    <nav className='flex px-6 py-4 items-center justify-between'>
            <Link href={'/'}>
              <Image
                src={'https://res.cloudinary.com/tech-aku/image/upload/v1738105945/mallgrid/67719ec26cf2f770a4bfc32e/e2otimzj8zlvvbfaxa0v.png'}
                alt='YEMs-logo'
                width={60}
                height={60}
              />
            </Link>
            <HambergerMenu onClick={() => setNavState(true)} size="32" color="#ffffff"/>
        </nav>
        <h1 className='text-white text-center mt-8 text-[30px] font-semibold'>Register</h1>
    </div>
    <form onSubmit={handleSubmit(submitHandler)} className='p-6 pt-8'>
        <InputComponent 
            label='First Name' 
            placeholder='John' 
            {...register("firstname")}
            err={errors["firstname"]?.message}

        />
        <InputComponent 
            label='Last Name' 
            placeholder='Doe' 
            {...register("lastname")}
            err={errors["lastname"]?.message}
        />
        <InputComponent 
            label='Email' 
            placeholder='johndoe@gmail.com' 
            {...register("email")}
            err={errors["email"]?.message}
        />
           <SelectInput label='Select Gender' options={[
          {
            value: 'male',
            label: 'Male'
          },
          {
            value: 'female',
            label: 'Female'
          },
        ]} 
        {...register("gender")}
        />

        <SelectInput label='Select Age Range'
                  {...register("ageRange")}
                  err={errors["ageRange"]?.message}
                  options={[
                    {
                      value: '0-18',
                      label: '0-18'
                    },
                    {
                      value: '18-30',
                      label: '18-30'
                    },
                    {
                      value: '30-45',
                      label: '30-45'
                    },
                    {
                      value: '45-Above',
                      label: '45-Above'
                    },
          ]}
        />
        <SelectInput label='State of Origin '
          {...register("origin")}
          err={errors["origin"]?.message}
          options={nigeriaStates}
        />
        <SelectInput label='State Of Residence'
          {...register("location")}
          err={errors["location"]?.message}
          options={nigeriaStates}
        />
        <SelectInput label='Select YEMs Branch Closest To You'
          {...register("branch")}
          optional={true}
          err={errors["branch"]?.message}
          options={[
            {
              value: 'lagos',
              label: 'Lagos'
            },
            {
              value: 'enugu',
              label: 'Enugu'
            },
            {
              value: 'umuahia',
              label: 'Umuahia'
            },
            {
              value: 'nsukka',
              label: 'Nsukka'
            },
          ]}
        />
    <SelectInput label='Any Disability' 
          {...register("hasDisability")}
        options={[
          {
            value: 'yes',
            label: 'Yes'
          },
          {
            value: 'no',
            label: 'No'
          },
        ]} />
      
        <TextAreaInput 
            optional
            placeholder='My expectations !!!!'
            label='What are your expectations?' 
          {...register("expectations")}
        />
        <button className='w-[230px] mt-4 bg-gray-700  border-none text-white py-4 font-semibold text-[18px]'>{loading ? 'Loading...' : 'Register Here'}</button>
    </form>
    <ToastContainer />
    <SuccessModal open={open} close={() => setOpen(false)} />
    <MobileNav open={navState} close={() => setNavState(false)}/>  
  </div>
  )
}

export default RegistrationPage