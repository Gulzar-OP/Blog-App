import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

export default function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <nav className="bg-white py-4 shadow">
      <div className="flex justify-between items-center container mx-auto">

        {/* Logo */}
        <div className="font-semibold text-2xl">
          Blue
          <span className="text-blue-500">Quill</span>
        </div>

        {/* Desktop Menu */}
        <div className='mx-6'>
          <ul className="hidden md:flex space-x-6 font-medium ">
          <li><Link to="/" className="hover:text-blue-500">HOME</Link></li>
          <li><Link to="/blog" className="hover:text-blue-500">BLOGS</Link></li>
          <li><Link to="/creators" className="hover:text-blue-500">CREATORS</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">ABOUT</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">CONTACT</Link></li>
        </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
            Dashboard
          </Link>
          
          <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800">
            Register
          </Link>
          <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800">
            Login
            
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={() => setShow(!show)}>
          {show ? <IoCloseSharp size={28} /> : <AiOutlineMenu size={28} />}
        </div>

      </div>

      {/* Mobile Menu */}
      {show && (
        <ul className="flex flex-col md:hidden text-lg gap-4 p-4">
          <li><Link onClick={() => setShow(false)} to="/">HOME</Link></li>
          <li><Link onClick={() => setShow(false)} to="/blog">BLOGS</Link></li>
          <li><Link onClick={() => setShow(false)} to="/creators">CREATORS</Link></li>
          <li><Link onClick={() => setShow(false)} to="/about">ABOUT</Link></li>
          <li><Link onClick={() => setShow(false)} to="/contact">CONTACT</Link></li>
          <li><Link onClick={() => setShow(false)} to="/login">LOGIN</Link></li>
        </ul>
      )}
    </nav>
  );
}
