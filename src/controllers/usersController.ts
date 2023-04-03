import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const saltRounds = 10;

export const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    console.log(req.body)
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ data: {}, message: "User not found", error: true});
    }
    res.json({ data: { email: user.email }, message: "User data", error: false  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Internal server error", error: true });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        data: {},
        message: "User with this email already exists",
        error: true,
      });
    }
    
    await newUser.save();

    res.status(201).json({ data: {}, message: "User created successfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Internal server error", error: true });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ data: {}, message: "Authentication failed", error: true });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ data: {}, message: "Authentication failed", error: true });
    }

    const token = jwt.sign({ email: user.email }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ data: token, message: "Successful authentication", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Internal server error", error: true });
  }
};