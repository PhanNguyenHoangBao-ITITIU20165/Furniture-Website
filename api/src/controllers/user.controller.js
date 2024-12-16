const { User } = require("../models"); // Import the User model for database interactions.
const { getUserId } = require("../utils/verifyToken"); // Utility function to decode and verify the token to extract the user ID.
const jwt = require("jsonwebtoken"); // Library for working with JSON Web Tokens.

// Function to retrieve user details
const getUser = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.access_token || req.headers["authorization"]; // Extract JWT token from cookies or headers.
    var id = getUserId(jwtToken); // Extract the user ID from the token using the utility function.
    const finduser = await User.findByPk(id); // Find the user by primary key (ID).
    if (!finduser) return res.status(404).json({ msg: "User not found" }); // If user is not found, return a 404 error.
    return res.status(200).json(finduser); // Return the user details with status 200.
  } catch (error) {
    console.log(error); // Log the error for debugging purposes.
    next(error); // Pass the error to the error-handling middleware.
  }
};

// Function to update user details
const updateUser = async (req, res, next) => {
  try {
    var id = req.user.id; // Extract the user ID from the authenticated request.
    const {
      fullname, // User's full name.
      phone,    // User's phone number.
      email,    // User's email address.
      address,  // User's address.
      country,  // User's country.
    } = req.body; // Extract updated details from the request body.

    const finduser = await User.findByPk(id); // Find the user by ID.
    if (!finduser) return res.status(404).json({ msg: "User not found" }); // If user is not found, return a 404 error.

    // Update user fields. If a field is not provided, keep the current value.
    finduser.set({
      fullname: fullname || finduser.fullname,
      phone: phone || finduser.phone,
      email: email || finduser.email,
      address: address || finduser.address,
      country: country || finduser.country,
    });

    await finduser.save(); // Save the updated user details to the database.

    console.log("User update information:\nID: " + id); // Log the updated user ID for debugging.
    console.log(req.body); // Log the request body for debugging.

    return res.status(200).json({ msg: "User's information updated" }); // Return a success message.
  } catch (error) {
    console.log(error); // Log the error for debugging purposes.
    next(error); // Pass the error to the error-handling middleware.
  }
};

// Function to retrieve all users (Admin functionality)
const getAllUsers = (req, res, next) => {
  User.findAll() // Fetch all users from the database.
    .then((users) => {
      res.status(200).json(users); // Return the list of users with status 200.
    })
    .catch((error) => {
      next(error); // Pass any errors to the error-handling middleware.
    });
};

// Export the functions for use in other parts of the application.
module.exports = { updateUser, getUser, getAllUsers };

// Note: The commented strings (e.g., //fsmegasale15) appear to be unrelated or placeholders.
