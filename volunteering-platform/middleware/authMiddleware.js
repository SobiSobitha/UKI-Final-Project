const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (all users: both volunteers and organizers)
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer" token
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user and attach to req.user without the password
        req.user = await User.findById(decoded.userId).select('-password');
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized, invalid token' });
    }
};

// Middleware to check if user is an approved organizer
const isApprovedOrganizer = async (req, res, next) => {
    try {
        // Ensure the user is authenticated using the existing protect middleware
        await exports.protect(req, res, async () => {
            const user = req.user; // Extract the authenticated user from the request

            // Check if the user is an approved organizer
            if (user.role !== 'Organizer' || !user.isApproved) {
                return res.status(403).json({ message: 'Access denied. Only approved organizers can access this page.' });
            }

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

// Example route to access organizer dashboard
router.get('/organizer-dashboard', isApprovedOrganizer, (req, res) => {
    res.json({ message: 'Welcome to the Organizer Dashboard!' });
});


// Middleware to restrict access to approved organizers only
exports.organizerProtect = async (req, res, next) => {
    await exports.protect(req, res, async () => {
        // Check if the user is an approved organizer
        if (req.user.role !== 'Organizer' || !req.user.approved) {
            return res.status(403).json({ error: 'Access denied: Not an approved organizer' });
        }
        next();
    });
};

// Middleware to restrict access to admins only
exports.adminProtect = async (req, res, next) => {
    await exports.protect(req, res, async () => {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: Admin only' });
        }
        next();
    });
};

// Middleware to restrict access to volunteers only
exports.volunteerProtect = async (req, res, next) => {
    await exports.protect(req, res, async () => {
        // Check if the user is a volunteer
        if (req.user.role !== 'volunteer') {
            return res.status(403).json({ error: 'Access denied: Not a volunteer' });
        }
        next();
    });
};

// Middleware to ensure that an organizer is creating an event
exports.organizerEventProtect = async (req, res, next) => {
    await exports.organizerProtect(req, res, async () => {
        // Add any additional checks specific to event creation if necessary
        next();
    });
};
