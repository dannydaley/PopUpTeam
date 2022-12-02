const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
// const db = require('./config/db');

const app = express();
const server = http.createServer(app);
var path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 8080;

//Dependencies
app.use(express.json());
app.use(cors());

//Socket setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

//#region Socket server
//On connection
io.on("connection", (socket) => {
    //Log user ids
    console.log(`user connected: ${socket.id})`);

    //On message button click
    socket.on("select_recipient", (data) => {
        //Assign and log recipient
        socket.join(data);
    });

    //On message send
    socket.on("send_message", (data) => {
        //Log message
        console.log(data);
        //Emit to recipient
        socket.to(data.recipient).emit("receive_message", data);
    });

    //On disconnect
    socket.on("disconnect_client", () => {
        //Log user ids
        console.log(`user disconnected: ${socket.id}`);
    });
});

//#endregion

//#region IMAGES AND IMAGE UPLOAD HANDLING

//set up multer middleware for image uploads
var multer = require("multer");

// default profile picture applied to all users profilePicture field in the users table of the db on account creation
let defaultProfilePicture = "images/defaults/defaultUser.png";

// set up storage for file uploads
const storage = multer.diskStorage({
    // set destination to public image directory
    destination: "public/images/uploads",
    filename: function (req, file, cb) {
        // create a unique suffix so that image names will never have a duplicate
        //suffix consists of the date, a hyphen and then a large random number
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "IMAGE-" + uniqueSuffix + ".png");
        // generate the file name of the file to be added to the public image directory
        // filename contains path to folder to make things easier across the server
        // we append .png top the filename so that files are recognised as their format
        let fileName = "images/uploads/" + "IMAGE-" + uniqueSuffix + ".png";
        // update the string attached to the incoming req.body.image field
        // this is added to the database as the imageLocation
        req.body.imageLocations += fileName + ",";
    },
});

// set up multer function to be called on uploads
let upload = multer({ storage: storage });

//#endregion IMAGES AND IMAGE UPLOAD HANDLING

//#region DATABASE SET UP ENDPOINTS

// SQLite 3 setup for test db while in development
var sqlite3 = require("sqlite3").verbose();

// set up variable for access to database
let db = new sqlite3.Database("./sqlite.db");

// set app.locals database to the initialised variable
app.locals.db = db;

// Json file containing dummy data for easier db setup and testing
let userDataJSON = require("./config/users.json");

// users table setup endpoint
app.get("/api/usersSetup", (req, res, next) => {
    db.serialize(() => {
        //delete the table if it exists..
        db.run("DROP TABLE IF EXISTS users");
        //recreate the users table
        db.run(
            "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255) UNIQUE, firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), aboutMe text, location varchar(255), education varchar(255), work varchar(255), profilePicture varchar(255))",
            (err, rows) => {
                if (err) console.log(err);
                console.log(rows);
            }
        );
        //create array of users from the dummy data JSON file
        let users = userDataJSON.users;
        //insert each element in the array of objects into the users table in the database
        users.forEach((user) => {
            // SQL query to run
            db.run(
                "INSERT INTO users (username, firstName, lastName, email, password, passwordSalt, aboutMe, location, education, work, profilePicture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)",
                // values passed in from current iteration of the users array
                [
                    user.username,
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.password,
                    user.passwordSalt,
                    user.aboutMe,
                    user.location,
                    user.education,
                    user.work,
                    user.profilePicture,
                ],
                (err) => {
                    if (err) console.log(err);
                }
            );
        });
    });
    // respond with success page
    res.send("user-db-done");
});

//#endregion DATABASE SET UP ENDPOINTS

//#region SECURITY

// set up crypto middleware for hashing password and checking password hahses
let crypto = require("crypto");

// number of iterations to jumble the hash
const iterations = 1000;

//set up char length of hash
const hashSize = 64;

// which hashing algorithm will be used
const hashAlgorithm = "sha256";

// create a hash salt/pepper
const generatePepper = crypto.randomBytes(256).toString("hex");

//this function returns a hash of the password, combined with the pepper and the salt.
function passwordHash(thePassword, theSalt) {
    //PEPPER MUST BE MOVED TO ENV FILE WHEN READY
    const pepper =
        "ec3fd71d14f7cab570fc94df34e60e4d8c80cdff4d1dde66c74b10ae576b88239315295adabaced63b05104bbf8d2f2f92a24aeebe8444861ba1b7efc73dafdeda6fe2bf6e7288f959832d5db953a7eab0b37ef8ad126f94616b0c1e7b3b0ce7418dff91afaa78401dacce6aee72649840e26a01d75bfac69acf8d0dd50aaddebb9397150bb0f88795cde94ea3d03fec2992fc3b5c3c7bbd8de3f8f7d693cdcca879d9aefd6e02d4457217928091a731c08f83f9927f9b19ca34ab589dd02ecc40e336e067a1f2e072ec2b3a93617ded73028ed5bc5d55f011ba5a53099312f06d649fa06fdbf49e81c8f9a81f113f95cd416d230c2cb6056189c77f889dc83d";
    return crypto
        .pbkdf2Sync(
            thePassword,
            pepper + theSalt,
            iterations,
            hashSize,
            hashAlgorithm
        )
        .toString("hex");
}

