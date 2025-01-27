/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { InputComponent, SelectInput, TextAreaInput } from './input'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";


const contactSchema = yup.object().shape({
  firstname: yup.string().required("first name is required"),
  lastname: yup.string().required("last name is required"),
  email: yup.string().required("email is required"),
  branch: yup.string().required("branch name is required"),
  location: yup.string().required("location is required"),
  message: yup.string().optional(),
});


const RegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(contactSchema),
      });

      const submitHandler = (data: any) => {
        setLoading(true);
        fetch('https://sheetdb.io/api/v1/bx688nkln60rt', {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            ...data,
            id: "TIMESTAMP",
          }),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Message sent successfully");
            reset();
          })
          .catch((err) => {
            console.error("Error submitting form:", err);
            toast.error("An error occurred. Please try again");
          })
          .finally(() => {
            setLoading(false);
          });
      };
  return (
  <div>
    <div className='lg:h-[30vh] flex items-center justify-center h-[30vh] w-full bg-image-with-overlay'>
        <h1 className='text-white text-[30px] font-semibold'>Register</h1>
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
        <SelectInput label='Select Branch'
          {...register("branch")}
          err={errors["branch"]?.message}
        />
        <InputComponent 
            label='Location' 
            placeholder='...' 
          {...register("location")}
            err={errors["location"]?.message}
        />
        <TextAreaInput 
            label='Drop Comment' 
          {...register("message")}
        />
        <button className='w-[230px] mt-4 bg-gray-700  border-none text-white py-4 font-semibold text-[18px]'>{loading ? 'Loading...' : 'Register Here'}</button>
    </form>
    <ToastContainer />
  </div>
  )
}

export default RegistrationPage