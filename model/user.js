import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    profilePic: {
        type :String, 
        required : true
    },
    name: String,
    Father: String,
    CNIC: String,
    email: String,
    Batch: String,
    Roll_Number: String,
    Slot: String,
    gender: String,
    describe: String,
});
const Users = mongoose.models.crudapp || mongoose.model('crudapp', userSchema)
export default Users;
