import app from "./app.ts";
import { connectDB } from "./db/index.ts";

const PORT = Number(process.env.PORT ?? 8000);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT.toString()}`);
    });
  })
  .catch((err: unknown) => {
    console.error("Mongodb connection error", err);

    process.exit(1);
  });
