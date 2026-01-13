import React from 'react'
import { useAuth } from '../contextAPI/AuthProvider'
import { Link } from "react-router-dom";

export default function Hero() {
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
  console.log(blogs);
  if (!blogs || blogs.length === 0) {
    return (
      <div className="container mx-auto my-20 p-12 text-center">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-16 shadow-2xl border border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl mx-auto mb-8 flex items-center justify-center">
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            No Blogs Yet
          </h2>
          <p className="text-xl text-gray-500 max-w-md mx-auto">
            Stay tuned! Exciting content is coming soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-20 px-6 mt-25">
      {/* Header */}
      <div className="text-center mb-12 ">
        <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full text-sm font-semibold text-yellow-700 border border-yellow-200 mb-6">
          Latest Blogs
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Fresh Insights
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover the latest articles and stories from our community
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {blogs.slice(0, 4).map((element, index) => (
          <Link 
            to={`/blog/${element._id}`}
            key={element._id} 
            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/50 hover:border-yellow-200/50 overflow-hidden transform hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 ease-out"
          >
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-white to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Image Section */}
            <div className="relative mb-6 overflow-hidden rounded-2xl">
              <img 
                src={element?.blogImage?.url || "default_blog.png"} 
                alt={element.title}
                className="w-full h-48 md:h-52 object-cover group-hover:scale-110 transition-transform duration-700 rounded-2xl shadow-lg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute -bottom-5 -right-5 w-15 h-15 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-80 group-hover:opacity-100 transform  transition-all duration-700 ">
                <p className='flex justify-center items-center font-bold text-2xl'>{1+index}</p>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                {element.title}
              </h3>
              
              <div className="flex items-center space-x-4 mb-6 opacity-80 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-1">
                  <img 
                    src={element.writerPhoto} 
                    alt={element.writerName}
                    className="w-full h-full rounded-xl object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{element.writerName}</p>
                  <p className="text-xs text-gray-500">{formatDate(element.createdAt)}</p>
                </div>
              </div>

              {/* Read More Button */}
              <div className="flex items-center opacity-80 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-sm font-semibold text-yellow-600 group-hover:text-yellow-700 mr-2">
                  Read More
                </span>
              
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
