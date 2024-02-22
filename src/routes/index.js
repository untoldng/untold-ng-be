import { Router } from "express";
import AuthRoute from "./auth.js";
import NewsLetterRoute from "./newsletter.js";
import StoryRoute from "./story.js";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/newsletter", NewsLetterRoute);
router.use("/story", StoryRoute);

export default router;
