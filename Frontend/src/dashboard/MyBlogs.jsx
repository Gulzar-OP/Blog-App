import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
// const API_URL="http://blog-app-back-nine.vercel.app"
const API_URL = import.meta.env.VITE_API_URL;
  const fetchMyBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/blogs/my-blogs`,
        { withCredentials: true }
      );
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  // Format time function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>

      {/* Loading State */}
      {loading && (
        <p className="text-gray-500 text-lg animate-pulse">
          Loading your blogs...
        </p>
      )}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          You have not created any blog yet.
        </p>
      )}

      {/* Blogs List */}
      <div className="grid md:grid-cols-2 gap-6">
        {!loading &&
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-lg transition-all"
            >
              <div className="mb-2">
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                  {blog.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold">{blog.title}</h2>

              <p className="text-sm text-gray-500 mb-3">
                {formatDate(blog.createdAt)}
              </p>

              <p className="text-gray-700 line-clamp-3">{blog.content}</p>

              <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                Edit Blog
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
