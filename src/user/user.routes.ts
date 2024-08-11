import express, { Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/createUser", userController.createUser);
router.get("/:userId", userController.getUserByID);
router.post("/:userId", userController.updateUserByID);
router.delete("/:userId", userController.deleteUser);
router.put("/:userId/orders", userController.addOrder);
router.get("/:userId/orders", userController.getOrders);
router.get("/:userId/orders/total-price", userController.getTotalPrice);

export const UserRoute = router;
