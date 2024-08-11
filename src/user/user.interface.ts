import { Model } from "mongoose";

export interface TFullName {
  firstName: string;
  lastName: string;
}

export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUser {
  userId: number;
  userName: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  address: TAddress;
  isActive: boolean;
  hobbies: string[];
  orders: TOrder[];
}
// implementing custom static method to justify if a user exist or not

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
