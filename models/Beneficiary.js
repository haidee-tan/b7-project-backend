const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let BeneficiarySchema = new Schema({
    name: String,
    address: String,
    contactNum: String,
    description: String,
    website: String,
    photo: String,
    status: String,
}, {timestamps: true})

module.exports = mongoose.model("Beneficiary", BeneficiarySchema);