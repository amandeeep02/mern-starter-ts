import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const createOrUpdateUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName, role } = req.body;

    try {
        const user = await UserModel.findOneAndUpdate(
            { email },
            {
                firstName,
                lastName,
                role,
                email,
            },
            { new: true, upsert: true }
        );
        res.json(user);
    } catch (err) {
        console.error("Create/Update user error:", err);
        res.status(400).json({ error: "Failed to create/update user" });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Get current user error:", err);
        res.status(400).json({ error: "Failed to get current user" });
    }
};
