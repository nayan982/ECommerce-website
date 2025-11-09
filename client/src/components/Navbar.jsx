import { IoIosSearch } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";


function CategoryList() {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/products?category=${category}`);
    };
    return (
        <div className="absolute top-full left-0 bg-white p-2 pb-4 w-45 z-10 shadow-lg transition-all duration-200 ease-in-out">
            <ul className="flex flex-col gap-1">
                <li onClick={() => handleCategoryClick('mobiles')} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Mobiles</li>
                <li onClick={() => handleCategoryClick('headphones')} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Headphones</li>
                <li onClick={() => handleCategoryClick('laptops')} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Laptops</li>
                <li onClick={() => handleCategoryClick('pendrives')} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Pendrives</li>
                <li onClick={() => handleCategoryClick('powerbanks')} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Power Banks</li>
            </ul>
        </div>
    );
}


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartDetails,getCartDetails } = useContext(CartContext);
    const [mobileIsOpen, setmobileIsOpen] = useState(false);

    const toggleMoibleMenu = () => {
        setmobileIsOpen(!mobileIsOpen);
    };
    function MobileCategoryList() {
        const navigate = useNavigate();
        const handleCategoryClick = (category) => {
            navigate(`/products?category=${category}`);
        };
        return (
            <div className={`fixed top-12 right-0 text-base bg-white p-2 pl-4 pb-3 w-50 shadow-[-6px_-6px_10px_rgba(0,0,0,0.2)] transition-transform duration-5000 ease-in-out transform ${mobileIsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="flex flex-col gap-1">
                    <li onClick={() => { handleCategoryClick('mobiles'); setmobileIsOpen(false); }} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Mobiles</li>
                    <li onClick={() => { handleCategoryClick('headphones'); setmobileIsOpen(false); }} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Headphones</li>
                    <li onClick={() => { handleCategoryClick('laptops'); setmobileIsOpen(false); }} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Laptops</li>
                    <li onClick={() => { handleCategoryClick('pendrives'); setmobileIsOpen(false); }} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Pendrives</li>
                    <li onClick={() => { handleCategoryClick('powerbanks'); setmobileIsOpen(false); }} className="hover:text-blue-500 hover:bg-[#f0f5ff] cursor-pointer p-2">Power Banks</li>
                   
                </ul>
            </div>
        );
    }

    useEffect(() => {
      getCartDetails();

    }, [])
    
    return (
        <>
            <nav className='bg-white sticky top-0 z-1'>
                <div className='flex items-center justify-between p-4 sm:pl-10 pl-4'>
                    <NavLink to={"/"} className='font-bold cursor-pointer'>ELECTRO SHOP</NavLink>
                    <div className='bg-[#cdcdcd] flex items-center gap-2 w-[30%] p-[6px] pl-3 pr-2 rounded-2xl max-sm:hidden'>
                        <div id="search-logo" role="img" aria-label="Search"><IoIosSearch /></div>
                        <input type="search" id="search" placeholder='Search your product here' aria-label="Search products" className='w-full outline-0' />
                    </div>
                    <div id="nav-but" className='flex items-center justify-center sm:gap-5 gap-4 text-[28px] cursor-pointer '>
                        <div className="flex items-center gap-3">
                            <div className=" relative" onClick={() => { getCartDetails(); }}>
                                <NavLink to={"/viewcart"} id="cart" aria-label="View Cart"><BsCart /><span className="sr-only">View Cart</span></NavLink>
                                {cartDetails.length ?
                                    <NavLink to={"/viewcart"} className="absolute -top-2 -right-1 bg-red-500 text-[14px] text-white font-semibold rounded-full px-2 py-0.5 text-sm">{cartDetails.length}</NavLink> : null

                                }
                            </div>
                            <div id="account"><MdOutlineAccountCircle /></div>
                        </div>
                        <div className="relative">
                            <div className="hamburger hidden max-sm:block text-[24px] relative cursor-pointer" aria-label="hamburger" onClick={toggleMoibleMenu}>
                                {mobileIsOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                            </div>
                            {/* <div className="hamburger hidden max-sm:block text-[24px] relative" aria-label="hamburger" onClick={()=>{MobileCategoryList; setmobileIsOpen(true);}}><GiHamburgerMenu /></div> */}
                            {mobileIsOpen && <MobileCategoryList />}
                        </div>
                    </div>
                </div>
            </nav>
            <div className='flex items-center justify-between p-3 pl-10 pr-10 bg-[#c9e0ef] max-sm:justify-center'>
                <ul className='flex items-center gap-7 cursor-pointer max-sm:hidden'>

                    <li><NavLink to="/" >Home</NavLink></li>
                    <li className="relative group" onClick={() => setIsOpen(!isOpen)} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                        <div className="flex items-center gap-1 group-hover:text-blue-500 " >
                            Product
                            <span className="transition-transform duration-300 ease-in-out group-hover:rotate-180 relative top-[1px]">
                                <IoIosArrowDown />
                            </span>
                        </div>
                        {isOpen && <CategoryList />}

                    </li>
                </ul>
                <div className='flex items-center gap-1 cursor-pointer max-sm:hidden'>
                    <div id="support-logo"><MdSupportAgent /></div>
                    <div>Help & Support</div>
                </div>
                <div className='bg-[#f6f6f6] hidden items-center gap-2 w-[75%] p-[6px] pl-3 pr-2 rounded-2xl max-sm:flex '>
                    <div id="search-logo" role="img" aria-label="Search"><IoIosSearch /></div>
                    <input type="search" id="search" placeholder='Search your product here' aria-label="Search products" className='w-full outline-0' />
                </div>
            </div >
        </>
    )
}

export default Navbar