import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = localStorage.getItem("accessToken");
  // if (!token) return next(createError(401, "You are not authenticated"));
  console.log("token -->", token);
  console.log("req.cookies.token -> ", req.cookies.token);
  if (!token) {
    return next(createError(401, "you are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    next();
  });
};
