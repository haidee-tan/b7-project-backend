const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    paymentMethod: String,
    paymentNotes: String,
    amount: Number,
    userId: Schema.Types.ObjectId,
    beneficiaryId: Schema.Types.ObjectId,
    donations: [{
        type: Schema.Types.ObjectId,
        ref: "Donation"
    }]
}, {timestamps: true})

module.exports = mongoose.model("Transaction", TransactionSchema);