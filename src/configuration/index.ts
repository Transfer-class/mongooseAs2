import dotenv from "dotenv";
dotenv.config();

export const configuration = {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};
