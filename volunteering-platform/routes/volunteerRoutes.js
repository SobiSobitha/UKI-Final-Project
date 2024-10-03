const express = require('express');
const router = express.Router();

// Mock data (you would replace this with real data from your database)
const upcomingEvents = [
  { id: 1, title: 'Beach Cleanup', date: '2024-10-12' },
  { id: 2, title: 'Food Donation Drive', date: '2024-11-05' }
];

const currentTasks = [
  { id: 1, task: 'Distribute Flyers', deadline: '2024-09-30' }
];

const pastEvents = [
  { id: 1, title: 'Tree Plantation', date: '2024-08-10' }
];

const notifications = [
  { id: 1, message: 'New event added: Beach Cleanup' }
];

// Mock feedback data array
const feedbacks = [];

// Fetch upcoming events
router.get('/upcoming-events', (req, res) => {
  res.json(upcomingEvents);
});

// Fetch current tasks
router.get('/current-tasks', (req, res) => {
  res.json(currentTasks);
});

// Fetch past events
router.get('/past-events', (req, res) => {
  res.json(pastEvents);
});

// Fetch notifications
router.get('/notifications', (req, res) => {
  res.json(notifications);
});

// Submit feedback for a specific event
router.post('/feedback/:eventId', (req, res) => {
  const { eventId } = req.params;
  const { feedback } = req.body;

  // Validate feedback input
  if (!feedback) {
    return res.status(400).json({ error: 'Feedback is required' });
  }

  // Save feedback to database logic here
  // For now, we can just log it or push it to an array
  feedbacks.push({ eventId, feedback });

  res.json({ message: 'Feedback submitted successfully', eventId });
});

module.exports = router;
