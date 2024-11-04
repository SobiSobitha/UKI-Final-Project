// // src/components/ContactUs.js

// import React, { useState } from 'react';

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
//     if (formValues.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters long.';
//     }
//     if (!/\S+@\S+\.\S+/.test(formValues.email)) {
//       newErrors.email = 'Please enter a valid email address.';
//     }
//     if (formValues.message.length < 10) {
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
//         const response = await fetch('http://localhost:8001/api/contact', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formValues),
//         });

//         if (response.ok) {
//           setSuccessMessage('Your message has been sent successfully!');
//           setFormValues({ name: '', email: '', message: '' });
//           setErrors({});
//         } else {
//           const errorData = await response.json();
//           console.error('Error:', errorData.message);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
//       <h1 className="text-4xl font-bold text-purple-600 text-center mb-12">Contact Us</h1>
//       <div className="grid md:grid-cols-2 gap-12">
//         <div className="p-8 shadow-md rounded-lg bg-white">
//           <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
//           {successMessage && <p className="text-green-600">{successMessage}</p>}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block font-semibold mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formValues.name}
//                 onChange={handleInputChange}
//                 placeholder="Your Name"
//                 className="w-full p-2 border rounded"
//               />
//               {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="block font-semibold mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formValues.email}
//                 onChange={handleInputChange}
//                 placeholder="Your Email"
//                 className="w-full p-2 border rounded"
//               />
//               {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
//             </div>
//             <div>
//               <label className="block font-semibold mb-2">Message</label>
//               <textarea
//                 name="message"
//                 value={formValues.message}
//                 onChange={handleInputChange}
//                 placeholder="Your Message"
//                 className="w-full p-2 border rounded"
//                 rows="4"
//               />
//               {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
//             </div>
//             <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
//               Send Message
//             </button>
//           </form>
//         </div>
//         {/* ... Contact Info Section ... */}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-us">
            <div className="contact-text">
                <p>We’re here to help and answer any questions you might have about our volunteering platform. Reach out to us and we’ll respond as soon as we can.</p>
            </div>
            
            <div className="get-in-touch">
                <h2>Get in Touch</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            
            <div className="contact-platform">
                <h3>Contact Platform</h3>
                <p>Email: support@yourplatform.com</p>
                <p>Phone: +91 12345 67890</p>
                <p>Address: 123 Volunteer Ave, City, Country</p>
            </div>
        </div>
    );
};

export default ContactUs;
