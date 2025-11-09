import React from 'react'
import slider from '../assets/slider.jpg'
const Slider = () => {
    return (
        <>
        <div className='mt-2.5'>
            <div className='sm:h-90'>
                <img src={slider} alt="headphone" className='w-full h-full object-cover' />
            </div>
        </div>
        </>
    )
}

export default Slider