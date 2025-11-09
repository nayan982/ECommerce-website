import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser";
import "dotenv/config"
import productRouter from './routes/productRoutes.js';
import connectDB from './config/connectDb.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';


const app=express();
const port=process.env.PORT || 3000;
connectDB();


const allowedOrigin=['http://localhost:5173']

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({origin:allowedOrigin, credentials:true}))



app.use("/products",productRouter)
app.use("/user",userRouter)
app.use("/user",cartRouter)

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
    
})