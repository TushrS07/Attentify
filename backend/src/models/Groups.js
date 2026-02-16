import mongoose from "mongoose";

const groupsSchema = new mongoose.Schema({
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

const Groups = mongoose.model("Groups", groupsSchema);
export default Groups;
