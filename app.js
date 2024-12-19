const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Route for testing the backend
app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});

// Sample route for shipping details
app.post('/api/shipping', (req, res) => {
    const { name, address, email } = req.body;
    console.log('Order received:', { name, address, email });
    res.json({ message: 'Order placed successfully', orderId: Math.floor(Math.random() * 10000) });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/website_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Create a Schema for Orders
const OrderSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

// Handle Order Route
app.post('/api/shipping', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.json({ message: 'Order saved to database', order: newOrder });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
