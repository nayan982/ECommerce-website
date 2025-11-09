import cartModel from "../models/cartModel.js";
import userModel from "../models/usersModels.js";

export const addUsers = async (req, res) => {
    try {

        const { name, email } = req.body;

        const user = await new userModel({ name, email });
        user.save();
        return res.json({ success: true, message: "user added" })
    } catch (error) {
        console.error("user add error: ", error);

        return res.json({ success: false, message: "user not added" })
    }
}

export const addToCart = async (req, res) => {

    // const uid = "68bb0744ef87c62342acfe68"; // rohan

    //         //vivo
    // const pid = "68b885519588007721f61f5c";
    //realme
    // const pid = "68b884879588007721f61f56";

    //sohan
    const uid = "68bb075bef87c62342acfe6a";
    //unix
    // const pid = "68b887789588007721f61f65";
    // console.log(req.query)
    const {pid} =req.query;
    try {
        await cartModel.findOneAndUpdate(
            { userId: uid, "items.productId": pid },
            { $inc: { "items.$.quantity": 1 } },
            { new: true }
        ).then(async (cart) => {
            if (!cart) {
                await cartModel.findOneAndUpdate(
                    { userId: uid },
                    { $push: { items: { productId: pid, quantity: 1 } } },
                    { new: true, upsert: true }
                );
            }
        });

        return res.json({ success: true, message: "Product added to cart" })
    } catch (error) {
        console.error("add to cart error:", error);

        return res.json({ success: false, message: "Product not added to cart" })

    }
}

export const removeFromCart = async (req, res) => {
    try {
        // const { uid, pid } = req.body;  
        const { poid } = req.body;  
        const uid = "68bb075bef87c62342acfe6a";
        // console.log(req.body)

        await cartModel.findOneAndUpdate(
            { userId: uid },
            { $pull: { items: { _id: poid } } },
            { new: true }
        );

        return res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.error("remove from cart error:", error);

        return res.json({ success: false, message: "Product not Removed" })

    }
}

export const updateCartItem = async (req, res) => {
    try {
        const uid = "68bb075bef87c62342acfe6a";
        const { pid, quantity } = req.body;

        await cartModel.findOneAndUpdate(
            { userId: uid, "items.productId": pid },
            { $set: { "items.$.quantity": quantity } },
            { new: true }
        );

        return res.json({ success: true, message: "cart item updated" })
    } catch (error) {
        console.error("update cart item error:", error);

        return res.json({ success: false, message: "cart item not updated" })

    }
}

export const getCartDetails = async (req, res) => {
    try {
        // console.log("get cart details")
        // const {uid}=req.query
        // const uid="68bb0744ef87c62342acfe68";
        const uid = "68bb075bef87c62342acfe6a";
        // const uid = "68bdb6d0973ee564bc773d44";

        // const usercart= await cartModel.findOne({_id:"68bc59584f1acdd2fb392543"}).populate({ path: 'items.productId'});

        // console.log(usercart)
// console.log("first")
        const cart = await cartModel
            .findOne({ userId: uid })
            .populate("items.productId", "productDescription productCurrentPrice productOriginalPrice discount");
        //  populate product details, only return selected fields

        // console.log(JSON.stringify(cart, null, 2))
        if (!cart) {
            return res.json({ success: true, message: "Cart not found", cart: null });
        }
        // if (!cart) {
        //     return res.status(404).json({ message: "Cart not found" });
        // }

        return res.json({ success: true, message: "cart fetched", cart: cart })
    } catch (error) {
        console.error("get cart error: ", error);

        return res.json({ success: false, message: "cart not fetched" })

    }
}
