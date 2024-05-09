import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    material: [
        {
            type: mongoose.Schema.Types.ObjectId,
            rel: "Reference",
        }
    ]
},{timestamps: true});

export default Notes = mongoose.model("Notes", noteSchema);