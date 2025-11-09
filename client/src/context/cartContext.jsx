import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [cartDetails, setcartDetails] = useState([]);

    // console.log("API_URL from env:", import.meta.env);
    const getCartDetails = async () => {
        try {
// console.log(API_URL)
            const res = await fetch(`${API_URL}/user/viewcart`);
            const data = await res.json();

            // console.log(data)
            if (data.cart && data.cart.items.length > 0) {
                setcartDetails(data.cart.items)
                // console.log(data.cart.items)
            } else {
                setcartDetails([]);
            }

        } catch (error) {
            toast.error("Something went wrong");
            // console.error("get cart frontend error: ", error);

        }
    }

    // useEffect(() => {
    //     getCartDetails();
    // }, []);

    return (
        <CartContext.Provider value={{ cartDetails, setcartDetails, getCartDetails }}>
            {children}
        </CartContext.Provider>
    );
};
