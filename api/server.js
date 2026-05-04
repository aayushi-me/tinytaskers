import dotenv from "dotenv";
import express from "express";
import initializeApp from "./service/app.js";


dotenv.config();
const app = express();
initializeApp(app);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
