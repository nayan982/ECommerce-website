import React from 'react'
import headphone from '../assets/headphone.png'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';

const Cart = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  // const [cartDetails, setcartDetails] = useState([])
  const { cartDetails, getCartDetails, setcartDetails } = useContext(CartContext);
  const [TotalCP, setTotalCP] = useState()
  const [TotalOP, setTotalOP] = useState()
  const [newQuantity, setNewQuantity] = useState(0)

  const priceEvaluate = async () => {

    const cp = cartDetails?.map(c => (c.productId.productCurrentPrice) * (c.quantity) || 0);
    const op = cartDetails?.map(c => (c.productId.productOriginalPrice) * (c.quantity) || 0);

    const totalcp = cp.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const totalop = op.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    setTotalCP(totalcp)
    setTotalOP(totalop)
  }

  useEffect(() => {
    if (cartDetails.length > 0) {
      priceEvaluate();
    } else {
      setTotalCP(0);
      setTotalOP(0);
    }
  }, [cartDetails])

  if (!cartDetails || cartDetails.length === 0) {
    return (
      <div className='flex items-center justify-center w-full font-semibold text-xl min-h-70'>No item in cart</div>
    )
  }

  const removeFromCart = async (pid) => {
    try {
      const res = await fetch(`${API_URL}/user/removecart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ poid: pid })
      });
      const data = await res.json();
      if (data.success) {
        // Remove the item from the cartDetails state
        toast.success("Product Removed");
        setcartDetails((prev) => prev.filter((item) => item._id !== pid));
        getCartDetails();
      }
    } catch (error) {
      toast.error("Something went wrong");
      // console.error("remove from cart error:", error);
    }
  };

  const UpdatedCartItem = async (pid, quantity) => {
    try {
      const res = await fetch(`${API_URL}/user/updatecart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pid, quantity })
      });
      const data = await res.json();
      if (data.success) {
        // Update the cartDetails state
        setcartDetails((prev) =>
          prev.map((item) =>
            item._id === pid ? { ...item, quantity } : item
          )
        );
        getCartDetails();
      }
    } catch (error) {
      toast.error("Something went wrong");
      // console.error("update cart item error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Page</title>
        <meta
          name="description"
          content="Display all your product in cart."></meta>
      </Helmet>

      <div className="flex lg:gap-8 md:gap-4 justify-evenly flex-col md:flex-row m-3 md:m-0 sm:gap-0.5">
        <div className="bg-white lg:ml-10 md:ml-4 mt-5 flex-wrap w-full lg:w-2/3  max-w-[1013px] flex-col">

          <div className="bg-cyan-00 flex-wrap w-full  divide-y-2 divide-[#e5e5e5] overflow-y-auto md:max-h-[600px] no-scrollbar ">
           
            {cartDetails?.map(cart => {
              return (
                <div key={cart._id} className="bg-blue-00 flex sm:gap-5 gap-1 lg:p-9 p-4 mb-4 ">
                  <div className="image w-30 h-30 bg-amber-00 p-2 flex-shrink-0" ><img src={headphone} alt="headphone" className="object-contain w-full h-full" /></div>
                  <div className="details flex flex-col gap-2 flex-wrap overflow-hidden break-words flex-1">
                    <div className='line-clamp-1 min-w-full'>{cart.productId.productDescription} </div>
                    <div className='flex gap-2 flex-col sm:flex-row'>
                      <div className='flex items-center font-bold text-[18px]'><MdOutlineCurrencyRupee />{cart.productId.productCurrentPrice}</div>

                      <div className='flex items-center gap-2  '>
                        <div className='flex items-center font-bold text-[14px]  text-[#878787] relative'>
                          <MdOutlineCurrencyRupee />
                          {cart.productId.productOriginalPrice}
                          <div className="absolute inset-0 inse flex items-center pointer-events-none">
                            <div className="border-t-1 border-[#878787] w-full"></div>
                          </div>
                        </div>
                        <div className='text-[#29652C] text-[14px] font-bold'>{cart.productId.discount}% off</div>
                      </div>
                    </div>
                    <div className="flex gap-8 max-sm:flex-col max-sm:gap-1">
                      <div className='flex items-center gap-2'>
                        <div>Quantity:</div>
                        <div>
                          <select value={cart.quantity} className="border border-gray-300 rounded px-2 py-1" onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            // Update the quantity in the state
                            setNewQuantity(newQuantity);
                            // Call the function to update the cart item on the server
                            UpdatedCartItem(cart.productId._id, newQuantity);
                          }}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-4 max-sm:text-base cursor-pointer text-blue-700">
                        <div onClick={() => removeFromCart(cart._id)}>Remove</div>
                        <div>Save for later</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='placeorder sticky bottom-0 bg-white shadow-[0_-6px_10px_rgba(0,0,0,0.2)] rounded-sm hidden md:block'>
            <div className=' p-4 text-right'><button className='cursor-pointer w-auto bg-amber-600 py-3 text-[18px] px-15 font-semibold text-white '>PLACE ORDER</button></div>
          </div>
        </div>
        <div className="pricedetails bg-white md:w-80 md:h-90 md:mt-5 mr-5 w-full md:min-w-[200px] flex flex-col gap-4 divide-y-1 max-md:shadow-[0_-6px_10px_rgba(0,0,0,0.1)]">
          <div className='px-8 pb-2 pt-6'>PRICE DETAILS </div>
          <div className='flex flex-col gap-6 px-8 pb-2 pt-2'>

            <div className='flex flex-col gap-3'>
              <div className='price flex items-center justify-between'>
                <div>Price ({cartDetails.length}{" "}
                  {cartDetails.length === 1 ? "item" : "items"})</div>
                {/* <div>Price ({cartDetails.length} {cartDetails.length>1?"items":"item"})</div> */}
                <div>{TotalOP}</div>
              </div>
              <div className='discount flex items-center justify-between '>
                <div>Discount</div>
                <div className='text-[#29652C]'>-{TotalOP - TotalCP}</div>
              </div>
            </div>
            <div className='totalAmount flex items-center justify-between text-[18px] font-semibold'>
              <div>Total Amount</div>
              <div>{TotalCP}</div>
            </div>
          </div>
        </div>

      </div>
      <div className='placeorder sticky bottom-0 bg-white shadow-[0_-6px_10px_rgba(0,0,0,0.2)] mx-3 md:mx-0 rounded-sm  md:hidden'>
        <div className=' p-4 text-right'><button className='cursor-pointer w-auto bg-amber-600 py-3 text-[18px] px-15 font-semibold text-white '>PLACE ORDER</button></div>
      </div>
    </>
  )
}

export default Cart

