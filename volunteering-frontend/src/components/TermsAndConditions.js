import React from 'react';
import './TermsAndConditions.css'; // Create a CSS file for styling this component

const TermsAndConditions = ({ onAgree, onCancel }) => {
    return (
        <div className="terms-modal">
            <div className="modal-content">
                <h2>Terms and Conditions</h2>
                <p>Please read and agree to our terms and conditions to proceed with the registration as an organizer.</p>
                <button className="button agree-button" onClick={onAgree}>I Agree</button>
                <button className="button cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default TermsAndConditions;
