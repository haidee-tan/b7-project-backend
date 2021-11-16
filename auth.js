const jwt = require("jsonwebtoken");
const secretKey = "PagkainParaSaLahat";

const createAccessToken = user => {
    let userCopy = {
        _id: user._id,
        role: user.role,
        email: user.email,
    }
    return jwt.sign(userCopy, secretKey)
}

const decodeToken = token => {
    let decoded = "";
    jwt.verify(token, secretKey, (err, data) => {
        err ? decoded = "invalid" : decoded = data
    })
    return decoded;
}

module.exports = {
    createAccessToken,
    decodeToken
}