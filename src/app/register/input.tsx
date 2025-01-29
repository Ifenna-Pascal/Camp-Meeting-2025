import React, { InputHTMLAttributes } from 'react'

interface IProp extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    err?: string;
    placeholder?: string;
}

interface ITextArea  {
    label: string;
    err?: string;
    placeholder?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    err?: string;
    options: {
      label: string;
      value: string;
    }[]
}

export const InputComponent = ({label, err, placeholder, ...props}:IProp) => {
  return (
    <div className='flex flex-col mb-6'>
        <div className='flex items-center space-x-1'>
        <label className='mb-1' htmlFor={label}>{label}</label> <span className='text-red-600 text-[20px]'>*</span>
        </div>
        <input type="text" className='w-full p-3 rounded-[3px] h-[50px] border border-gray-300 focus:outline-none' placeholder={placeholder} {...props}/>
        <span className='text-red-400'>{err}</span>
    </div>
  )
}
export const SelectInput = ({label, err, options, ...props}:SelectProps) => {
    return     <div className='flex flex-col mb-6'>
    <div className='flex items-center space-x-1'>
    <label className='mb-1' htmlFor={label}>{label}</label> <span className='text-red-600 text-[20px]'>*</span>
    </div>
    <select className='w-full p-3 rounded-[3px] h-[50px] border border-gray-300 focus:outline-none' {...props}>
        <option disabled defaultChecked>Select</option>
        {
          options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))
        }
    </select>
    <span className='text-red-400'>{err}</span>
</div>
}

export const TextAreaInput = ({label, err, placeholder, ...props}:ITextArea) => {
    return (
      <div className='flex flex-col mb-6'>
          <div className='flex items-center space-x-1'>
          <label className='mb-1' htmlFor={label}>{label}</label> <span className='text-red-600 text-[20px]'>*</span>
          </div>
          <textarea  
            cols={30}
            rows={30}
          {...props}
          className='w-full p-3 rounded-[6px] h-[130px] border border-gray-300 focus:outline-none' placeholder={placeholder} {...props}> </textarea>
          <span className='text-red-400'>{err}</span>
      </div>
    )
  }