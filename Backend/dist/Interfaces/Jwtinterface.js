import jwt from 'jsonwebtoken';
export const sign = ({ payload, JWT_SECRET }) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    return token;
};
export const jwtverify = ({ token, JWT_SECRET }) => {
    try {
        const decodedPayload = jwt.verify(token, JWT_SECRET);
        return decodedPayload;
    }
    catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};
