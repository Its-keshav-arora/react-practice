const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors"); // we need to install cors, because we are explicitly sending request from
// localhost:5173 to localhost:8080 and we need to allow this request.
const port = 8080;



const app = express();
app.use(express.json());
app.use(cors());              // we need to use cors to allow request from localhost:5173 to localhost:8080
app.use(express.urlencoded({ extended: true }));

const User = require("./model/user");

const dbURL = "mongodb+srv://keshav11y:fXCGmKgFi1CqeOrD@cluster0.0sxp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connection = async () => {
    await mongoose.connect(dbURL).then(() => { console.log("Connection to db"); })
        .catch((err) => { console.log("Error occurred while connecting to db", err); });
}
connection();


app.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({message: "Error occurred while fetching data from the database", err});
    }
})


app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log(email, password);

    try {
        if (email && password) {
            const user = new User({ email: email, password: password });
            await user.save();
            res.status(200).send("Login Successful from the backend Side");
        } else {
            res.status(400).send("either email or pasword is missing");
        }
    }
    catch (err) {
        res.status(500).send("Error from the catch block", err);
    }
});

app.delete("/user/:id", async (req,res) => {
    let {id: userId} = req.params;
    await User.findOneAndDelete({_id: userId})
          .then(() => {res.status(200).json({message: "User deleted successfully"})})
          .catch((err) => {res.status(500).json({message: "Error occurred while deleting the user", err})});
          
})

app.listen(port, () => {
    console.log(`app is listening to the port ${port}`);
})