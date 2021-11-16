const { Router } = require('express');
const User = require('../models/User');

const router = Router();

// POST /login
router.post("/login", (request, response) => {
    // User find username
    const { username } = request.body;
    const find = User.find({username});

    if (find === null) {
        // Check existing user
        // If not throw error. No user found
        return response.status(400).json({error: 'User not found'})
    }

    const { password } = request.body;

    if (password !== find.password) {
        // If exist, check yung password match from request
        // Decode password from user object, check if it match
        // If not match, response Invalid credential or 400 bad request
        return response.status(400).json({error: 'Incorrect credentials'});
    }

    createSession(find);
    // If match, create session
    // or response success 200
    // Happy path
    return response.status(200).json(find);
});

module.exports = router;