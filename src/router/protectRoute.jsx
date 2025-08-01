import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loading from "../components/common/loading/Loading";

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) return <Loading />;

	if (!user) return <Navigate to="/login" replace />;

	return children;
};

export default ProtectedRoute;
