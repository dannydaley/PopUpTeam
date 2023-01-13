const express = require("express");
const router = express.Router();

const { PasswordHash, salt } = require("../security");
const { upload, defaultProfilePicture } = require("../imageUpload");
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
                req.session.firstName = rows[0].first_name;
                req.session.lastName = rows[0].last_name;
                req.session.username = rows[0].user_name;
                req.session.ProfilePicture = rows[0].profile_picture;
                req.session.aboutMe = rows[0].about_me;
                req.session.phone = rows[0].phone;
                req.session.email = rows[0].email;
                req.session.work = rows[0].work;
                req.session.team = rows[0].team;
                req.session.hourlyRate = rows[0].hourly_rate;
                req.session.birthday = rows[0].birthday;
                req.session.location = rows[0].location;
                req.session.country = rows[0].country;
                req.session.work = rows[0].work;
                req.session.education = rows[0].education;
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
    if (req.session.username) {
        res.send({
            loggedIn: true,
            username: req.session.username,
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            profilePicture: req.session.ProfilePicture,
            aboutMe: req.session.aboutMe,
            phone: req.session.phone,
            email: req.session.email,
            work: req.session.work,
            team: req.session.team,
            hourlyRate: req.session.hourlyRate,
            birthday: req.session.birthday,
            country: req.session.country,
            work: req.session.work,
            education: req.session.education,
        });
    }

    // Else user is not logged in
    else {
        res.send({ loggedIn: false });
    }
});

// Logout
router.post("/signout", (req, res) => {
    req.session.destroy(); // Destroy session
    res.send("Logged out");
});

module.exports = router;
