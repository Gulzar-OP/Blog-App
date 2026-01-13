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
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1200 }, items: 3 },
    laptop: { breakpoint: { max: 1200, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
  };

  if (!blogs || blogs.length === 0) {
    return (
      <div className="container mx-auto my-20 px-6">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl border border-orange-200 text-orange-700 font-semibold mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Trending
          </div>
          <div className="max-w-md mx-auto bg-gradient-to-br from-gray-50/50 to-white/50 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-400/20 to-yellow-500/20 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              No Trending Blogs
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Check back later for the hottest topics and trending content.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-24 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 via-yellow-400/10 to-orange-500/10 backdrop-blur-sm rounded-3xl border border-orange-200/50 shadow-xl mb-6">
          <svg className="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            Trending Now
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-yellow-500 bg-clip-text text-transparent mb-4 tracking-tight">
          What's Hot
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover the most popular blogs everyone is talking about right now
        </p>
      </div>

      {/* Carousel */}
      <div className="relative ">
        <Carousel
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          arrows={false}
          pauseOnHover={true}
          swipeable={true}
          draggable={true}
          keyBoardControl={true}
          className="carousel-container"
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {blogs.slice(0, 8).map((element, index) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="block  mx-4 first:ml-0 last:mr-0 group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl border border-white/50 hover:border-orange-200/70 overflow-hidden transform hover:-translate-y-4 transition-all duration-700 ease-out h-[480px] flex flex-col"
            >
              {/* Decorative Badge */}
              <div className="absolute top-6 right-6 z-20 ">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-1 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                  <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative flex-1 overflow-hidden rounded-3xl group-hover:rounded-b-2xl transition-all duration-700">
                <img
                  src={element?.blogImage?.url || "default_blog.png"}
                  alt={element.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-all duration-700"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold rounded-full shadow-lg border border-white/50 tracking-wide uppercase">
                    {element.category}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-8 left-6 right-6 z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white/95 bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent drop-shadow-2xl leading-tight line-clamp-2 group-hover:scale-[1.02] transition-transform duration-500">
                    {element.title}
                  </h3>
                </div>
              </div>

              {/* Author Section */}
              <div className="p-6 pt-4 bg-gradient-to-r from-white/90 to-white/50 backdrop-blur-xl border-t border-white/70">
                <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-yellow-500 p-1 rounded-2xl shadow-xl">
                      <img
                        src={element.writerPhoto}
                        alt={element.writerName}
                        className="w-full h-full rounded-2xl object-cover shadow-lg ring-2 ring-white/50"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors duration-300">
                      {element.writerName}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">{formatDate(element.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Swipe Indicators (Optional) */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-3 h-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/50"></div>
                <div className="w-3 h-3 bg-white/60 backdrop-blur-sm rounded-full shadow-lg border border-white/50"></div>
                <div className="w-3 h-3 bg-white/40 backdrop-blur-sm rounded-full shadow-lg border border-white/50"></div>
              </div>
            </Link>
          ))}
        </Carousel>

        {/* Custom Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: Math.min(4, Math.ceil(blogs.length / 3)) }).map((_, i) => (
            <button
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
