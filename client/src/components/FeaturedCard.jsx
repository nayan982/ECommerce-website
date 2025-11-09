import { IoMdArrowDropright } from "react-icons/io";
const FeaturedCard = ({heading, offer, image}) => {
  return (
    <>
        <div className='flex bg-[#112430] text-white justify-between items-center p-3 sm:w-82 w-65 rounded-xl h-full'>
            <div className='bg-amber-00 sm:w-44 flex flex-col justify-center sm:pl-4 pl-2 gap-0.5'>
                <div className='text-[14px] text-[#AFB9C0]'>{heading}</div>
                <div className='sm:text-[20px]'>{offer}</div>
                <div className='hover:underline hover:text-yellow-200 cursor-pointer flex items-center mt-2'>Shop Now <span className='relative top-0.5'><IoMdArrowDropright/></span></div>
            </div>
            <div className='sm:w-32 w-28 bg-amber-0 sm:t-4 t-2 p-2'>
                <img src={image} alt="img" className='transition-transform duration-300 ease-in-out hover:scale-110 object-contain h-full' />
            </div>
        </div>
    </>
  )
}

export default FeaturedCard