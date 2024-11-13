'use client'

import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './FeedbackPage.css';

const emojiOptions = [
  { id: 1, emoji: '😢', label: 'Very Unhappy' },
  { id: 2, emoji: '😕', label: 'Unhappy' },
  { id: 3, emoji: '😐', label: 'Neutral' },
  { id: 4, emoji: '🙂', label: 'Happy' },
  { id: 5, emoji: '😁', label: 'Very Happy' },
]

export default function FeedbackPage() {
  const { eventId } = useParams()
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitted(false)

    if (!selectedEmoji || feedback.trim() === '') {
      setError('Please select an emoji and provide feedback.')
      return
    }

    try {
      const response = await fetch('http://localhost:8001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: eventId,
          feedback,
          rating: selectedEmoji ? selectedEmoji.label : 'No rating',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit feedback')
      }

      setIsSubmitted(true)
      setFeedback('')
      setSelectedEmoji(null)

      // Navigate to the Volunteer Dashboard after successful feedback submission
      alert('Thankyou for your feedback!')
      navigate('/volunteer-dashboard'); // Replace with the actual path to your Volunteer Dashboard
    } catch (error) {
      setError(error.message)
      console.error('Error submitting feedback:', error)
    }
  }

  const handleTextChange = (e) => {
    setFeedback(e.target.value)
  }

  return (
    <div className="min-h-screen p-8 flex items-center justify-center" style={{ backgroundColor: '#F8F4E9' }}>
      <div className="w-full max-w-md border-0 shadow-lg" style={{ backgroundColor: '#41436A' }}>
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-center" style={{ color: '#F8F4E9' }}>How was your experience?</h1>
          <p className="text-center text-lg" style={{ color: '#84A59D' }}>Your feedback helps us improve!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-[#F8F4E9] rounded-lg p-6 space-y-4">
            <p className="text-center font-medium" style={{ color: '#41436A' }}>Select your rating</p>
            <div className="flex justify-center space-x-4">
              {emojiOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`text-4xl p-3 hover:scale-110 transition-transform ${
                    selectedEmoji === option ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{
                    borderColor: selectedEmoji === option ? '#E27D60' : '#84A59D',
                    backgroundColor: selectedEmoji === option ? '#41436A' : 'transparent',
                  }}
                  onClick={() => setSelectedEmoji(option)}
                >
                  {option.emoji}
                </button>
              ))}
            </div>
            {selectedEmoji && (
              <p className="text-center font-medium" style={{ color: '#41436A' }}>
                {selectedEmoji.label}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2" style={{ color: '#F8F4E9' }}>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 12H9M19 12l-7-7m0 0l-7 7m7-7v14"></path>
              </svg>
              <p className="font-medium">Share your thoughts</p>
            </div>
            <textarea
              placeholder="Tell us about your experience..."
              value={feedback}
              onChange={handleTextChange}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="textarea"
            />
          </div>

          <button
            type="submit"
            className="w-full text-lg py-6 transition-all hover:scale-105"
            style={{
              backgroundColor: '#E27D60',
              color: '#F8F4E9',
            }}
          >
            Submit Feedback
          </button>
        </form>

        <div className="flex justify-center">
          {error && (
            <div className="mt-4 border-0 alert">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 8v4m0 4v2m0 2h0m0-6h0"></path>
              </svg>
              <p className="font-medium text-center">Error</p>
              <p className="text-center">{error}</p>
            </div>
          )}
          {isSubmitted && (
            <div className="mt-4 border-0 alert" style={{ backgroundColor: '#84A59D', color: '#F8F4E9' }}>
              <p className="font-medium text-center">Thank you!</p>
              <p className="text-center">Your feedback has been submitted successfully.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
