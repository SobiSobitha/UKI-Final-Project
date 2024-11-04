// import { useState } from 'react';
// import { Bell, Edit, Mail, Phone, MapPin, Calendar, Clock } from 'react';

// // interface Notification {
// //   id: number;
// //   message: string;
// //   date: string;
// // }

// export default function VolunteerProfile() {
//   const [notifications, setNotifications] = useState<Notification()>([
//     { id: 1, message: "New event: Beach Cleanup this Saturday", date: "2023-06-15" },
//     { id: 2, message: "Your shift for Soup Kitchen is confirmed", date: "2023-06-14" },
//     { id: 3, message: "Thank you for volunteering at the Animal Shelter!", date: "2023-06-10" },
//   ]);
  
//   const [emailNotifications, setEmailNotifications] = useState(true);

//   const toggleEmailNotifications = () => {
//     setEmailNotifications(prev => !prev);
//     // Optionally, update the preference in your backend here
//   };

//   return (
//     <div className="min-h-screen bg-purple-50 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="bg-purple-700 text-white p-6 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
//               <img src="/placeholder.svg" alt="Volunteer" className="object-cover w-full h-full" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold">Jane Doe</h2>
//               <p className="text-purple-200">Volunteer since 2022</p>
//             </div>
//           </div>
//           <button className="bg-white text-purple-700 hover:bg-purple-100 rounded-full px-4 py-2 flex items-center">
//             <Edit className="mr-2 h-4 w-4" /> Edit Profile
//           </button>
//         </div>

//         <div className="p-6 grid gap-6 md:grid-cols-2">
//           {/* Contact Information Section */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-purple-700">Contact Information</h3>
//             <div className="flex items-center space-x-2 text-sm">
//               <Mail className="text-purple-500" />
//               <span>jane.doe@example.com</span>
//             </div>
//             <div className="flex items-center space-x-2 text-sm">
//               <Phone className="text-purple-500" />
//               <span>(555) 123-4567</span>
//             </div>
//             <div className="flex items-center space-x-2 text-sm">
//               <MapPin className="text-purple-500" />
//               <span>San Francisco, CA</span>
//             </div>
//           </div>

//           {/* Volunteer Information Section */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-purple-700">Volunteer Information</h3>
//             <div className="flex items-center space-x-2 text-sm">
//               <Calendar className="text-purple-500" />
//               <span>Available on weekends</span>
//             </div>
//             <div className="flex items-center space-x-2 text-sm">
//               <Clock className="text-purple-500" />
//               <span>Total hours: 120</span>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Environment</span>
//               <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Animal Care</span>
//               <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Education</span>
//             </div>
//           </div>
//         </div>

//         {/* Notifications Section */}
//         <div className="bg-purple-50 p-6">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-purple-700">Notifications</h3>
//             <div className="flex items-center space-x-2">
//               <label htmlFor="email-notifications" className="text-sm text-purple-700">Email Notifications</label>
//               <input 
//                 type="checkbox"
//                 id="email-notifications"
//                 checked={emailNotifications}
//                 onChange={toggleEmailNotifications}
//                 className="cursor-pointer"
//               />
//             </div>
//           </div>
//           <div className="h-48 overflow-y-auto mt-4 bg-white p-4 border border-purple-200 rounded-md">
//             {notifications.map((notification) => (
//               <div key={notification.id} className="flex items-start space-x-4 mb-4">
//                 <Bell className="text-purple-500 mt-1" />
//                 <div>
//                   <p className="text-sm">{notification.message}</p>
//                   <p className="text-xs text-purple-500">{notification.date}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
