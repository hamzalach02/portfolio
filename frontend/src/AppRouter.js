import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Cookies from 'js-cookie'; // Import Cookies
import Users from './pages/Users';
import ProfilePage from './pages/profile/Myprofile';
import UserProfile from './pages/profile/UserProfile';

// Custom Route component to handle authentication
const ProtectedRoute = ({ element, ...rest }) => {
    // Check if the user is authenticated
    const isAuthenticated = Cookies.get('jwtToken');

    return isAuthenticated ? element : <Navigate to="/" />;
};

function AppRouter() {
    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}> {/* Set background color and minimum height */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/users" element={<ProtectedRoute element={<Users />} />} /> 
                    <Route path="/myprofile" element={<ProtectedRoute element={<ProfilePage />} />} />
                    {/* Use a route parameter to capture the user's ID */}
                    <Route path="/userprofile/:id" element={<ProtectedRoute element={<UserProfile />} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default AppRouter;
