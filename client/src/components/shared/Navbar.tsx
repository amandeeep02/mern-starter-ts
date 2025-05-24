"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ModeToggle } from "../ModeToggle";
import axios from "axios";

export function NewNavbar() {
    const navItems = [
        {
            name: "Dashboard",
            link: "/dashboard",
        },
        {
            name: "Feature 2",
            link: "#",
        },
        {
            name: "Feature 3",
            link: "#",
        },
    ];
    const [error, setError] = useState("");
    const { currentUser, loginWithGoogle, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    // Fetch user details when currentUser changes
    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser && currentUser.email) {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/current-user`,
                        {
                            headers: {
                                authtoken: await currentUser.getIdToken(),
                            },
                        }
                    );
                    if (response.data && response.data.firstName) {
                        setUserName(response.data.firstName);
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            } else {
                setUserName("");
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            navigate("/user-details");
        } catch (err) {
            setError("Failed to sign in with Google");
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            setError("Failed to log out");
            console.error(err);
        }
    };

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    {/* Only show nav items if user is logged in */}
                    {currentUser && <NavItems items={navItems} />}
                    <div className="flex items-center gap-4">
                        {currentUser ? (
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-neutral-800 dark:text-white">
                                    Hi{" "}
                                    {userName ||
                                        currentUser.displayName?.split(
                                            " "
                                        )[0] ||
                                        "User"}
                                    !
                                </span>
                                <NavbarButton
                                    variant="dark"
                                    className="px-4 py-2 font-medium"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </NavbarButton>
                            </div>
                        ) : (
                            <NavbarButton
                                variant="dark"
                                className="px-5 py-3 font-semibold shadow-lg"
                                onClick={handleGoogleSignIn}
                            >
                                Login
                            </NavbarButton>
                        )}
                        <NavbarButton variant="dark">
                            <ModeToggle />
                        </NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {/* Only show nav items if user is logged in */}
                        {currentUser &&
                            navItems.map((item, idx) => (
                                <a
                                    key={`mobile-link-${idx}`}
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="relative text-neutral-600 dark:text-neutral-300"
                                >
                                    <span className="block">{item.name}</span>
                                </a>
                            ))}
                        <div className="flex w-full flex-col gap-4">
                            {currentUser ? (
                                <>
                                    <div className="text-center text-neutral-800 dark:text-white font-medium mb-2">
                                        Hi{" "}
                                        {userName ||
                                            currentUser.displayName?.split(
                                                " "
                                            )[0] ||
                                            "User"}
                                        !
                                    </div>
                                    <NavbarButton
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        variant="primary"
                                        className="w-full"
                                    >
                                        Logout
                                    </NavbarButton>
                                </>
                            ) : (
                                <NavbarButton
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleGoogleSignIn();
                                    }}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Login
                                </NavbarButton>
                            )}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
