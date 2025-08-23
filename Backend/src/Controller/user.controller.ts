import { Request, Response } from "express";
import { date } from "zod";
import { PrismaClient , Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getme = async (req: Request, res: Response) => {
    
  
    

    return res.status(200).json({
        message: "User data fetched successfully.",
        success: true,
        data: req.user
    });
};

export const getall = async (req: Request, res: Response) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            message: "User not authenticated.",
            success: false,
            data: null
        });
    }

    try {
       
       const userDetails = await prisma.user.findUnique({
    where: {
        id: req.user.id
    },
    select: { 
        id: true,
        email: true,
        name: true,
        role: true,
        
    }
});

        if (!userDetails) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
                data: null
            });
        }
        
        return res.status(200).json({
            message: "User data fetched successfully.",
            success: true,
            data: userDetails
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error.",
            success: false,
            error: error
        });
    }
};