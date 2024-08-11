import mongoose from "mongoose";
import app from "./app";
import { configuration } from "./configuration";

try {
  async function main() {
    await mongoose.connect(configuration.db_url as string);
  }

  main();
} catch (error) {
  console.log(error);
}

app.listen(configuration.port, () => {
  console.log(`my app is running on port  ${configuration.port}`);
});
