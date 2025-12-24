import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c470d355-0012-48c2-bb9e-54fc002838f1",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message Sent Successfully!");
        reset(); // clear form
      } else {
        toast.error("Failed to send message!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-10">
        
        <h1 className="text-4xl font-bold text-center mb-3">Contact Us</h1>
        <p className="text-center text-gray-500 mb-10">
          We're here to help! Feel free to drop a message anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("username", { required: true })}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">Name is required.</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required.</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                {...register("message", { required: true })}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  Message is required.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="p-5 bg-blue-50 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">📍 Address</h2>
              <p className="text-gray-600">
                Haldia Institute of Technology,
                Haldia, West Bengal, India
              </p>
            </div>

            <div className="p-5 bg-green-50 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">📞 Phone</h2>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="p-5 bg-yellow-50 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
              <p className="text-gray-600">support@yourblog.com</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
