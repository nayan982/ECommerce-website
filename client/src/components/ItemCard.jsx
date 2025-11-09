import React from 'react'
const ItemCard = ({image,cardName}) => {
  return (
    <>
        <div className='sm:mt-4 flex flex-col items-center cursor-pointer h-full'>
            <div className='sm:w-35 sm:h-40 w-30 h-30 bg-[#f2f2f2] sm:p-4 sm:-10 p-4 rounded-xl transition-transform duration-300 ease-in-out hover:scale-110 flex items-center justify-center'>
                <img src={image} alt="headphone" className='object-contain h-full' />
            </div>
            <div className='mt-1 transition-transform duration-300 ease-in-out hover:scale-110'>
                {cardName}
            </div>
        </div>
    </>
  )
}

export default ItemCard