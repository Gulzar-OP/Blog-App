import React from 'react'
import { useAuth } from '../contextAPI/AuthProvider'
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function Trending() {

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

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <div className="container mx-auto">
      <h1 className='text-2xl font-semibold mb-4'>Trending</h1>

      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-xl hover:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 mx-3">

              
              {/* Image + Gradient Overlay */}
              <div className="relative gap-4 flex flex-col p-2 hover:scale-105 duration-300">
                <img
                  src={element.blogImage.url}
                  alt="Blog Banner"
                  className="w-full h-56 object-cover rounded-t-lg"
                />

                {/* FIXED GRADIENT */}
                <div className="absolute inset-0 .bg-gradient-to-t from-black via-transparent to-transparent opacity-70 hover:opacity-90 transition-opacity duration-300"></div>

                <h1 className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {element.category}
                </h1>

                {/* <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold hover:text-yellow-400 transition-colors duration-300">
                  {element.title}
                </h1> */}
                {/* Admin Details */}
              <div className="p-4 flex items-center gap-3 shadow">
                <img
                  src={element.adminPhoto}
                  alt="Admin"
                  className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
                />

                <div className="text-gray-800">
                  <p className="text-sm font-semibold">{element.adminName}</p>
                  <p className="text-xs text-gray-500">{formatDate(element.createdAt)}</p>
                </div>
              </div>
              </div>

              

            </Link>

          ))
        ) : (
          <p>No trending blogs...</p>
        )}
      </Carousel>
    </div>
  );
}
