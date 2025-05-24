"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dropdown } from "@/components/Dropdown";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserDetails() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        if (currentUser) {
            // Split display name into first and last name
            const names = currentUser.displayName?.split(" ") || ["", ""];
            setFormData({
                firstname: names[0] || "",
                lastname: names.slice(1).join(" ") || "",
                email: currentUser.email || "",
                role: "",
            });
        }
    }, [currentUser]);

    const handleroleChange = (value: string) => {
        setFormData((prev) => ({ ...prev, role: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:5000/api/user`,
                {
                    firstName: formData.firstname,
                    lastName: formData.lastname,
                    email: formData.email,
                    role: formData.role,
                }
            );

            if (response.data) {
                console.log("User details updated:", response.data);
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Error updating user details:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-neutral-800 align-middle justify-center border md:border-2 border-neutral-200 dark:border-neutral-700">
                <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100">
                    Welcome to Starter Package
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm mt-2">
                    Please fill in the form below to create an account
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label
                                htmlFor="firstname"
                                className="text-gray-700 dark:text-gray-200"
                            >
                                First name
                            </Label>
                            <Input
                                id="firstname"
                                value={formData.firstname}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        firstname: e.target.value,
                                    }))
                                }
                                placeholder="Tyler"
                                type="text"
                                className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-white border-gray-300 dark:border-neutral-700 placeholder-gray-500 dark:placeholder-neutral-400"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label
                                htmlFor="lastname"
                                className="text-gray-700 dark:text-gray-200"
                            >
                                Last name
                            </Label>
                            <Input
                                id="lastname"
                                value={formData.lastname}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        lastname: e.target.value,
                                    }))
                                }
                                placeholder="Durden"
                                type="text"
                                className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-white border-gray-300 dark:border-neutral-700 placeholder-gray-500 dark:placeholder-neutral-400"
                            />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label
                            htmlFor="email"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            disabled
                            className="bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-neutral-700 placeholder-gray-500 dark:placeholder-neutral-400"
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label
                            htmlFor="role"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            Role
                        </Label>
                        <Dropdown onSelect={handleroleChange} />
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-neutral-600 to-neutral-800 dark:from-zinc-900 dark:to-zinc-800 block w-full text-white rounded-md h-10 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                        type="submit"
                    >
                        Finish &rarr;
                        <BottomGradient />
                    </button>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
