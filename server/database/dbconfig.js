import mongoose from "mongoose";

const connect = async() =>{
    try {
        await mongoose.connect("mongodb+srv://classroom:class123@cluster0.kve6zia.mongodb.net/");
        console.log("successfully conneted to database.");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to database.");
    }
}
// connect();
export default connect;
