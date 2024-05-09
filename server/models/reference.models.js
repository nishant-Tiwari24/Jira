import mongoose from "mongoose";

const referSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    text: {
        type: String,
    }
}, {timestamps: true});

export default Reference = mongoose.model("Reference", referSchema);