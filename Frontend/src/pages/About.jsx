import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-lg text-gray-600">
            We are creating a modern space for blogs, creativity, knowledge and community —  
            where users express freely and learn together.
          </p>
        </motion.div>
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "5K+", label: "Monthly Visitors" },
            { number: "250+", label: "Blogs Published" },
            { number: "20+", label: "Creators" },
            { number: "3 Years", label: "Experience" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gray-100 rounded-xl shadow-sm"
            >
              <h2 className="text-3xl font-bold text-blue-600">{item.number}</h2>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- MISSION SECTION ---------------- */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To build a powerful and modern blog platform where ideas become stories  
            and stories inspire people.  
            <br /><br />
            We focus on simplicity, clean UI, accessibility, and giving creators  
            a smooth writing experience that feels powerful yet effortless.
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
          className="rounded-2xl shadow-lg"
          alt="Mission"
        />
      </section>

      {/* ---------------- TIMELINE ---------------- */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-center text-4xl font-bold mb-12">Our Journey</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { year: "2023", text: "Idea was born — A clean blogging place with modern UI." },
            { year: "2024", text: "Beta version launched with first 100 users." },
            { year: "2025", text: "Grew to thousands of writers and readers." },
            { year: "2026", text: "Expanding into a global content platform." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600"
            >
              <h3 className="text-xl font-bold text-blue-600">{item.year}</h3>
              <p className="text-gray-700 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- TEAM SECTION ---------------- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-12">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {[
            {
              name: "Gulzar Hussain",
              role: "Founder & Full-Stack Developer",
              img: "https://randomuser.me/api/portraits/men/75.jpg",
            },
            {
              name: "Aisha Khan",
              role: "UI/UX Designer",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Ravi Sharma",
              role: "Content Lead",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-xl hover:scale-105 transition-all"
            >
              <img
                src={member.img}
                alt="Team"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500"
              />
              <h3 className="text-xl font-semibold mt-4 text-center">{member.name}</h3>
              <p className="text-gray-600 text-center">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACT CTA ---------------- */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Want to Collaborate?</h2>
        <p className="text-lg mb-6">
          We are always open to creators, developers, writers, and designers!
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
