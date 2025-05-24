import { Route, Routes } from "react-router-dom";
import { Landing } from "../pages/Landing";
import { PrivateRoute } from "./PrivateRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { UserDetails } from "../pages/auth/UserDetails";
import { Dashboard } from "@/pages/Dashboard";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/user-details"
                    element={
                        <PrivateRoute>
                            <UserDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default AppRoutes;
