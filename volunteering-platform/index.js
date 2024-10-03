const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes'); // Event routes
const userRoutes = require('./routes/userRoutes');   // User routes
// const paymentRoutes = require('./routes/paymentRoutes'); // Payment routes for organizer's trials
const adminRoutes = require('./routes/adminRoutes'); // Admin approval for organizers
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const volunteerRoutes = require('./routes/volunteerRoutes');

require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup


app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Allow credentials
}));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route handling
app.use('/api/auth', authRoutes); // Authentication routes for organizers/volunteers
app.use('/api/events', eventRoutes); // Event routes (Create, View, Register for events)
app.use('/api/users', userRoutes); // User routes (Organizer/Volunteer registration, fetching users)
// app.use('/api/payments', paymentRoutes); // Payment routes for organizer's trials
app.use('/api/admin', adminRoutes); // Admin approval for organizers
app.use('/api/volunteer', volunteerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
