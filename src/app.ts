import express from "express";
import { Request, Response } from "express";
import { UserRoute } from "./user/user.routes";
const app = express();

//using parser
app.use(express.json());

app.use("/api/users", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
