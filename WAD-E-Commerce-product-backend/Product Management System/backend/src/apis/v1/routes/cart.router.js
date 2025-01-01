import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", CartController.getAllCarts);
router.get("/:userId", CartController.getCartByUserId);
router.post("/create", CartController.createCart);
router.patch("/update/:userId", CartController.updateCart);
router.delete("/delete/:userId", CartController.deleteCart);

export default router;