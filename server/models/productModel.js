import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    brandName:{type:String, required:true},
    category:{type:String, required:true},
    productDescription:{type:String,required:true},
    slug: { type: String, required: true, unique: true },
    productCurrentPrice:{type:Number,required:true},
    productOriginalPrice:{type:Number,required:true},
    discount:{type:Number,required:true}
}) 
const productModel=mongoose.model.product || mongoose.model("product",productSchema)

export default productModel;