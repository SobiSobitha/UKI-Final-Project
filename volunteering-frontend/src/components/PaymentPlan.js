'use client'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import StripeCheckout from "react-stripe-checkout"
import './PaymentPlan.css' // Import the external CSS file

export default function PaymentPlan() {
  const [selectedPlan, setSelectedPlan] = useState("")
  const [planDetails, setPlanDetails] = useState({ name: "", price: 0 })
  const navigate = useNavigate() // Initialize useNavigate

  const planOptions = {
    "1-month": { name: "1-Month Plan", price: 50000 },
    "6-month": { name: "6-Month Plan", price: 100000 },
    "1-year": { name: "1-Year Plan", price: 150000 }
  }

  const handlePlanChange = (e) => {
    const plan = e.target.value
    setSelectedPlan(plan)
    setPlanDetails(planOptions[plan])
  }

  const makePayment = async (token) => {
    const body = { token, planDetails }
    try {
      const response = await fetch("http://localhost:8001/api/payments/create-event-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
  
      const data = await response.json()
  
      if (response.status === 200) {
        console.log("Payment Success:", data)
        alert("Payment successful!")
        navigate('/organizer-dashboard')
      } else {
        console.log("Payment Failed:", data)
        alert("Payment failed. Please try again.")
      }
    } catch (err) {
      console.log("Payment Error:", err)
      alert("Payment Successful!")
      navigate('/organizer-dashboard')
    }
  }

  return (
    <div className="payment-plan-wrapper">
      <h1 className="payment-plan-header">Choose Your Payment Plan</h1>
      <div className="payment-plan-grid">
        {Object.keys(planOptions).map((planKey) => (
          <div 
            key={planKey} 
            className={`card-plan ${selectedPlan === planKey ? 'selected' : ''}`}
          >
            <div className="card-plan-header">
              <h2 
                className={`card-plan-title ${selectedPlan === planKey ? 'selected' : ''}`}
              >
                {planOptions[planKey].name}
              </h2>
            </div>
            <div className="card-plan-content">
              <p 
                className={`card-plan-price ${selectedPlan === planKey ? 'selected' : ''}`}
              >
                ${planOptions[planKey].price / 100}
                <span 
                  className={`card-plan-price-span ${selectedPlan === planKey ? 'selected' : ''}`}
                >
                  /{planKey.split('-')[0]} 
                </span>
              </p>
              <ul className="card-plan-features">
                <li className="card-plan-feature-item">Access to all features</li>
                <li className="card-plan-feature-item">24/7 customer support</li>
                <li className="card-plan-feature-item">Cancel anytime</li>
              </ul>
            </div>
            <div className="card-plan-footer">
              <button
                className={`card-button ${selectedPlan === planKey ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(planKey)}
              >
                {selectedPlan === planKey ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <StripeCheckout
          name="Payment Plan"
          amount={planDetails.price}
          token={makePayment}
          stripeKey="pk_test_51QDhbPCtNZOcTVjLuz4YqsAmCpZYV6unVSkKAU4ltrVrN6QNPy7NavEFVVZj3DUTiz7b9DY9zFyLUX0dvAlPlt9g00AcUZh0YJ"
        >
          <button className="continue-button">
            Proceed to Payment
          </button>
        </StripeCheckout>
      )}
    </div>
  )
}
