
import FeaturedCard from './FeaturedCard'
import headphone from '../assets/headphone.webp'
import wristwatch from '../assets/wristwatch.webp'
import mobile from '../assets/mobile.webp'
import laptop from '../assets/laptop.webp'

const FeaturedCardSection = () => {
    return (
        <>
            <div className='sm:mt-5 sm:ml-5 sm:mr-5 mt-1 bg-white sm:p-4 sm:px-5 py-2'>
                <div className='font-bold sm:text-2xl text-xl pb-3 pl-5 pr-5'>Electronics Accessories</div>
                <div className='flex items-center gap-7 overflow-x-auto no-scrollbar scroll-smooth pl-5 pr-5'>
                    <div className="min-w-[200px] sm:h-42 h-34 shrink-0 snap-start">
                        <FeaturedCard
                            heading="Mobiles & Accessories"
                            offer="Up to 50% off"
                            image={mobile}
                        />
                    </div>
                   
                    <div className="min-w-[200px] sm:h-42 h-34 shrink-0 snap-start">
                        <FeaturedCard
                            heading="Laptops & Accessories"
                            offer="Up to 30% off"
                            image={laptop}
                        />
                    </div>
                   
                    <div className="min-w-[200px] sm:h-42 h-34 shrink-0 snap-start">
                        <FeaturedCard
                            heading="Wrist Watches"
                            offer="Up to 15% off"
                            image={wristwatch}
                        />
                    </div>
                     <div className="min-w-[200px] sm:h-42 h-34 shrink-0 snap-start">
                        <FeaturedCard
                            heading="Audio & Headphones"
                            offer="Up to 15% off"
                            image={headphone}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedCardSection