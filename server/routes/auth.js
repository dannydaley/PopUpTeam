const express = require("express");
const router = express.Router();
var randomstring = require("randomstring");
const { PasswordHash, salt } = require("../lib/security");
const { upload, defaultProfilePicture } = require("../lib/imageUpload");
const db = require("../config/db");

const selectEmail = "SELECT * FROM users WHERE email = ?"; // Selects all emails

router.use(upload); //Image uploading

// Registering
router.post("/signUp", (req, res) => {
    const {
        signUpEmail,
        signUpUserName,
        signUpFirstName,
        signUpLastName,
        signUpPassword,
    } = req.body;
    const insertRow =
        "INSERT INTO users (user_name, first_name, last_name, email, password, salt, profile_picture) VALUES(?, ?, ?, ?, ?, ?, ?)"; // Inserts new user

    let profilePicture = defaultProfilePicture; // Set profile picture to default

    const selectUsername = "SELECT * FROM users WHERE user_name = ?"; // Selects all usernames

    // If email already exists
    db.query(selectEmail, [signUpEmail], (err, rows) => {
        // If email exists
        if (rows.length > 0) {
            res.send("Email already exists");
            return;
        }

        // If username already exists
        db.query(selectUsername, [signUpUserName], (err, rows) => {
            // If username exists
            if (rows.length > 0) {
                res.send("Username already exists");
                return;
            }

            // Else register user
            else {
                let hashedPassword = PasswordHash(signUpPassword, salt);

                db.query(
                    insertRow,
                    [
                        signUpUserName,
                        signUpFirstName,
                        signUpLastName,
                        signUpEmail,
                        hashedPassword,
                        salt,
                        profilePicture,
                    ],
                    (err, rows) => {
                        if (err) throw err;
                        console.log(
                            "Registered: \n" +
                                "User:" +
                                signUpUserName +
                                "\n" +
                                "Email:" +
                                signUpEmail
                        ); // Print user inserted

                        res.send("Successfully registered, please login");
                    }
                );
            }
        });
    });
});

// Login
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    // Check all emails against input
    db.query(selectEmail, [email], (err, rows) => {
        if (err) throw err;
        // If email exists
        if (rows.length > 0) {
            // If password with salt and compares to database
            if (PasswordHash(password, rows[0].salt) == rows[0].password) {
                // Create session
		req.session.userData = {};
                req.session.key = rows[0].user_name + randomstring.generate();
                req.session.userData.firstName = rows[0].first_name;
                req.session.userData.lastName = rows[0].last_name;
                req.session.userData.username = rows[0].user_name;
                req.session.userData.ProfilePicture = rows[0].profile_picture;
                req.session.userData.aboutMe = rows[0].about_me;
                req.session.userData.phone = rows[0].phone;
                req.session.userData.email = rows[0].email;
                req.session.userData.work = rows[0].work;
                req.session.userData.team = rows[0].team;
                req.session.userData.hourlyRate = rows[0].hourly_rate;
                req.session.userData.birthday = rows[0].birthday;
                req.session.userData.location = rows[0].location;
                req.session.userData.country = rows[0].country;
                req.session.userData.work = rows[0].work;
                req.session.userData.education = rows[0].education;
                console.log("Session created:", req.session); // Print session
                res.send("Login successful");
            }

            // If password is incorrect
            else {
                res.send("Email or password are incorrect");
            }
        }

        // If email does not exist
        else {
            res.send("Email or password are incorrect");
        }
    });
});

// Get login data
router.get("/signin", (req, res) => {
    // If user is logged in send user data
console.log(req.session)
    if (req.session.userData.username) {
        res.send({
            loggedIn: true,
            username: req.session.userData.username,
            firstName: req.session.userData.firstName,
            lastName: req.session.userData.lastName,
            profilePicture: req.session.userData.ProfilePicture,
            aboutMe: req.session.userData.aboutMe,
            phone: req.session.userData.phone,
            email: req.session.userData.email,
            work: req.session.userData.work,
            team: req.session.userData.team,
            hourlyRate: req.session.userData.hourlyRate,
            birthday: req.session.userData.birthday,
            country: req.session.userData.country,
            work: req.session.userData.work,
            education: req.session.userData.education,
        });
    }

    // Else user is not logged in
    else {
        res.send({ loggedIn: false });
    }
});

// Logout
router.post("/signout", (req, res) => {
    req.session = null;
    // req.session.userData.destroy(); // Destroy session
    res.send("Logged out");
});

module.exports = router;
