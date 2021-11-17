const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let DonationSchema = new Schema({
    quantity: Number,
    fee: Number,
    paymentMethod: String,
    paymentNotes: String,
    beneficiaryId: Schema.Types.ObjectId,
    postId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    deliveryId: Schema.Types.ObjectId,
}, {timestamps: true})

module.exports = mongoose.model("Donation", DonationSchema);