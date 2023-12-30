import express from "express";
import "./config.js";
import cors from "cors";

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`);
});

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Backend for KTP Database");
});

app.get("/home", (req, res) => {
    console.log(req);
    res.status(234).send("Home for KTP Database");
});

import academicRoute from "./routes/academicRoute.js";
import calendarRoute from "./routes/calendarRoute.js";
import professionalRoute from "./routes/professionalRoute.js";

app.use("/academics", academicRoute);
app.use("/calendar", calendarRoute);
app.use("/professional", professionalRoute);