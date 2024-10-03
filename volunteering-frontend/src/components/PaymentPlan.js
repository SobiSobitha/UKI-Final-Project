import React from 'react';

const PaymentPlan = ({ selectedPlan, setSelectedPlan }) => {
  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  return (
    <div>
      <h3>Select a Payment Plan</h3>
      <label>
        <input
          type="radio"
          value="1-month"
          checked={selectedPlan === '1-month'}
          onChange={handlePlanChange}
        />
        1-Month Plan
      </label>
      <label>
        <input
          type="radio"
          value="6-month"
          checked={selectedPlan === '6-month'}
          onChange={handlePlanChange}
        />
        6-Month Plan
      </label>
      <label>
        <input
          type="radio"
          value="1-year"
          checked={selectedPlan === '1-year'}
          onChange={handlePlanChange}
        />
        1-Year Plan
      </label>
    </div>
  );
};

export default PaymentPlan;
