import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Axios default config with credentials
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = API_URL;
  }, []);

  // Fetch profile and check auth
  const checkAuth = useCallback(async () => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await axios.get(`${API_URL}/api/users/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check failed:", error);
      Cookies.remove("authToken");
      setIsAuthenticated(false);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch blogs with auth
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs/all-blogs`);
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    }
  }, []);

  // Initial load
  useEffect(() => {
    checkAuth();
    fetchBlogs();
  }, [checkAuth, fetchBlogs]);

  // Refresh blogs function
  const refreshBlogs = useCallback(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const value = {
    blogs,
    profile,
    isAuthenticated,
    loading,
    refreshBlogs,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
