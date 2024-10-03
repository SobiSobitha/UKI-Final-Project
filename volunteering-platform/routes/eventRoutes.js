const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();

// Middleware to check if user is an approved organizer
const isApprovedOrganizer = async (req, res, next) => {
  const { createdBy } = req.body;

  console.log('Created By ID:', createdBy); // Debug log

  try {
    // Check if the user exists in the User collection
    const organizer = await User.findById(createdBy);
    if (!organizer) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is an approved organizer
    if (organizer.role !== 'Organizer' || !organizer.isApproved) {
      return res.status(403).json({ message: 'Only approved organizers can create events.' });
    }

    next();
  } catch (error) {
    console.error('Server error in isApprovedOrganizer:', error); // Debug log
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

router.post('/create-event', isApprovedOrganizer, async (req, res) => {
  const { title, description, date, location, roles, tasks, createdBy, paymentPlan } = req.body;

  try {
    // Validate payment plan
    if (!['1-month', '6-month', '1-year'].includes(paymentPlan)) {
      return res.status(400).json({ message: 'Invalid payment plan selected.' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      roles,
      tasks,
      createdBy,
      status: 'pending', 
      paymentPlan, // Store payment plan in event schema
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});


// Payment completion endpoint (update event status)
router.post('/complete-payment/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    // Find the event by ID and update its status to "active"
    const event = await Event.findByIdAndUpdate(eventId, { status: 'active' }, { new: true });

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.status(200).json({ message: 'Payment completed successfully! Event is now active.', event });
  } catch (err) {
    console.error('Server error in complete-payment:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});


// Register for a role and task (Volunteers)
router.post('/register-role', async (req, res) => {
  const { eventId, userId, role, task } = req.body;

  console.log('Registering role and task:', req.body); // Debug log

  try {
    // Check if the user exists in the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User ID not found.' });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Check if the role/task is available
    const availableRole = event.roles.includes(role);
    const availableTask = event.tasks.includes(task);
    if (!availableRole || !availableTask) {
      return res.status(400).json({ message: 'Role or task not available.' });
    }

    // Register the volunteer for the role and task
    event.volunteers.push({ user: userId, role, task });
    await event.save();

    res.status(201).json({ message: 'Registered successfully for the event!' });
  } catch (err) {
    console.error('Server error in register-role:', err); // Debug log
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Remove role and task from an event (Organizer only)
router.post('/remove-role-task', isApprovedOrganizer, async (req, res) => {
  const { eventId, userId } = req.body;

  try {
    // Check if the user exists in the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User ID not found.' });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Find the volunteer in the event
    const volunteerIndex = event.volunteers.findIndex(v => v.user.toString() === userId);
    if (volunteerIndex === -1) {
      return res.status(404).json({ message: 'Volunteer not found in this event.' });
    }

    // Remove the volunteer's role and task
    event.volunteers.splice(volunteerIndex, 1);
    await event.save();

    res.json({ message: 'Volunteer role and task removed from the event.' });
  } catch (err) {
    console.error('Server error in remove-role-task:', err); // Debug log
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Server error in fetch all events:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Fetch event details including volunteers (Organizer only)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('volunteers.user', 'name email') // Populating volunteer details
      .populate('createdBy', 'name organizationName'); // Populating organizer details

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.json(event);
  } catch (err) {
    console.error('Server error in get event details:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});


module.exports = router;
