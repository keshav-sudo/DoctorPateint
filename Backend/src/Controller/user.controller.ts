import { Request, Response } from "express";

export const getme = async (req: Request, res: Response) => {
    
    return res.status(200).json({
        message: "User data fetched successfully.",
        success: true,
        data: req.user
    });
};
