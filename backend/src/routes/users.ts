import express, { Router } from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.post("/signup", UserController.signUp);

export default router;
