import React, { useState } from 'react';
import { AlertCircle, Mail, MapPin, Phone } from 'lucide-react';
import './ContactUs.css';

export default function ContactUs() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (formValues.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formValues.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccessMessage('Your message has been sent successfully!');
        setFormValues({ name: '', email: '', message: '' });
        setErrors({});
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="main-wrapper">
    <div className="contact-container">
      <div className="card">
        <h2>Send us a message</h2>
        <p>We're here to help with any questions you might have.</p>
        {successMessage && (
          <div className="alert">
            <AlertCircle className="alert-icon" />
            <div>
              <h3 className="alert-title">Success</h3>
              <p className="alert-description">{successMessage}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="input"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="input"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows={4}
              className="textarea"
            />
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>
          <button type="submit" className="button">Send Message</button>
        </form>
      </div>
      <div className="card">
        <h2>Contact Information</h2>
        <p>Get in touch with us through these channels.</p>
        <div className="contact-info">
          <div className="contact-item">
            <Mail className="contact-item-icon" />
            <p className="contact-item-text">info@voluntry.com</p>
          </div>
          <div className="contact-item">
            <Phone className="contact-item-icon" />
            <p className="contact-item-text">0753648410</p>
          </div>
          {/* <div className="contact-item">
            <MapPin className="contact-item-icon" />
            <p className="contact-item-text">123 Volunteer Ave, City, Country</p>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { AlertCircle, Mail, Phone } from 'lucide-react';
// import './ContactUs.css';

// export default function ContactUs() {
//   const [formValues, setFormValues] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');

//   const validate = () => {
//     const newErrors = {};

//     // Name validation
//     if (!formValues.name.trim()) {
//       newErrors.name = 'Name is required.';
//     } else if (formValues.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters long.';
//     } else if (!/^[a-zA-Z\s]+$/.test(formValues.name)) {
//       newErrors.name = 'Name should only contain letters and spaces.';
//     }

//     // Email validation
//     if (!formValues.email.trim()) {
//       newErrors.email = 'Email is required.';
//     } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
//       newErrors.email = 'Please enter a valid email address.';
//     }

//     // Message validation
//     if (!formValues.message.trim()) {
//       newErrors.message = 'Message is required.';
//     } else if (formValues.message.length < 10) {
//       newErrors.message = 'Message must be at least 10 characters long.';
//     }

//     return newErrors;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       try {
//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setSuccessMessage('Your message has been sent successfully!');
//         setFormValues({ name: '', email: '', message: '' });
//         setErrors({});
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="contact-container">
//         <div className="card">
//           <h2>Send us a message</h2>
//           <p>We're here to help with any questions you might have.</p>
//           {successMessage && (
//             <div className="alert">
//               <AlertCircle className="alert-icon" />
//               <div>
//                 <h3 className="alert-title">Success</h3>
//                 <p className="alert-description">{successMessage}</p>
//               </div>
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="form-group">
//               <label className="label" htmlFor="name">Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 value={formValues.name}
//                 onChange={handleInputChange}
//                 placeholder="Your Name"
//                 className="input"
//               />
//               {errors.name && <p className="error-message">{errors.name}</p>}
//             </div>

//             {/* Email Field */}
//             <div className="form-group">
//               <label className="label" htmlFor="email">Email</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formValues.email}
//                 onChange={handleInputChange}
//                 placeholder="Your Email"
//                 className="input"
//               />
//               {errors.email && <p className="error-message">{errors.email}</p>}
//             </div>

//             {/* Message Field */}
//             <div className="form-group">
//               <label className="label" htmlFor="message">Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formValues.message}
//                 onChange={handleInputChange}
//                 placeholder="Your Message"
//                 rows={4}
//                 className="textarea"
//               />
//               {errors.message && <p className="error-message">{errors.message}</p>}
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="button">Send Message</button>
//           </form>
//         </div>

//         {/* Contact Information */}
//         <div className="card">
//           <h2>Contact Information</h2>
//           <p>Get in touch with us through these channels.</p>
//           <div className="contact-info">
//             <div className="contact-item">
//               <Mail className="contact-item-icon" />
//               <p className="contact-item-text">info@voluntry.com</p>
//             </div>
//             <div className="contact-item">
//               <Phone className="contact-item-icon" />
//               <p className="contact-item-text">0753648410</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
