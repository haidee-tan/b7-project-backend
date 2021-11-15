const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let DonationSchema = new Schema({
    postId: Schema.Types.ObjectId,
    quantity: Number,
    fee: Number,
    userId: Schema.Types.ObjectId,
    deliveryId: Schema.Types.ObjectId,
}, {timestamps: true})

module.exports = mongoose.model("Donation", DonationSchema);