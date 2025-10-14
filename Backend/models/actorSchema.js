import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
    name: {type: String, required: true},

})

export const Actors = mongoose.model("Actors", actorSchema)