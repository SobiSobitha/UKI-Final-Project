import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedbackPage.css'; // Make sure to update your CSS accordingly

const emojiOptions = [
  { id: 1, emoji: '😢', label: 'Very Unhappy' },
  { id: 2, emoji: '😕', label: 'Unhappy' },
  { id: 3, emoji: '😐', label: 'Neutral' },
  { id: 4, emoji: '🙂', label: 'Happy' },
  { id: 5, emoji: '😁', label: 'Very Happy' },
];

const FeedbackPage = () => {
  const { eventId } = useParams(); // Get event ID from URL params
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before submission

    // Ensure the feedback and eventId are not empty
    if (!selectedEmoji || feedback.trim() === '') {
        setError('Event name and feedback are required');
        return;
    }

    try {
        const response = await fetch('http://localhost:8001/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                eventName: eventId, // Pass eventId as eventName
                feedback,
                rating: selectedEmoji ? selectedEmoji.label : 'No rating',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit feedback');
        }

        alert('Feedback submitted successfully!');
        setFeedback('');
        setSelectedEmoji(null);
    } catch (error) {
        setError(error.message);
        console.error('Error submitting feedback:', error);
    }
};


  return (
    <div className="feedback-container">
      <h1>How are you feeling?</h1>
      <p>Your input helps us understand your experience!</p>

      <div className="emoji-selector">
        {emojiOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`emoji-button ${selectedEmoji === option ? 'selected' : ''}`}
            onClick={() => setSelectedEmoji(option)}
          >
            {option.emoji}
          </button>
        ))}
      </div>
      
      {selectedEmoji && <p>{selectedEmoji.label}</p>}

      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          <textarea
            placeholder="Add a comment (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FeedbackPage;
