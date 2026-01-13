import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Creators from './pages/Creators';
import { Toaster } from 'react-hot-toast';
import BlogPage from "./pages/BlogPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminBlog from './admin/AdminBlog.jsx';
import MyProfile from './dashboard/MyProfile.jsx';
import Test from './components/Test.jsx';
import { AuthProvider, useAuth } from './contextAPI/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreatorDetails from './Home/CreatorDetails.jsx';
import WriterControl from './admin/WriterControl.jsx';
const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Hide navbar/footer on auth pages
  const hideNavbarFooter = ["/login", "/register"].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarFooter && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/creators/:id" element={<CreatorDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />

        {/* Protected Routes */}
        <Route 
          path='/my-profile' 
          element={
            <ProtectedRoutes>
              <MyProfile />
            </ProtectedRoutes>
          } 
        />

        {/* Admin Only Routes */}
        <Route 
          path='/admin-dashboard' 
          element={
            <ProtectedRoutes>
              <AdminBlog />
            </ProtectedRoutes>
          } 
          
        />
        <Route path="/writer-dashboard" element={<WriterControl />} />

        {/* 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
