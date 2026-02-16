import mongoose from "mongoose";

const SubjectsSchema = new mongoose.Schema({
    code: { type: String, required: false },
    name: { type: String, required: false }
});

const Subjects = mongoose.model("Subjects", SubjectsSchema);
export default Subjects;    