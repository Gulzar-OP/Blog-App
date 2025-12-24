import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setBlog(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    };
    fetchBlog();
  }, [id]);

  if (error) return <h1 className="text-red-500 text-center mt-20">{error}</h1>;
  if (!blog) return <h1 className="text-center mt-20">Loading...</h1>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Blog Image */}
      {blog.blogImage?.url && (
        <div className="overflow-hidden rounded-lg shadow-lg mb-6 hover:scale-105 transition-transform duration-300">
          <img 
            src={blog.blogImage.url} 
            alt={blog.title} 
            className="w-full h-80 "
          />
        </div>
      )}

      {/* Blog Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{blog.title}</h1>

      {/* Blog Description / About */}
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">{blog.about}</p>

      <hr className="my-6 border-gray-300"/>

      {/* Admin Info */}
      <div className="flex items-center gap-4 mb-6">
        {blog.adminPhoto && (
          <img 
            src={blog.adminPhoto} 
            alt={blog.adminName} 
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
          />
        )}
        <div>
          <p className="font-semibold text-gray-800">{blog.adminName}</p>
          <p className="text-gray-500 text-sm">Author</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 mb-6">
        {blog.content?.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
