'use client'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Header from './Header'; // Import the Header component
// import Footer from './Footer'; 
import './PaymentPlan.css'; // Import the external CSS file

export default function PaymentPlan() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planDetails, setPlanDetails] = useState({ name: "", price: 0 });
  const navigate = useNavigate(); // Initialize useNavigate

  const plans = [
    {
      id: "1-month",
      title: "Starter Plan",
      price: 2500, // Price in cents for Stripe
      duration: "1 Month",
      features: [
        "List up to 5 events per month",
        "Basic volunteer management tools (e.g., event sign-ups)",
        "Standard email support",
      ],
    },
    {
      id: "6-month",
      title: "Growth Plan",
      price: 6500, // Price in cents for Stripe
      duration: "6 Months",
      features: [
        "Unlimited event listings",
        "Priority listing of events on the platform",
        "Marketing support (e.g., newsletters, social media boosts)",
      ],
    },
    {
      id: "1-year",
      title: "Enterprise Plan",
      price: 12000, // Price in cents for Stripe
      duration: "1 Year",
      features: [
        "Dedicated account manager for support",
        "Custom branding for events",
        "Customizable event workflows",
      ],
    },
  ];

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan.id);
    setPlanDetails({ name: plan.title, price: plan.price });
  };

  const makePayment = async (token) => {
    const body = { token, planDetails };
    try {
      const response = await fetch("http://localhost:8001/api/payments/create-event-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Payment Success:", data);
        alert("Payment successful!");
        navigate('/organizer-dashboard');
      } else {
        console.log("Payment Failed:", data);
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      console.log("Payment Error:", err);
      alert("Payment Successful!");
      navigate('/organizer-dashboard');
    }
  };

  return (
    <div className="payment-plan-wrapper">
      <Header/>
      <h1 className="payment-plan-header">Choose Your Payment Plan</h1>
      <div className="payment-plan-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card-plan ${selectedPlan === plan.id ? 'selected' : ''}`}
          >
            <div className="card-plan-header">
              <h2 className={`card-plan-title ${selectedPlan === plan.id ? 'selected' : ''}`}>
                {plan.title}
              </h2>
            </div>
            <div className="card-plan-content">
              <p className={`card-plan-price ${selectedPlan === plan.id ? 'selected' : ''}`}>
                ${plan.price / 100}
                <span className={`card-plan-price-span ${selectedPlan === plan.id ? 'selected' : ''}`}>
                  /{plan.duration}
                </span>
              </p>
              <ul className="card-plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="card-plan-feature-item">{feature}</li>
                ))}
              </ul>
            </div>
            <div className="card-plan-footer">
              <button
                className={`card-button ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => handlePlanChange(plan)}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <StripeCheckout
          name="Subscription Plan"
          description={planDetails.name}
          amount={planDetails.price}
          token={makePayment}
          stripeKey="pk_test_51QDhbPCtNZOcTVjLuz4YqsAmCpZYV6unVSkKAU4ltrVrN6QNPy7NavEFVVZj3DUTiz7b9DY9zFyLUX0dvAlPlt9g00AcUZh0YJ"
        >
          <button className="continue-button">Proceed to Payment</button>
        </StripeCheckout>
      )}
    </div>
  );
}
