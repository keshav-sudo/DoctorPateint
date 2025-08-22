import express from "express";
import cookieSession from "cookie-session";
import Dotenv from "./Utils/Dotenv.js";



const app = express();
app.use(express.json());



app.listen(Dotenv.PORT , () => {
  console.log(`Your App is listen on 
    ${Dotenv.PORT}}`)
});
