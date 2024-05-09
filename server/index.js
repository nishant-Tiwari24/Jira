import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/users.models.js";
import { Project } from "./models/Project.models.js";
import connect from "./database/dbconfig.js"
import { customAlphabet } from 'nanoid';
import { Contact } from "./models/contact.models.js"

import cors from "cors";
const app = express();

const corsOption = {
    origin:"http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
}

dotenv.config();
app.use(express.json());
app.use(cors(corsOption));

connect();
// student login form
app.post('/user-login', async(req, res)=>{
    try {
        const reqBody = req.body;
        const {email, password} = reqBody;
        const user = await User.findOne({email});
        if(!user)
        {
            res.json("user not found");
        }
        res.json(user);    
    } catch (error) {
        console.log(error);
    }
});

// student register form
app.post('/user-register', async(req, res)=>{
    const reqBody = req.body;
    const { username, email, password } = reqBody;
    const user = await User.findOne({email});
    if( user)
    {
        res.json("user already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);

    const contact = new Contact({
        dob:"", 
        gender:"", 
        profession:"", 
        mobile:"", 
        email:"", 
        LinkedIn:"", 
        github:"", 
        codechef:"", 
        X:"",
    });
    const cid = await contact.save();
    
    const newUser = new User({
        email,
        username,
        password,
        details: cid._id
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    res.json("new use successfully registered.");
});

// create project
app.post('/create-project', async(req, res)=>{
    try {
        const reqBody = req.body;
        const { name, desp, type, user } = reqBody;
        const nanoid = customAlphabet('1234567890abcdef', 8)
        let code = nanoid();

        const currUser = await User.findOne({username: user});
        console.log(currUser._id);

        console.log(name, desp, type);
        const newProject = new Project({
            name: name,
            description: desp,
            projectType: type,
            code,
            admin: user
        });

        const saveProject = await newProject.save();
        res.json(saveProject);
    } catch (error) {
        console.log(error);
        res.json("could not create");
    }
});

// get project detail
app.post('/get-project-detail', async(req, res)=>{
    try {
        const resp = await Project.find();
        res.json(resp);
    } catch (error) {
        console.log(error);
        res.json("coul not get detail.")
    }
})

app.post('/contact', async(req, res)=>{
    try {
        const reqBody = req.body;
        const { dob, gender, profession, mobile, email, LinkedIn, github, codechef, X, user} = reqBody;

        const users = await User.findOne({username: user});
        const cid = users.details;
        

        const updatedContact = await Contact.findOneAndUpdate(
            { _id: cid },
            { $set: { dob, gender, profession, mobile, email, LinkedIn, github, codechef, X } },
            { new: true }
        );
        console.log(updatedContact);
        res.json(updatedContact);

    } catch (error) {
        console.log(error);
        res.json("could upload contack detilas");
    }
})

app.post('/get-contact', async(req, res)=>{
    try {
        const reqBody = req.body;
        console.log(reqBody);
        const {user}  = reqBody;
        const det = await User.findOne({username: user});
        console.log(det);
        const cid = await Contact.findOne({_id: det.details});
        console.log(cid);
        res.json(cid);
    } catch (error) {
        console.log(error);
        res.json("could not get");
    }
})




app.listen(process.env.PORT, ()=>{
    console.log(`App running in port ${process.env.PORT}.`);
});


