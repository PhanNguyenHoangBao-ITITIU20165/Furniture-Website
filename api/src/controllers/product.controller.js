const { Product } = require('../models'); // Import the Product model for database interactions.
const path = require("path"); // Path module for working with file and directory paths.
const fs = require("fs"); // File System module for file operations.

// Add a single product to the database
const addProduct = async (req, res, next) => {
    try {
        const { name, category, price, quantity, description } = req.body; // Extract product details from request body.
        const newProduct = await Product.create({ // Create a new product record.
            name,
            category,
            price,
            quantity,
            description,
        });
        return res.status(201).json(newProduct); // Return the newly created product with status 201.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Add multiple products to the database in bulk
const addProducts = async (req, res, next) => {
    try {
        const products = req.body; // Extract an array of products from the request body.
        const newProducts = await Product.bulkCreate(products); // Use bulkCreate to add multiple products at once.
        return res.status(201).json(newProducts); // Return the created products.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Retrieve all products from the database
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll(); // Fetch all products.
        return res.status(200).json(products); // Return the products with status 200.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Retrieve a product by its ID (used internally)
const getProduct = async (productId) => {
    return await Product.findByPk(productId); // Fetch a product by its primary key (ID).
};

// Retrieve product details based on ID from the request query
const getProductDetail = async (req, res, next) => {
    try {
        const id = req.query.id; // Extract product ID from the request query.
        const product = await Product.findByPk(id); // Find the product in the database.
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Return 404 if the product doesn't exist.
        }
        return res.status(200).json(product); // Return the product details.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Retrieve the picture associated with a product
const getProductPicture = async (req, res, next) => {
    try {
        const id = req.query.id; // Extract product ID from the request query.
        const product = await Product.findByPk(id); // Find the product by ID.

        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Return 404 if product doesn't exist.
        }

        const image = product.image_dir; // Get the image directory path from the product.

        if (!image) {
            return res.status(400).json({ message: 'Image path is null or undefined' }); // Return error if no image is set.
        }

        const imagePath = path.join(__dirname, "../../", image); // Resolve the full path to the image file.

        if (!fs.existsSync(imagePath)) { // Check if the file exists.
            return res.status(404).json({ message: 'Image not found' });
        }

        return res.status(200).sendFile(imagePath); // Send the image file.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Update product details
const updateProduct = async (req, res, next) => {
    try {
        const id = req.query.id; // Extract product ID from the request query.
        const { name, category, price, quantity, description, status } = req.body; // Extract updated details from the request body.
        const product = await Product.findByPk(id); // Find the product by ID.
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Return 404 if the product doesn't exist.
        }
        // Update product properties
        product.name = name;
        product.category = category;
        product.price = price;
        product.quantity = quantity;
        product.description = description;
        product.status = status;

        await product.save(); // Save the updated product to the database.
        return res.status(200).json(product); // Return the updated product.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Update a product's image
const updateProductImage = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' }); // Validate if a file was uploaded.
        const id = req.query.id; // Extract product ID from the query.
        const product = await Product.findByPk(id); // Find the product by ID.
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Return 404 if the product doesn't exist.
        }
        // Check if the product already has an image
        if (product.image_dir) {
            const originalFilePath = path.join(__dirname, "../../", product.image_dir); // Get the old file path.
            fs.unlink(originalFilePath, async (err) => { // Delete the old image.
                if (err) console.error(err);
            });
        }

        product.image_dir = req.file.path; // Set the new image path.
        await product.save(); // Save the updated product.
        return res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Search products by keyword
const searchByKeyword = async (req, res, next) => {
    try {
        const { keyword } = req.query; // Extract search keyword from the request query.
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${keyword}%`, // Perform a case-insensitive search for products by name.
                },
            },
        });
        return res.status(200).json(products); // Return the matching products.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

// Search products by category
const searchByCategory = async (req, res, next) => {
    try {
        const { category } = req.query; // Extract the category from the request query.
        const products = await Product.findAll({
            where: {
                category, // Match products by category.
            },
        });
        return res.status(200).json(products); // Return the matching products.
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware.
    }
};

module.exports = {
    addProduct, addProducts,
    getProducts, getProduct, getProductDetail,
    getProductPicture,
    updateProduct, updateProductImage,
    searchByKeyword, searchByCategory
};
