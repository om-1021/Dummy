import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  res.cookie('accessToken', token, {
    secure: true,
    sameSite: 'None',
    // other cookie options...
});

  const token = req.cookies.accessToken;
  if (!token) return next(createError(404, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
