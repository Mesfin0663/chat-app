const express = require("express"); //importing the express library
const app = express(); //creating the express application by using the top level function express() it is inmported by express node

const mongoose = require("mongoose");

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config();

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
//     console.log("connected to MongoDb")
// })

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
  })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log("Backend server is running");
})