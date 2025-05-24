import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function Landing() {
    const [error, setError] = useState("");
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            navigate("/user-details");
        } catch (err) {
            setError("Failed to sign in with Google");
            console.error(err);
        }
    };
    return (
        <>
            {/* Hero Section with Aurora Background */}
            <AuroraBackground
                animate={true}
                speed={4}
                className="h-screen flex items-center justify-center"
            >
                <motion.div
                    className="text-center flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="space-y-4 mb-10">
                        <h1 className="text-6xl font-bold dark:text-gray-100 text-black">
                            Welcome to Starter Package
                        </h1>
                        <p className="text-xl dark:text-gray-300 text-gray-700">
                            Made with ❤️ by{" "}
                            <a
                                href="http://amandeep-singh.xyz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Amandeep Singh
                            </a>
                        </p>
                    </div>
                    <motion.button
                        className="bg-black dark:bg-white rounded-full mx-auto text-white dark:text-black px-6 py-3 font-semibold shadow-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGoogleSignIn}
                    >
                        Get Started
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </motion.button>
                </motion.div>
            </AuroraBackground>
        </>
    );
}
