import * as dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const Dotenv = {
    JWT_SECRET,
    PORT
};
export default Dotenv;
