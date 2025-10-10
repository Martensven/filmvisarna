import mongoose from "mongoose";

const directorsSchema = new mongoose.Schema({
    name: {type: String}

})

export const Directors = mongoose.model("Directors", directorsSchema)