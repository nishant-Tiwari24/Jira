import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        rel: "Data",
    }],
    descripton: {
        type: String,
        required: true
    },
    mark:{
        type: String,
        requied: true,
    },
    status: {
        type: String,
        // required: true,
    },
    attachFile: [
        {
            type: mongoose.Schema.Types.ObjectId,
            rel: "Reference",
        }
    ]
}, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema);