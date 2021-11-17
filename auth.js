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

const isAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secretKey, (err, data) => {
            if(err) {
                res.send({auth: "cannot find token"});
            }
            if(data.role !== "admin") {
                res.send({auth: "not admin"})
            }
            next();
        });
    }
    else {
        res.send({auth: "no token"});
    };
}

module.exports = {
    createAccessToken,
    decodeToken,
    isAdmin,
}