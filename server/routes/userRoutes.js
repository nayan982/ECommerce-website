import express from 'express'
import { addUsers } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.get('/adduser',addUsers);

export default userRouter