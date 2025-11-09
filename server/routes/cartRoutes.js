import express from 'express';
import { addToCart, getCartDetails, removeFromCart, updateCartItem } from '../controllers/userController.js';

const cartRouter=express.Router();

cartRouter.get('/viewcart',getCartDetails)
cartRouter.post('/addtocart',addToCart)
cartRouter.delete('/removecart',removeFromCart)
cartRouter.put('/updatecart',updateCartItem)

export default cartRouter