import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Creators() {

  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          "/api/users/getAdmin",
          { withCredentials: true }
        );

        // console.log(data);
        setAdmin(data.slice(0, 4)); // ✅ Only show first 4 admins
      } catch (error) {
        console.log("Error fetching admin:", error);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="container mx-auto py-8  ">
      <h1 className="text-3xl font-bold mb-4 ">Creators</h1>

      {admin.length === 0 ? (
        <p className="text-gray-500">Loading creators...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full ">

          {admin.map((user) => (
            <div 
              key={user._id} 
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <img 
                src={user.photo.url} 
                alt="Creator" 
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 mx-auto mb-3"
              />

              <h2 className="text-xl font-semibold text-center">{user.name}</h2>
              <p className="text-sm text-center text-gray-500">{user.role}</p>
              <p className="text-gray-400 text-center text-xs">{user.email}</p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
