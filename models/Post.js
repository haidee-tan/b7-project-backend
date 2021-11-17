const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    name: String,
    description: String,
    availability: Date,
    price: Number,
    photo: String,
    quantity: Number,
    status: String,
    userId: Schema.Types.ObjectId,
}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema);