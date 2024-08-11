import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getUserByID = async (userId: number) => {
  const result = User.findOne({ userId: userId });
  return result;
};

const updateUserByID = async (userId: number, updateData: object) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOneAndUpdate({ userId }, updateData, {
      new: true,
      projection: { password: 0 },
    });
    console.log("frm services", result);
    return result;
  } else {
    return null;
  }
};

const deleteUser = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

const addOrder = async (userId: number, orderData: [TOrder]) => {
  if (await User.isUserExists(userId)) {
    console.log("user found to update");
    const result = await User.updateOne(
      { userId },
      { $push: { orders: { $each: orderData } } }
    );
    return result;
  } else {
    return null;
  }
};

const getOrders = async (userId: number) => {
  const userExists = await User.isUserExists(userId);
  if (userExists) {
    const result = await User.findOne({ userId }, { userId: 1, orders: 1 });
    return result;
  } else {
    return null;
  }
};

const getTotalPrice = async (userId: number) => {
  const userExist = await User.isUserExists(userId);
  if (userExist) {
    const totalPrice = await User.aggregate([
      { $match: { userId } },
      { $unwind: "$orders" },
      {
        $group: {
          _id: userId,
          totalPrice: {
            $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
          },
        },
      },
    ]);
    return totalPrice;
  } else {
    return null;
  }
};

export const userServices = {
  createUser,
  getUserByID,
  updateUserByID,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
