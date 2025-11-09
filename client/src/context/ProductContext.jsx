import { createContext, useState,useEffect } from "react";
export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [productData, setproductData] = useState([])
    const getProduct = async ({category,brandName}) => {
        try {
            const response = await fetch(API_URL + `/products/getproduct?category=${category}&brandName=${brandName}`, {
                method: "Get"
                // headers: {
                //     "Content-Type": "application/json",
                //     "Accept": "application/json"
                // }
            })
            const data = await response.json();
            // console.log(data);
            // console.log(data.productData);
            // console.log(data.success)

            data.success ? setproductData(data.productData) : setproductData("not fetch");

            return
        } catch (error) {
            console.error("get product frontend error: ", error);
        }

    }
//    useEffect(() => {
//         console.log("Updated productDat:", productDat);
//     }, [productDat]);

    return (
        <ProductContext.Provider value={{ productData, getProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}