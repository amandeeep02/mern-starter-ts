import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, UserCredential } from "firebase/auth";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import axios from "axios";

interface AuthContextType {
    currentUser: User | null;
    loginWithGoogle: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const newToken = await user.getIdToken();
                setToken(newToken);
            } else {
                setToken("");
            }
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    async function loginWithGoogle() {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        if (result.user) {
            const newToken = await result.user.getIdToken();
            setToken(newToken);
            createOrUpdateUser(newToken);
        }
        return result;
    }

    async function logout() {
        return auth.signOut();
    }

    const createOrUpdateUser = async (authtoken: string) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/user`,
                {},
                {
                    headers: {
                        authtoken,
                    },
                }
            );
            return response.data;
        } catch (err) {
            console.error("Error creating/updating user:", err);
        }
    };

    const value: AuthContextType = {
        currentUser,
        loginWithGoogle,
        logout,
        token,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
