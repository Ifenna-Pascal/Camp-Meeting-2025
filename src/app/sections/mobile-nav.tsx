import { CloseSquare } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const MobileNav = ({open, close}: {open: boolean, close: () => void}) => {
    const router = useRouter();
   return (
    <div className={`${open ? 'left-[0px]' : 'left-[100%]'} transition-all fix h-[100vh] w-full fixed z-30 top-0 bg-white`}>
      <div className='flex items-center p-6 justify-end'>
    
        <CloseSquare size="32" color="#697689" onClick={close}/>
  
      </div>
  
      <div className='flex font-poppins flex-col  gap-y-8 justify-center items-center'>
        <Link href={'/#events'} onClick={close} > Top Events </Link>
        <Link href={'/#ministering'} onClick={close}> Ministering </Link>
        <Link href={'/#testimonials'} onClick={close}> Testimonials </Link>
        <button onClick={() => router.push('/register')} className='w-[240px] border-gray-800 border text-gray-800 py-3 mt-6 font-semibold text-[18px]'>Register Here</button>
      </div>
    </div>
   )
  }
  