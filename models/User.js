const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    role: String,
    password: String,
    status: String,
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }]
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);