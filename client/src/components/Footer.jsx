import React from 'react'
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
const Footer = () => {
  return (
    <>
        <footer className='bg-[#112430] text-white grid grid-cols-[30%_20%_20%_1fr] p-10 pb-6 mt-5 gap-4 max-md:grid-cols-2 max-md:gap-6 max-md:pr-5 max-sm:flex max-sm:flex-col max-sm:gap-x-1 max-sm:pl-10 '>
            <div className='w-[80%] max-md:w-full pr-6'>
                <div className='text-xl mb-3 text-[#ADADAD]'>Electro Shop</div>
                <p>The best quality elctronics accessories providers for whole world</p>
            </div>
            <div>
                <div className='text-xl mb-3 text-[#ADADAD]'>Store</div>
                <div>
                    <ul className='flex flex-col gap-2 cursor-pointer'>
                        <li>Hot Accessories</li>
                        <li>Phones</li>
                        <li>Audio & Headphones</li>
                        <li>Terms of service</li>
                        <li>Refund Policy</li>
                    </ul>
                </div>
            </div>
            <div>
                <div className='text-xl mb-3 text-[#ADADAD]'>Visit Us</div>
                <div>
                    <div>150 W 88th </div>
                    <div>Boolimington 150043 </div>
                </div>
            </div>
            <div className='min-w-48'>
                <div className='text-xl mb-3 text-[#ADADAD]'>Contact Us</div>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'><CiMail/>info@electroshop.com</div>
                    <div className='flex items-center gap-2'><IoCallOutline/>681751235</div>
                </div>
            </div>
            <div className='col-span-4 text-center mt-22 max-md:col-span-2'>Copyright &copy; 2025 electroshop</div>
        </footer>
    </>
  )
}
// ADADAD
export default Footer