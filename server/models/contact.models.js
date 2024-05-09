import mongoose from "mongoose";

const contackSchema = new mongoose.Schema({
    dob:{
        type:String,
    },
    gender:{
        type:String,
    },
    profession:{
        type:String,
    },
    mobile:{
        type:String,
    },
    email:{
        type:String,
    },
    LinkedIn:{
        type:String,
    },
    github:{
        type:String,
    },
    codechef:{
        type:String,
    },
    X:{
        type:String,
    },

}, {timestamps:true});

export const Contact = mongoose.model("Contact", contackSchema);