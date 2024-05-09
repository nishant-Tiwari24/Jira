import mongoose from "mongoose"

const workSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    task:{
        type: mongoose.Schema.Types.ObjectId,
        rel: "Task",
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            rel: "User"
        }
    ]
}, {timestamps: true});

export const Work = mongoose.model("Work", workSchema);