const { User } = require("../models"); // Import the User model for database interaction.
const bcryptjs = require("bcryptjs"); // Library for password hashing and verification.
const errorHandler = require("../utils/error"); // Custom error handler for managing errors.
const jwt = require("jsonwebtoken"); // Library for generating and verifying JWT tokens.
const nodemailer = require("nodemailer"); // Library for sending emails (not used in these functions).

// Signup function: Handles user registration
const signup = async (req, res, next) => {
  try {
    // Extract user details from the request body
    const { email, fullname, phone, password, address, role, country } = req.body;

    // Hash the user's password for secure storage
    const hashPassword = bcryptjs.hashSync(password, 10); // The number "10" is the salt rounds for hashing.

    // Check if the user already exists by email, and create a new user if not
    const [newUser, created] = await User.findOrCreate({
      where: { email }, // Check if the email already exists
      defaults: {
        fullname: fullname || username, // Fallback to `username` if `fullname` is not provided
        phone: phone,
        password: hashPassword, // Store the hashed password
        address: address,
        country: country,
        role: role || "user", // Default role is "user" if not specified
      },
    });

    // If a new user was created, generate a JWT token and return it in a cookie
    if (created) {
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET); // Sign a JWT with the user's ID
      res.cookie("access_token", token, { httpOnly: true }) // Store the token in a secure, HttpOnly cookie
        .status(201)
        .json({
          newUser, // Send the newly created user as part of the response
          cookie: token, // Include the token in the response for debugging (optional)
        });
    } else {
      // If the user already exists, return a 400 error
      return res.status(400).json({ msg: "User already existed" });
    }
  } catch (err) {
    // Pass any errors to the next middleware for centralized error handling
    next(err);
  }
};

// Signin function: Handles user login
const signin = async (req, res, next) => {
  const { email, password } = req.body; // Extract email and password from the request body.

  try {
    // Check if a user with the provided email exists in the database
    const validUser = await User.findOne({ where: { email } });
    if (!validUser) {
      // If the user is not found, return a 404 error
      return next(errorHandler(404, "User not found!"));
    }

    // Compare the provided password with the hashed password in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      // If the passwords don't match, return a 401 error
      return next(errorHandler(401, "Wrong password!"));
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET); // Sign a JWT with the user's ID

    // Store the token in a secure, HttpOnly cookie and respond with the user details
    res.cookie("access_token", token, { httpOnly: true }) // Store the token in a cookie
      .status(200)
      .json({
        validUser, // Send the authenticated user as part of the response
        cookie: token, // Include the token in the response for debugging (optional)
      });
  } catch (error) {
    // Pass any errors to the next middleware for centralized error handling
    console.log(error);
    next(error);
  }
};

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "TrueWellnessWay@hotmail.com",
    pass: "123asdASD",
  },
});

const forgotpassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const validUser = await User.findOne({ where: { email } });
    if (!validUser)
      return next(errorHandler(404, "No user created with this email!"));
    const token =
      ({ id: validUser.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const link = `<a href=localhost:3000/resetpassword/${validUser.id}/${token}>ResetPassword</a>`;

    const resetmail = {
      from: "FurniScape@hotmail.com",
      to: validUser.email,
      subject: "Reset password request",
      text: "Your password can be reset by clicking Reset password link below, the link will be expired after 15m\nIf you did not request, please ignore this email.",
      html: link,
    };

    transporter.sendMail(resetmail);
    console.log(email, id, "reset password");
    res.status(
      200,
      "A reset password link has been sent to your email to reset your password"
    );
  } catch (err) {
    next(err);
  }
};

const resetpassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(id, password, token);
    const hashPassword = bcryptjs.hashSync(password, 10);
    jwt.verify(token, process.env.JWT_SECRET);
    const update = await User.update(
      { password: hashPassword },
      { where: { id: id } }
    );
    if (!update)
      return next(errorHandler(500, "update failed, please try again later."));
    res.status(200, "You have successfully change your password");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  forgotpassword,
  resetpassword,
};
