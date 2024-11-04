// import React from 'react';
// import picture from '/home/uki-student/Documents/voluntry final project/volunteering-frontend/src/components/DALL·E 2024-10-07 22.30.57 - An inspiring background image for a volunteering platform, showcasing a vibrant community scene with volunteers helping at a local event. The image fe.webp';


// export default function AboutUs() {
//   return (
//     <div className="container mx-auto px-4 py-6 h-[50vh]">
//       <div className="grid md:grid-cols-2 gap-4 items-center h-full">
//         <div className="relative w-full h-full">
//           <img
//             src={picture}  // Ensure this is the correct path to your image
//             alt="About Us"
//             className="object-cover rounded-lg w-full h-full"
//           />
//         </div>
//         <div className="space-y-4 overflow-auto h-full pr-4">
//           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Our Company</h1>
//           <p className="text-purple-600">
//             Welcome to our company! We are a passionate team dedicated to delivering innovative solutions
//             that make a difference in people's lives. Our journey began with a simple idea and has grown
//             into a mission to transform the industry.
//           </p>
//           <p className="text-purple-600">
//             With years of experience and a commitment to excellence, we strive to exceed expectations
//             in everything we do. Our team of experts brings diverse skills and perspectives, allowing us
//             to tackle complex challenges and create unique opportunities for our clients.
//           </p>
//           <p className="text-purple-600">
//             We believe in the power of collaboration, integrity, and continuous improvement. These values
//             guide our work and help us build lasting relationships with our clients and partners.
//           </p>
//           <button className="mt-2 bg-purple-500 text-white hover:bg-purple-600 px-4 py-2 rounded">
//             Learn More
//           </button> {/* Regular button tag */}
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import './AboutUs.css';
import aboutImage from '/home/uki-student/Documents/voluntry final project/volunteering-frontend/src/components/DALL·E 2024-10-07 22.30.57 - An inspiring background image for a volunteering platform, showcasing a vibrant community scene with volunteers helping at a local event. The image fe.webp'; // Replace with the correct path to your image

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-photo">
                <img src={aboutImage} alt="About Us" />
            </div>
            <div className="about-text">
                <h2>About Our Company</h2>
                <p>Here’s where you can write about your company’s mission, vision, and story. Describe how your volunteering platform helps organizers and volunteers connect, assign roles, and achieve goals together.</p>
            </div>
        </div>
    );
};

export default AboutUs;
