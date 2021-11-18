const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    name: String,
    description: String,
    availability: Date,
    price: Number,
    donations: [{
        type: Schema.Types.ObjectId,
        ref: "Donation"
    }],
    photo: String,
    quantity: Number,
    status: String,
    userId: Schema.Types.ObjectId,
}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema);