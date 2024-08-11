import { Model, Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from "./user.interface";
import { hash } from "bcrypt";
import { configuration } from "../configuration";

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  fullName: FullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  address: AddressSchema,
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  orders: [OrderSchema],
});

// creating custom static method
UserSchema.statics.isUserExists = async function (userId: number) {
  const existUser = User.findOne({ userId });
  return existUser;
};

UserSchema.pre("save", async function (next) {
  this.password = await hash(
    this.password,
    Number(configuration.bcrypt_salt_round)
  );
  next();
});

// for static
export const User = model<TUser, UserModel>("User", UserSchema);
