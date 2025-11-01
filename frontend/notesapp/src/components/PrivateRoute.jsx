// frontend/src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Check if the userToken exists in localStorage (the token saved upon successful login)
    const isAuthenticated = !!localStorage.getItem("userToken");
    
    // If authenticated, render the children routes (Outlet renders the Home component)
    // If not authenticated, redirect the user to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;