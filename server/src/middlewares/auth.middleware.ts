import { Request, Response, NextFunction } from "express";

export const authCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(401).json({ error: "Email is required" });
            return; 
        }
        next();
    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({
            error: "Authentication failed",
        });
    }
};
