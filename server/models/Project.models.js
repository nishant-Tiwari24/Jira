import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    allWork: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Work",
    },
    description: {
        type: String,
        // required: true,
    },
    admin: {
        type: String,
    },
    projectType: {
        type: String,

    },
    code: {
        type: String,
    },
    roomId: {
        type: String,
    },
    referWork: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Notes",
    }
}, {timestamps: true});

export const Project = mongoose.model("Project", projectSchema);