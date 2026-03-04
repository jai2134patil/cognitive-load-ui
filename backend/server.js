const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const loadRoutes = require("./routes/loadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://jai2134:2134Gaigoye%23@cluster0.1m3yhib.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.use("/api/load", loadRoutes);

app.listen(5000, ()=>{
console.log("Server running on port 5000");
});