//#endregion SECURITY

//#region SESSION SETUP

// Session setup
var session = require("cookie-session");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var userSession = {
    secret: "myMegaSecret",
    keys: ["key1", "key2", "key3"],
    originalMaxAge: 0,
    maxAge: 0,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 30,
    },
};

app.use(cookieParser());
app.use(session(userSession));

//#endregion SESSION SETUP

//#region SIGN UP & SIGN IN

app.post("/signUp", (req, res) => {
    //set up variables from the request for better readability
    let {
        signUpEmail,
        signUpUserName,
        signUpFirstName,
        signUpLastName,
        signUpPassword,
        confirmSignUpPassword,
    } = req.body;
    //if both password fields match
    if (signUpPassword === confirmSignUpPassword) {
        //generate salt to store
        let passwordSalt = generatePepper;
        //generate password to store, using password from the confirm field, and the generated salt
        let storePassword = passwordHash(confirmSignUpPassword, passwordSalt);
        //assign default profile picture
        let profilePicture = defaultProfilePicture;
        //Create a new user in the user database with the fields from the form, the default profile picture and the generated password hash and salt
        db.run(
            "INSERT INTO users (email, username, firstName,lastName, password, passwordSalt, profilePicture) VALUES(?,?,?,?,?,?,?)",
            [
                signUpEmail,
                signUpUserName,
                signUpFirstName,
                signUpLastName,
                storePassword,
                passwordSalt,
                profilePicture,
            ],
            (err, rows) => {
                if (err) {
                    console.log("failed to add user to database");
                    console.log(err);
                    // if username already exists in database
                    if (
                        err.sqlMessage ===
                        "Duplicate entry '" +
                            signUpUserName +
                            "' for key 'users.username'"
                    ) {
                        console.log("USERNAME ALREADY EXISTS");
                        res.json({
                            status: "username exists",
                        });
                        return;
                    }
                    // if email already exists in database
                    if (
                        err.sqlMessage ===
                        "Duplicate entry '" +
                            signUpEmail +
                            "' for key 'users.email'"
                    ) {
                        console.log("EMAIL ALREADY EXISTS");
                        res.json({
                            status: "email exists",
                        });
                        return;
                    }
                    // if any other error case, respond with status and error message
                    res.status(500).send(err.message);
                    return;
                }
                //respond with success
                res.json({
                    status: "success",
                });
            }
        );
        //response if password fields dont match
    } else {
        res.json("PASSWORDS DONT MATCH");
    }
});

app.post("/signin", (req, res) => {
    // pull data from request body for better readbility
    let { email, password } = req.body;
    // search if user exists using email address
    console.log(req.body);

    db.get("SELECT * FROM users WHERE email = ?", email, (err, userData) => {
        if (err) {
            console.log("error at database");
            res.status(500).send(err);
        }
        //assign any returned rows to user variable

        let user = userData;

        //if a user exists, and their stored password matches the output of the hashing function
        // with their password entry..
        if (
            user !== undefined &&
            user.password === passwordHash(password, user.passwordSalt)
        ) {
            // create empty session data to be populated
            req.session.userData = {};
            // apply user data to session variables
            req.session.userData.isSignedIn = true;
            req.session.userData.userFirstName = user.firstName;
            req.session.userData.userLastName = user.lastName;
            req.session.userData.loggedInUsername = user.username;
            req.session.userData.userProfilePicture = user.profilePicture;
            console.log(req.session.userData);
            //respond with user data on succesful login
            res.json({
                status: "success",
                isSignedIn: req.session.userData.isSignedIn,
                firstName: req.session.userData.userFirstName,
                lastName: req.session.userData.userLastName,
                username: req.session.userData.loggedInUsername,
                profilePicture: req.session.userData.userProfilePicture,
            });
            // otherwise, credentials are invalid
        } else {
            //respond with failure message
            res.json({
                status: "failed",
                message: "incorrect email or password",
            });
        }
    });
});

//endpoint for sign out and session destruction
app.post("/signout", (req, res) => {
    console.log("clicked");
    // delete session
    req.session = null;
    // respond with success
    console.log("signed out");
    res.json("success");
});

//#endregion SIGN UP & SIGN IN

//#region Socket.io

//#endregion

app.get("/getAllUsers", (req, res, next) => {
    // grab all user data
    db.get("SELECT * FROM users", [], (err, userData) => {
        // if error
        if (err) {
            // respond with error status and error message
            res.status(500).send(err.message);
            return;
        }
        // respond with userData on success
        res.send(userData);
    });
});

//Server port
server.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
