import React from 'react'
import ItemCard from './ItemCard'
import headphone from '../assets/headphone.webp'
import mobile from '../assets/itemCardMobile.webp'
import laptopbag from '../assets/itemCardLaptopBag.webp'
import laptop from '../assets/itemCardLaptop.webp'
import powerbank from '../assets/itemCardPowerbank.webp'
import pendrive from '../assets/itemCardPendrive.webp'
import wristwatch from '../assets/wristwatch.webp'
import monitor from '../assets/itemCardMonitor.webp'

const CategorySection = () => {
    return (
        <>
            <div className='flex flex-col bg-white sm:mt-5 sm:ml-5 sm:mr-5 mt-1 sm:p-4 sm:pl-5 sm:pr-10 py-2'>
                <div className='font-bold sm:text-2xl text-xl pb-3 pl-5 pr-5'>Top Products By Category</div>
                <div className='flex pl-5 pr-5 sm:gap-10 gap-2 overflow-auto no-scrollbar scroll-smooth'>
                    <ItemCard 
                        image={mobile}
                        cardName="Mobiles"
                    />
                    <ItemCard 
                        image={headphone}
                        cardName="Headphones"
                    />
                    <ItemCard 
                        image={laptop}
                        cardName="Laptops"
                    />
                    <ItemCard 
                        image={pendrive}
                        cardName="Pendrives"
                    />
                    <ItemCard 
                        image={powerbank}
                        cardName="Power Banks"
                    />
                    <ItemCard 
                        image={wristwatch}
                        cardName="Wrist Watches"
                    />
                    <ItemCard 
                        image={laptopbag}
                        cardName="Laptops Bags"
                    />
                    <ItemCard 
                        image={monitor}
                        cardName="Monitors"
                    />
                   
                </div>
            </div>
        </>
    )
}

export default CategorySection