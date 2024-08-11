import { Request, Response } from "express";
import { userServices } from "./user.services";
import userValidationSchema, { OrderSchema } from "./user.zod.validation";
import { ZodError, z } from "zod";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = userValidationSchema.parse(userData);
    const result = await userServices.createUser(zodParsedData);
    res.status(200).json({
      success: true,
      message: "User created successfully ",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user not created",
      error: error,
    });
  }
};

const getUserByID = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getUserByID(userId);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully ",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user not created",
      error: error,
    });
  }
};

const updateUserByID = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const userId = Number(req.params.userId);
    const updateUserData = await userServices.updateUserByID(
      userId,
      updateData
    );
    if (updateUserData) {
      res.status(200).json({
        success: true,
        message: "user updated successfully ",
        data: updateUserData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User does not exist",
        error: {
          code: 404,
          description: "user not found ",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await userServices.deleteUser(userId);
  res.send(result);
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orderData = req.body;
    const zodParsedOrder = OrderSchema.parse(orderData);
    if (zodParsedOrder) {
      const result = await userServices.addOrder(userId, orderData);
      if (result) {
        res.status(200).json({
          success: true,
          message: "orders updated successfully ",
          data: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "zod type validation error",
        error: error,
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await userServices.getOrders(userId);
  if (result) {
    res.status(200).json({
      success: true,
      message: "orders retrieved successfully ",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await userServices.getTotalPrice(userId);
  if (result) {
    res.status(200).json({
      success: true,
      message: "orders calculated successfully ",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
};
export const userController = {
  createUser,
  getUserByID,
  updateUserByID,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
