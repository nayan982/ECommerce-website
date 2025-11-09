import headphone from '../assets/headphone.png'
import { IoCart } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const ProductDisplay = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const { getCartDetails } = useContext(CartContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [productdata, setproductdata] = useState()
  const pid = queryParams.get('pid');
  const { slug } = useParams();

  const productdetail = async () => {
    const res = await fetch(`${API_URL}/products/${slug}?pid=${pid}`);
    const data = await res.json();
    setproductdata(data.productDetails)
    // console.log(d.slug)

  }

  useEffect(() => {

    productdetail();
  }, [location.search])

  const addToCart = async (pid) => {
    try {
      const res = await fetch(`${API_URL}/user/addtocart?pid=${pid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      const data = await res.json();
      if (data.success) {
        toast.success("Product added to cart");
        getCartDetails();

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      // console.error("add to cart error frontend: ",error)
    }
  }
  return (
    // bg-[#f5f5f5]
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Product display page for showing product details."></meta>
        <title>Product</title>
      </Helmet>
      <div className='flex sm:gap-2 gap-1 sm:mx-8 max-sm:flex-col bg-white sm:p-2 sm:pb-10 pb-2'>
        <div className='bg-[#f5f5f5] p-4 sm:flex-1 sm:max-h-[600px] sm:min-h-[450px] lg:min-w-[380px] h-[300px] sm:sticky sm:top-18 sm:border-1 sm:border-[#e5e5e5]'>
          <div className='sm:mb-4 bg-amber-00 sm:pt-2 sm:h-2/3 xl:h-4/5 h-full'> <img src={headphone} alt="headphone" className='w-full h-full sm:h-11/12 object-contain' /></div>
          <div className='sm:flex items-center gap-5 bg-cyan-00 p-2 sm:flex-col xl:flex-row md:relative md:top-0 xl:top-2 hidden  text-white font-bold cursor-pointer'>
            <div className='flex items-center gap-2 bg-[#ff9f00] py-3 px-6 w-full justify-center rounded-md' onClick={() => addToCart(pid)}><IoCart className='text-xl' />Add To Cart</div>
            <div className='bg-[#fb641b]  py-3 px-6 w-full text-center rounded-md'>Buy Now</div>
          </div>
        </div>

        <div className='bg-white sm:flex-1/4 p-4 sm:border-[#e5e5e5] sm:border-2  sm:shadow-none'>
          <div>{productdata ? productdata.productDescription : ""}</div>
          <div className='flex gap-2 mb-4 mt-3'>
            <div className='flex items-center font-bold sm:text-[28px] text-xl'><MdOutlineCurrencyRupee />{productdata ? productdata.productCurrentPrice : ""}</div>

            <div className='flex items-center gap-2 '>
              <div className='flex items-center font-bold text-base  text-[#878787] relative'>
                <MdOutlineCurrencyRupee />
                {productdata ? productdata.productOriginalPrice : ""}
                <div className="absolute inset-0 inse flex items-center pointer-events-none">
                  <div className="border-t-1 border-[#878787] w-full"></div>
                </div>
              </div>
              <div className='text-[#388E3c] text-base font-bold'>{productdata ? productdata.discount : ""}% off</div>
            </div>

          </div>
          <div id='description'>
            <div>Description</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iusto reiciendis quidem numquam. Possimus incidunt reiciendis sint velit eos porro deserunt optio culpa quae nam quisquam beatae fuga cum expedita, vero, quas sunt perspiciatis molestias ipsum atque repudiandae. In adipisci est ipsa molestias, alias odit soluta numquam ea repudiandae veniam!</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione veritatis numquam accusamus inventore cum nam dolores, sit dicta, veniam voluptatum enim itaque saepe odio quos, architecto corporis quia molestias repellendus eum minima. Porro, autem provident neque debitis possimus aspernatur consectetur hic aliquid omnis ut, est non. Quae placeat ipsa architecto, velit dignissimos, quasi tenetur maiores aliquid fugiat, quod corrupti nostrum impedit incidunt exercitationem ad amet aliquam labore? Reprehenderit optio fugit modi? Id a quae nemo possimus amet sunt aliquid vel impedit eaque architecto odio tempore, alias laborum labore et, suscipit, distinctio magnam deleniti cupiditate nesciunt veniam odit libero temporibus. Ea!</p>
          </div>
        </div>
      </div>

      {/* add to cart and buy now buttons for mobile */}
      <div className='flex items-center gap-5 bg-white p-4 pb-5 sm:hidden text-white font-bold sticky bottom-0 shadow-[0_-6px_10px_rgba(0,0,0,0.2)]'>
        <div className='flex items-center gap-2 bg-[#ff9f00] py-2 px-2 w-full justify-center rounded-md'><IoCart className='text-xl' />Add To Cart</div>
        <div className='bg-[#fb641b]  py-2 px-2 w-full text-center rounded-md'>Buy Now</div>
      </div>


    </>
  )
}

export default ProductDisplay