import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
    actorId : {type: Number},
    name: {type: String, required: true},

})

export const Actors = mongoose.model("Actors", actorSchema)