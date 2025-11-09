// import headphone from '../assets/headphone.webp'
import headphone from '../assets/productHeadphone.webp'
import mobile from '../assets/itemCardMobile.webp'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { ProductContext } from '../context/ProductContext';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { toast } from 'react-toastify';

const ProductCard = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    // console.log(category)
    const { getProduct, productData } = useContext(ProductContext);
    const { getCartDetails } = useContext(CartContext);
 
    const addToCart= async (pid) => {
        try {
            const res =await fetch(`${API_URL}/user/addtocart?pid=${pid}`,{method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }})
            const data= await res.json();
            if(data.success){
                // console.log(data.message);
                toast.success("Product added to cart");
                getCartDetails();
            }else{
                // console.error(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            // console.error("add to cart error frontend: ",error)
        }
    }

    if (productData.length === 0) {
        return <div className='flex items-center justify-center w-full font-semibold text-xl'>No product found</div>
    }

    return (
        <>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-y-2 pt-4 pr-5 w-full max-md:fle max-md: flex-wrap max-md:items-start max-md:gap-x-3 max-md:pl-5 max-sm:pl-1 max-sm:pr-1'>
                {productData?.map(pro => {
                    return (

                        <div key={pro._id} data-id={pro._id} className='lg:max-w  h-[400px] md:h-[450px] bg-white p-4 transition-transform duration-300 ease-in-out hover:scale-110 border-1 border-[#e5e5e5] '>
                            <NavLink to={`${pro.slug}?pid=${pro._id}`} className='block sm:p-3 p-1 h-[270px] bg-gray00 max-md:max-h-[220px]'><img src={`${pro.category==="headphones"?headphone:mobile}`} alt="headphone" className='w-full h-full object-contain' loading="lazy"/></NavLink>
                            <div className='bg-amber-0 pt-5 flex flex-col gap-0.5'>
                                <NavLink to={`${pro.slug}?pid=${pro._id}`}>{pro.brandName || ""}</NavLink>
                                <div className='flex gap-2 max-md:flex-col md:flex-col '>
                                    <NavLink to={`${pro.slug}?pid=${pro._id}`} className='flex items-center font-bold text-[18px]'><MdOutlineCurrencyRupee />{pro.productCurrentPrice || ""}</NavLink>

                                    <div className='flex items-center gap-2 '>
                                        <div className='flex items-center font-bold text-[12px]  text-[#878787] relative'>
                                            <MdOutlineCurrencyRupee />
                                            {pro.productOriginalPrice || ""}
                                            <div className="absolute inset-0 inse flex items-center pointer-events-none">
                                                <div className="border-t-1 border-[#878787] w-full"></div>
                                            </div>
                                        </div>
                                        <div className='text-[#29652C] text-[14px] font-bold'>{pro.discount || ""}% off</div>
                                    </div>
                                </div>
                                <div className='cursor-pointer' onClick={()=>addToCart(pro._id)} >Add to cart</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ProductCard