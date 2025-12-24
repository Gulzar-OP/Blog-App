import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // const fetchProfile = async () => {
        //     try {
        //         const token = Cookies.get("authToken")
        //         console.log("Token is here: ",token)
        //     const response = await axios.get(
        //         "http://localhost:3000/api/users/my-profile",
        //         {
        //         withCredentials: true,
        //         headers: { "Content-Type": "application/json" },
        //         }
        //     );

        //     // console.log(response.data); // check once

        //     setProfile(response.data);   // correct
        //     setIsAuthenticated(true);
        //     } catch (e) {
        //     console.log(e);
        //     }
        // }

        const fetchProfile = async () => {
            
            try {
                const token = Cookies.get("authToken");
                console.log("token:  ",token)
                const response = await axios.get(
                "/api/users/my-profile",
                { withCredentials: true }
                );
                
                setProfile(response.data);
                setIsAuthenticated(true);

            } catch (e) {
                setIsAuthenticated(false);
            }
        }


        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/api/blogs/all-blogs");
                // console.log(response);
                setBlogs(response.data.blogs);
            } catch (e) {
                console.log(e);
            }
        };
        fetchBlogs();
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ blogs,profile,isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// hook
export const useAuth = () => useContext(AuthContext);
