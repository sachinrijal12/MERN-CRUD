import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import route from './routes/userRoutes.js';
import cors from "cors";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("DB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running at the port${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use('/api', route);