const { user } = require("../models/user");
const bcrypt = require("bcrypt");
const { sendOTP } = require("./otpservice");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { Prompt } = require("../models/chatschema");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await user.findOne({ email: email });
    if (!account) {
      return res.send("User not found");
    }
    const ispassvalid = await bcrypt.compare(password, account.password);
    if (!ispassvalid) {
      return res.send("Password Incorrect");
    }
    if (!account.verified) {
      await sendOTP(email, account.name);
      res.cookie("email", email, { maxAge: 20 * 60 * 1000, httpOnly: false });
      return res.send("Verify your account to continue");
    }
    if (account.firstLogin) {
      account.firstLogin = false;
      await account.save();
      res.cookie("First Login", "First Login", { maxAge: 10 * 60 * 1000 });
    }
    const token = jwt.sign({ email: account.email }, process.env.jwt_secret, {
      expiresIn: process.env.jwt_expiry,
    });
    const newChat = new Prompt({
      user: account._id,
    });
    await newChat.save();
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.jwt_cookie_expiry * 24 * 60 * 60 * 1000,
      ),
    };
    res.cookie("token", token, cookieOptions);
    res.cookie("profile", account.profilePhoto, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("chatid", newChat._id.toString(), {
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).send("Signin successfull");
  } catch (error) {
    console.log("Error signing in: ", error);
    res.status(404).send("Internal Server Error");
  }
};
