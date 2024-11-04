import React from 'react';

const ContactMessages = ({ messages, loading }) => {
  if (loading) {
    return <div>Loading contact messages...</div>;
  }

  if (messages.length === 0) {
    return <div>No contact messages available.</div>;
  }

  return (
    <div className="contact-messages">
      <h2>Contact Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong>{message.name} ({message.email})</strong>: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactMessages;
