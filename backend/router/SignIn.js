const express = require("express");
const router = express.Router();
const connection = require("../db/connect");
const jwt = require("jsonwebtoken");

// Read the private key from file
const privateKey = "hello world";

router.post("/", (req, res) => {
    const { email, password } = req.body;

    // SQL query to find the user with the given email and password
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const VALUES = [email, password];

    connection.query(sql, VALUES, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        if (data.length === 0) {
            const sql2 = "SELECT * FROM admins WHERE email = ? AND password = ?";
            connection.query(sql2, VALUES, (err, data) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }

                if (data.length === 0) {
                    return res.status(404).json({ message: "User not found" });
                }

                const user = { id: data[0].id, email: data[0].email, type: data[0].type };
                req.user = user;

                // Generate a JWT token with the user data and private key
                const token = jwt.sign(user, privateKey, { expiresIn: "1h" });

                // Set the token as a cookie with httpOnly flag
                res.cookie("token", token, {
                    httpOnly: true
                });

                req.headers.authorization = "Bearer " + token;

                return res.status(200).json({ user, token });
            });
        } else {
            // Extract user data from the query result
            const user = { id: data[0].id, email: data[0].email, type: data[0].type };
            req.user = user;

            // Generate a JWT token with the user data and private key
            const token = jwt.sign(user, privateKey, { expiresIn: "1h" });

            // Set the token as a cookie with httpOnly flag
            res.cookie("token", token, {
                httpOnly: true
            });

            req.headers.authorization = "Bearer " + token;

            return res.status(200).json({ user, token });
        }
    });
});

module.exports = router;
