import React, { useState } from 'react';
import './TermsAndConditions.css'; // Create a CSS file for styling this component

const TermsAndConditions = ({ onAgree, onCancel }) => {
    const [isAgreed, setIsAgreed] = useState(false);

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    return (
        <div className="terms-modal">
            <div className="modal-content">
                <h2>Terms and Conditions</h2>
                <p>
                    Please carefully read the terms and conditions below before registering as an organizer.
                </p>
                <div className="terms-content">
                    <p>
                        1. As an organizer, you agree to adhere to all community guidelines and ensure that all events
                        are carried out in a safe and responsible manner.
                    </p>
                    <p>
                        2. You are responsible for the safety and well-being of all volunteers who participate in events you organize.
                    </p>
                    <p>
                        3. Voluntry reserves the right to remove or suspend organizers who fail to comply with these terms.
                    </p>
                    <p>
                        4. All personal information must be kept secure, and you agree not to share volunteer details with any third parties.
                    </p>
                    <p>
                        5. By continuing, you acknowledge that Voluntry is not liable for any damages or liabilities that may occur during events.
                    </p>
                </div>
                <div className="agree-section">
                    <input 
                        type="checkbox" 
                        id="agreeCheckbox" 
                        checked={isAgreed} 
                        onChange={handleCheckboxChange} 
                    />
                    <label htmlFor="agreeCheckbox">I have read and agree to the Terms and Conditions</label>
                </div>
                <div className="terms-buttons">
                    <button 
                        className="button agree-button" 
                        onClick={onAgree} 
                        disabled={!isAgreed} // Disable button unless checkbox is checked
                    >
                        I Agree
                    </button>
                    <button className="button cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
