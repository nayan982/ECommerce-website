import express from "express"
import { addProduct, getBrandName, getProduct, getProductDetails } from "../controllers/productControllers.js"

const productRouter =express.Router();

productRouter.get('/addproduct',addProduct)
productRouter.get('/getproduct',getProduct)
productRouter.get('/getbrand',getBrandName)
productRouter.get('/:slug',getProductDetails)


export default productRouter;
