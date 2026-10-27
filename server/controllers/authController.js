import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {

  try {

    const { fullName, email, password, role, recruiterName,
      companyName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      recruiterName: role === "recruiter"
        ? recruiterName || fullName
        : "",
      companyName: role === "recruiter"
        ? companyName || ""
        : ""
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    res.status(200).json({

      message: "Login Successful",

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        recruiterName: user.recruiterName || user.fullName,
companyName: user.companyName || ""
      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

