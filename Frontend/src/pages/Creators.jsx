import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Creators() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          "/api/users/getAdmin"
        );
        // console.log(data)
        setAdmins(data);
      } catch (err) {
        console.error("Error fetching admin:", err);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        ✨ Our Creators
      </h1>

      {admins.length === 0 ? (
        <p className="text-gray-600">Loading creators...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all"
            >
              <img
                src={admin.photo.url}
                alt={admin.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 object-cover"
              />

              <h2 className="text-xl font-semibold text-center mt-4">
                {admin.name}
              </h2>
              <p className="text-gray-500 text-center">{admin.email}</p>
              <p className="text-gray-500 text-center">{admin.role}</p>
              <p className="text-gray-500 text-center">{admin.phone}</p>
              <p className="text-gray-500 text-center">{admin.education}</p>

              <p className="text-sm text-gray-600 mt-3 text-center">
                {admin.bio || "Creator & Content Manager"}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
