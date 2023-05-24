import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { orderRoutes } from "./routes/index.js";
// import db from './models/index.js'

dotenv.config();
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//routes configuration
app.use("/inventory", orderRoutes);
//db connection
// db.sequelize.sync()

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
