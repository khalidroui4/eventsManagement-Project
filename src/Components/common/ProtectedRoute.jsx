import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const { addToast } = useToast();

    useEffect(() => {
        if (!user) {
            addToast("Veuillez vous connecter pour accéder à cette page", "warning");
        }
    }, [user, addToast]);

    if (!user) {
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
