import express from "express"
import productModel from "../models/productModel.js"
import slugify from "slugify";

export const addProduct = async (req, res) => {
    // const { brandName, category, productDescription, productCurrentPrice, productOriginalPrice, discount } = req.body;
    let products = req.body;

    // Convert to array if it's a single product
    if (!Array.isArray(products)) {
        products = [products];
    }

    const productsToInsert = [];


    try {
        for (let productData of products) {
            const {
                brandName,
                category,
                productDescription,
                productCurrentPrice,
                productOriginalPrice,
                discount
            } = productData;

            if (!brandName || !category || !productDescription || !productCurrentPrice || !productOriginalPrice || !discount) {
                continue; // Skip invalid product
            }

            const baseSlug = slugify(productDescription, { lower: true, strict: true });
            let slug = baseSlug
            let suffix = 1;
            // Check for duplicates and append suffix if needed
            let existingProduct = await productModel.findOne({ slug });
            while (existingProduct) {
                slug = `${baseSlug}-${suffix}`;
                existingProduct = await productModel.findOne({ slug });
                suffix++;
            }

            // const product = await new productModel({ brandName, category, productDescription, slug, productCurrentPrice, productOriginalPrice, discount })
            // await product.save();
            productsToInsert.push({
                brandName,
                category,
                productDescription,
                slug,
                productCurrentPrice,
                productOriginalPrice,
                discount
            });
        }

        // Insert all valid products at once
        const insertedProducts = await productModel.insertMany(productsToInsert);

        return res.json({ success: true, message: `${insertedProducts.length} product(s) added successfully.` })

    } catch (error) {
        console.error("add product error :", error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getProduct = async (req, res) => {

    try {
        // console.log(req.query);
        // const { category, brandName } = req.query;
        // // const { category } = req.query;
        // console.log(brandName)
        // const brand =brandName.split(",")
        // console.log(brand)

        // const {category,brandName}=req.body;
        // const product=await productModel.find({category,brandName})
        // const product=await productModel.find({category})
        // const product=await productModel.find({"$and":[{category},{brandName}]})
        // const product = await productModel.find({ "$and": [{ category }, { brandName: { $in: brand } }] })

        // console.log(req.query)
        const { category, brandName } = req.query;

        const query = {};
        if (category) query.category = category;
        if (brandName) {
            const brands = brandName.split(",")
            query.brandName = { $in: brands };
        }
        // console.log(query)

        const product = await productModel.find(query);

        // console.log("backend: ", product);
        return res.json({ success: true, message: "Products fetched", productData: product });
        
    } catch (error) {
        console.error("error from get product:", error)
        return res.json({ success: false, message: "Products not fetched"});
    }
}

export const getBrandName = async (req, res) => {
    const { category } = req.query
    // console.log(req.query)

    try {
        const brands = await productModel.find({ category }).select('brandName');

        return res.json({ success: true, message: "Brand name fetched", brandName: brands })
    } catch (error) {
        console.error("error of brandName fetched: ", error);
        return res.json({ success: false, message: "Brand name not fetched"})

    }
}

export const getProductDetails = async (req, res) => {
    try {
        // console.log("querry: ",req.query)
        // console.log("params: ",req.params)
        const slug = req.params.slug;
        const pid = req.query.pid;

        const query={}
        if (slug) query.slug = slug;
        if (pid) query._id = pid;

        const productDetails = await productModel.findOne(query);
        // console.log("product details: ",productDetails)
        return res.json({ success: true, message: "Product details fetched", productDetails: productDetails })

    } catch (error) {
        console.error("get product details: ", error);
        return res.json({ success: false, message:"Product details not found" })

    }
}