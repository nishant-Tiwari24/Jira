import mongoose from "mongoose"
// import mongooseAggregate from "mongoose-aggregate-paginate-v2"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        rel: "Contact"
    },
    works:[
        {
            type:mongoose.Schema.Types.ObjectId,
            rel:"Project",
        }
    ]

}, {timestamps: true});

// facultySchema.plugin(mongooseAggregate);

export const User = mongoose.model("User", userSchema);