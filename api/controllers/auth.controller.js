import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 6);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong password or username"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    console.log("created token is -->", token);

    const { password, ...info } = user._doc;
    localStorage.setItem("accessToken", token);
    // res
    //   .cookie("accessToken", token, {
    //     httpOnly: true,
    //     domain: "64ddd9a30c8ef05838912cf1--cozy-creponne-6776b8.netlify.app",
    //     sameSite: "none",
    //   })
    //   .status(200)
    //   .send(info);

    console.log("aceestoken stored successfully");
    console.log("info is -->", info);
    res.status(200).send(info);
  } catch (err) {
    // console.log("User not logged in succesfully");
    // next(err);
    try {
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          domain: "64ddd9a30c8ef05838912cf1--cozy-creponne-6776b8.netlify.app",
          sameSite: "none",
        })
        .status(200)
        .send(info);
    } catch (err) {
      console.log("User not logged in succesfully");
      next(err);
    }
  }
};

export const logout = async (req, res) => {
  try {
    localStorage.removeItem("accessToken");
    console.log("user logged out successfully");
    res.status(200).send("user logged out");
  } catch (err) {
    try {
      res
        .clearCookie("accessToken", {
          sameSite: "none",
        })
        .status(200)
        .send("User has been logged out successfully;");
    } catch (err) {
      next(err);
    }
  }
};
