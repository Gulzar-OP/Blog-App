import React from 'react'
import { useAuth } from '../contextAPI/AuthProvider'
import { Link } from "react-router-dom";

export default function Code() {
  const { blogs } = useAuth();
  function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
  // Filter only Game blogs
  const gameBlogs = blogs?.filter(blog => blog.category === "Programming & Technology");

  return (
    <div className="container mx-auto py-8">
      
      {/* Heading */}
      <h1 className='text-3xl font-bold mb-2'>Coding</h1>
      <p className='text-gray-600 mb-8'></p>

      {/* If no blogs */}
      {!gameBlogs || gameBlogs.length === 0 ? (
        <p className="text-gray-500">No Coding blogs available...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {gameBlogs.map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              
              {/* Image Section */}
              <div className="relative">
                <img
                  src={element.blogImage.url}
                  alt="Blog Banner"
                  className="w-full h-56 object-cover"
                />

                {/* Gradient */}
                <div className="absolute inset-0 .bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {element.category}
                </span>

                {/* Title */}
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow-lg">
                  {element.title}
                </h1>
              </div>

              {/* Admin Section */}
              <div className="p-4 flex items-center gap-4">
                <img
                  src={element.adminPhoto}
                  alt="Admin"
                  className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800">{element.adminName}</p>
                 <p className="text-xs text-gray-500">{formatDate(element.createdAt)}</p>

                </div>
              </div>

            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
