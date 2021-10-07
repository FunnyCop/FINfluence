require('dotenv').config();
const express = require("express");
const cors = require("cors")
const cookies = require("cookie-parser");

const port = 8000;
const app = express();

app.use(cors({
    //accept login credentials coming from frontend origin
    credentials:true,
    origin:"http://localhost:3000"
}));

app.use(express.json());

app.use(cookies());
// app.use(express.static("images"))//folder to serve imgs from


require("./server/config/mongoose.config");


const userRoutes = require("./server/routes/user.routes");
userRoutes(app);

const questionRoutes = require("./server/routes/question.routes");
questionRoutes(app)

const answerRoutes = require("./server/routes/answer.routes");
answerRoutes(app);


app.listen( port, ()=> console.log(`Listening on port:${port}`));

