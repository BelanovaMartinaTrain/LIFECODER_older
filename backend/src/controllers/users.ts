import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface SignUpBody {
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }
    const existingEmail = await UserModel.findOne({
      email: email,
    }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "This email is already registered, try to log in"
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);
  } catch (error) {
    next(error);
  }
};
