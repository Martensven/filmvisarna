import mongoose from "mongoose";

const directorsSchema = new mongoose.Schema({
    directorsId : {type: Number},
    name: {type: String}

})

export const Directors = mongoose.model("Directors", directorsSchema)