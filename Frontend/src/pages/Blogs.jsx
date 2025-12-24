import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/blogs/all-blogs");
        console.log(data.blogs)
        setBlogs(data.blogs);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">Latest Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Blog Image */}
              <img
                src={blog.blogImage?.url}
                alt="Blog"
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 line-clamp-3">{blog.about}</p>

                <div className="mt-5">
                  <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
