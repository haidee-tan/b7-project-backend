const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let DeliverySchema = new Schema({
    donations: [{
        type: Schema.Types.ObjectId,
        ref: "Donation"
    }],
    status: String,
    note: String,
    targetDate: Date,
    actualDate: Date,
    photos: [{
        type: String
    }],
    beneficiaryId: Schema.Types.ObjectId,
}, {timestamps: true})

module.exports = mongoose.model("Delivery", DeliverySchema);