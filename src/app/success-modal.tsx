import React from 'react'
import AppModal from './modal'

const SuccessModal = ({open, close}: {close: ()=> void, open: boolean}) => {
  return (
    <AppModal openState={open} closeModal={close} title='Registration Successful'>
        <div className='px-4 py-5 flex space-y-2 item-center justify-center flex-col font-poppins '>
        <h1>Congratulations 🎉🎉</h1>
        <p>Payment of registration fee  will be on the camp ground</p>
        <p>Kindly check your e-mail (primary or spam box) for your registration token, </p>

        <span className='text-center font-semibold'>#BreakingLimits 🔥🔥🔥 </span>
        </div>
    </AppModal>
  )
}

export default SuccessModal