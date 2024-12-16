const { Order, Order_Product, User } = require('../models'); // Importing database models.
const { getUserId } = require('../utils/verifyToken'); // Utility function to get user ID from token.
const { getProduct } = require('./product.controller'); // Function to retrieve product details.

// Place an order
const placeOrder = async (req, res) => {
    try {
        const { products } = req.body; // Extract the list of products from the request body.
        const payment = req.body.payment || 'cash'; // Default payment method is 'cash' if not specified.
        var userId = req.user.id; // Retrieve the user ID from the authenticated request.

        // Validate user ID
        if (!userId) {
            return res.status(400).json({ message: 'Invalid user' }); // Return error if user ID is invalid.
        }

        // Verify if products exist and have sufficient quantity
        for (let i = 0; i < products.length; i++) {
            const product = await getProduct(products[i].id); // Retrieve product details by ID.
            if (!product) {
                return res.status(400).json({ message: 'Product ' + products[i].id + ' not found' });
            }
            if (product.quantity < products[i].quantity) {
                return res.status(400).json({ message: 'Insufficient quantity of ' + product.name });
            }
        }

        // Calculate the total cost of the order
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            const product = await getProduct(products[i].id);
            total += product.price * products[i].quantity; // Multiply price by quantity and add to total.
        }

        // Create a new order
        const newOrder = await Order.create({
            userId, // Associate the order with the user.
            status: 'pending', // Initial status of the order is 'pending'.
            total, // Total cost of the order.
            payment, // Payment method.
            products, // List of products.
        });

        // Associate products with the order
        for (let i = 0; i < products.length; i++) {
            const product = await getProduct(products[i].id);
            const quantity = products[i].quantity;
            await newOrder.addProduct(product, { through: { quantity } }); // Add product to the order with quantity.
        }

        // If payment method is 'banking', return additional information
        if (payment === 'banking') {
            return res.status(201).json({
                message: 'Order placed',
                bankingInfo: 'Vietcombank\n9933808121\nDao Minh Huy',
            });
        }

        // If payment is not 'banking', return a success message
        return res.status(201).json({ message: 'Order placed' });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: error.message });
    }
};

// Get all orders for a specific user
const getOrderFromUser = async (req, res, next) => {
    try {
        var id = req.user.id; // Retrieve the user ID from the request.
        const orders = await Order.findAll({ where: { userId: id } }); // Fetch orders belonging to the user.
        if (orders.length === 0) return res.status(404).json({ msg: "No order found" }); // If no orders found, return 404.
        return res.status(200).json(orders); // Return orders.
    } catch (error) {
        console.log(error);
        next(error); // Pass error to error-handling middleware.
    }
};

// Get all orders (Admin function)
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll(); // Fetch all orders from the database.
        if (orders.length === 0) return res.status(404).json({ msg: "No order found" }); // Return 404 if no orders.
        return res.status(200).json(orders); // Return all orders.
    } catch (error) {
        console.log(error);
        next(error); // Pass error to error-handling middleware.
    }
};

// Get detailed information about a specific order
const getOrderDetails = async (req, res, next) => {
    try {
        const { id } = req.query; // Extract the order ID from the request query.
        const order = await Order.findByPk(id); // Find the order by primary key.
        if (!order) {
            return res.status(404).json({ message: 'Order not found' }); // Return 404 if order is not found.
        }

        let user = await User.findByPk(req.user.id); // Find the user making the request.
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Return 404 if user is not found.
        }

        // Check if the user is authorized to view the order
        if (order.userId !== user.id && user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' }); // Return 403 if unauthorized.
        }

        // Fetch all products associated with the order
        let products = await Order_Product.findAll({ where: { orderId: id } });
        if (!products) {
            return res.status(404).json({ message: 'No product found' }); // Return 404 if no products found.
        }

        // Build a detailed product list for the order
        let productList = [];
        for (let i = 0; i < products.length; i++) {
            const product = await getProduct(products[i].productId); // Retrieve product details.
            productList.push({
                id: product.id,
                product: product.name,
                category: product.category,
                quantity: products[i].quantity,
                unitPrice: Number(product.price), // Convert price to a number.
            });
        }

        // Return order details along with associated products
        return res.status(200).json({
            order: order,
            products: productList,
            totalPrice: order.total, // Include the total price of the order.
        });
    } catch (error) {
        next(error); // Pass error to error-handling middleware.
    }
};

module.exports = {
    placeOrder, // Export the placeOrder function.
    getOrderFromUser, // Export the getOrderFromUser function.
    getAllOrders, // Export the getAllOrders function.
    getOrderDetails, // Export the getOrderDetails function.
};
