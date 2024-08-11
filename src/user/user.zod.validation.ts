import { z } from "zod";

// Zod schema for TFullName
const FullNameSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required" })
    .trim()
    .max(20, "First name can not be more than 20 character")
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase() ===
        value,
      { message: "First name must be in capitalize format" }
    ),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required" })
    .trim()
    .max(20, "last name can not be more than 20 character")
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase() ===
        value,
      { message: "Last name must be in capitalize format" }
    ),
});

// Zod schema for TAddress
const AddressSchema = z.object({
  street: z.string().nonempty({ message: "Street is required" }).trim(),
  city: z.string().nonempty({ message: "City is required" }).trim(),
  country: z.string().nonempty({ message: "Country is required" }).trim(),
});

// Zod schema for TOrder
export const OrderSchema = z.array(
  z.object({
    productName: z.string().min(3, "Product name is required"),
    price: z.number().positive("Price must be a positive number"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
  })
);

// Zod schema for TUser
const userValidationSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
  userName: z.string().nonempty({ message: "User name is required" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  fullName: FullNameSchema,
  age: z
    .number()
    .int()
    .positive("Age must be a positive integer")
    .max(60, "age can be more than 100 years"),
  email: z.string().email("Invalid email address"),
  address: AddressSchema,
  isActive: z.boolean(),
  hobbies: z
    .array(z.string())
    .nonempty({ message: "At least one hobby is required" }),
  orders: OrderSchema,
});

export default userValidationSchema;
