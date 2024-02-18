import { config } from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import sessionStore from "./config/sessionStore.js";
import ApiRoute from "./routes/index.js";
import connectToDb from "./config/mongoose.js";
import Resend from "./emails/index.js";
import { forgotPasswordEmail } from "./emails/templates/index.js";

const app = express();
config();

const server = async () => {
  app.use(cors());
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store: sessionStore,
      proxy: true,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  );

  app.use("/api", ApiRoute);

  connectToDb()
    .then(() => {
      console.log("Connected to DB");
    })
    .then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, (e) => {
        console.log(`Server is running on port http://localhost:${PORT}`);
      });
    });
};

export default server;
