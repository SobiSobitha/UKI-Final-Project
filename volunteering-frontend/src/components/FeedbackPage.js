import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedbackPage.css';

const FeedbackPage = () => {
    const { eventId } = useParams(); // Get event ID from URL params
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state before submission

        try {
            const response = await fetch(`http://localhost:8001/api/feedback/${eventId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback }),
            });

            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit feedback');
            }

            const data = await response.json();
            alert('Feedback submitted successfully!'); // Notify the user
            setFeedback(''); // Clear feedback input after submission
        } catch (error) {
            setError(error.message); // Set error message to display to user
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div>
            <h1>Leave Feedback for Event {eventId}</h1>
            {error && <p className="error">{error}</p>} {/* Display error message if exists */}
            <form onSubmit={handleSubmit}>
                <label>
                    Feedback:
                    <textarea 
                        value={feedback} 
                        onChange={(e) => setFeedback(e.target.value)} 
                        required
                    />
                </label>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackPage;
