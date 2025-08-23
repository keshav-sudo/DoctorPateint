import jwt from 'jsonwebtoken';
import Dotenv from "../Utils/Dotenv.js";
export const middleware = (req, res, next) => {
    console.log("entered");
    const JWT_SECRET = Dotenv.JWT_SECRET;
    console.log(JWT_SECRET);
    if (!JWT_SECRET) {
        console.error("FATAL ERROR: JWT_SECRET is not defined. Check your .env file and server start process.");
        return res.status(500).json({ message: "Internal Server Error: Server is not configured correctly." });
    }
    // Read the token from the cookie
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided.",
            success: false,
        });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach the user payload to the request object
        req.user = decoded;
        // Proceed to the next handler (your controller)
        next();
    }
    catch (error) {
        // This will catch an invalid or expired token
        return res.status(401).json({
            message: "Unauthorized: Invalid token.",
            success: false,
        });
    }
};
