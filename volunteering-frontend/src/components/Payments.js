// Payments.js
import React from 'react';

const Payments = ({ payments, loading }) => {
  if (loading) return <div>Loading payments...</div>;
  return (
    <div id="view-payments">
      <h2>Payment Records</h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <p>User: {payment.user}</p>
            <p>Amount: {payment.amount}</p>
            <p>Date: {payment.date}</p>
            <p>Status: {payment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
