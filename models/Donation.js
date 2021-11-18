const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let DonationSchema = new Schema({
    quantity: Number,
    fee: Number,
    paymentMethod: String,
    paymentNotes: String,
    beneficiary: {
        type: Schema.Types.ObjectId,
        ref: "Beneficiary"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

module.exports = mongoose.model("Donation", DonationSchema);