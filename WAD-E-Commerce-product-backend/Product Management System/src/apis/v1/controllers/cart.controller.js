import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { StatusCodes } from "http-status-codes";

class CartController {
  static async getAllCarts(req, res) {
    try {
      const carts = await Cart.find();

      const updatedCarts = await Promise.all(
        carts.map(async (cart) => {
          const updatedProducts = await Promise.all(
            cart.products.map(async (item) => {
              const product = await Product.findById(item.productId);
              return {
                ...item.toObject(),
                title: product?.title || "Unknown",
                price: product?.price || 0,
                discount: product?.discount || 0,
                thumbnail: product?.thumbnail || "",
                remainingQuantity: product?.quantity || 0,
              };
            })
          );
          return { ...cart.toObject(), products: updatedProducts };
        })
      );

      res.status(StatusCodes.OK).json({ carts: updatedCarts });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  static async getCartByUserId(req, res) {
    try {
      const { userId } = req.params;
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, products: [] });
        await cart.save();
      }

      const updatedProducts = await Promise.all(
        cart.products.map(async (item) => {
          const product = await Product.findById(item.productId);
          return {
            ...item.toObject(),
            title: product?.title || "Unknown",
            price: product?.price || 0,
            discount: product?.discount || 0,
            thumbnail: product?.thumbnail || "",
            remainingQuantity: product?.quantity || 0,
          };
        })
      );

      res.status(StatusCodes.OK).json({
        cart: { ...cart.toObject(), products: updatedProducts },
      });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  static async createCart(req, res) {
    try {
      const cart = new Cart(req.body);
      await cart.save();
      res.status(StatusCodes.CREATED).json({
        cart,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  }

  static async updateCart(req, res) {
    try {
      const { userId } = req.params;
      let cart = await Cart.findOneAndUpdate({ userId }, req.body, {
        new: true,
      });

      if (!cart) {
        cart = new Cart({ userId, ...req.body });
        await cart.save();
      }

      console.log(cart);

      res.status(StatusCodes.OK).json({
        cart,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  }

  static async deleteCart(req, res) {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOneAndUpdate({ userId }, { products: [] });

      if (!cart)
        return res.status(StatusCodes.NOT_FOUND).json({
          error: "Cart not found",
        });

      res.status(StatusCodes.OK).json({
        message: "Cart deleted successfully",
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  }
}

export default CartController;
