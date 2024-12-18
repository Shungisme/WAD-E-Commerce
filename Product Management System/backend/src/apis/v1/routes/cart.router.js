import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", CartController.getAllCarts);
router.get("/:userId", CartController.getCartByUserId);
router.post("/create", isAuthorized, CartController.createCart);
router.patch("/update/:userId", isAuthorized, CartController.updateCart);
router.delete("/delete/:userId", isAuthorized, CartController.deleteCart);

export default router;