require("dotenv").config({ path: `.env` });
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require("http");
const { Server } = require("socket.io");
const db = require('./config/db');

// Import kanban router
var kanbanRouter = require("./routes/kanban");

const app = express();
const server = http.createServer(app);
var path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 8080;

// Initialise kanban router
app.use("/kanban", kanbanRouter);

//Dependencies
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region SESSION SETUP

// Session setup
app.use(session({
    key: 'user_id',
    secret: 'i9nrNahEAb?8&#cK',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: 1000 * 60 * 60 * 24, // Max age one day
    },
}));

//#endregion SESSION SETUP

//#region SECURITY

let crypto = require("crypto"); // set up crypto middleware for hashing password and checking password hashes

const salt = crypto.randomBytes(256).toString("hex"); // create a hash salt/pepper
const iterations = 1000; // number of iterations to jumble the hash
const hashSize = 64; //set up char length of hash
const hashAlgorithm = "sha256"; // which hashing algorithm will be used

//This function returns a hash of the password, combined with the pepper and the salt.
function PasswordHash(password, salt) {
	//PEPPER MUST BE MOVED TO ENV FILE WHEN READY
	const pepper = "ec3fd71d14f7cab570fc94df34e60e4d8c80cdff4d1dde66c74b10ae576b88239315295adabaced63b05104bbf8d2f2f92a24aeebe8444861ba1b7efc73dafdeda6fe2bf6e7288f959832d5db953a7eab0b37ef8ad126f94616b0c1e7b3b0ce7418dff91afaa78401dacce6aee72649840e26a01d75bfac69acf8d0dd50aaddebb9397150bb0f88795cde94ea3d03fec2992fc3b5c3c7bbd8de3f8f7d693cdcca879d9aefd6e02d4457217928091a731c08f83f9927f9b19ca34ab589dd02ecc40e336e067a1f2e072ec2b3a93617ded73028ed5bc5d55f011ba5a53099312f06d649fa06fdbf49e81c8f9a81f113f95cd416d230c2cb6056189c77f889dc83d";
    
    return crypto.pbkdf2Sync (
        password,
        salt + pepper,
        iterations,
        hashSize,
        hashAlgorithm
    ).toString("hex");
};

//#endregion SECURITY

//Socket setup
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

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

//#region SIGN UP & SIGN IN

const selectEmail = 'SELECT * FROM users WHERE email = ?'; // Selects all emails

// Registering
app.post('/signUp', (req, res) => {
	const { signUpEmail, signUpUserName, signUpFirstName, signUpLastName, signUpPassword } = req.body;
    const insertRow = "INSERT INTO users (user_name, first_name, last_name, email, password, salt, profile_picture) VALUES(?, ?, ?, ?, ?, ?, ?)";  // Inserts new user

    let profilePicture = defaultProfilePicture; // Set profile picture to default

    const selectUsername = 'SELECT * FROM users WHERE user_name = ?'; // Selects all usernames

    // If email already exists
    db.query(selectEmail, [signUpEmail], (err, rows) => {
        // If email exists
        if (rows.length > 0) {
            res.send('Email already exists');
            return;
        }

        // If username already exists
        db.query(selectUsername, [signUpUserName], (err, rows) => {
            // If username exists
            if (rows.length > 0) {
                res.send('Username already exists');
                return;
            }

            // Else register user
            else {
                let hashedPassword = PasswordHash(signUpPassword, salt);

                db.query(insertRow, [signUpUserName, signUpFirstName, signUpLastName, signUpEmail, hashedPassword, salt, profilePicture,], (err, rows) => { 
                    if (err) throw err;
                    console.log('Registered: \n' + 'User:' + signUpUserName + '\n' + 'Email:' + signUpEmail); // Print user inserted

                    res.send('Successfully registered, please login');
                });
            };
        });
    });
});

// Login
app.post('/signin', (req, res) => {
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

                console.log('Session created:', req.session); // Print session
                res.send('Login successful');
            }

            // If password is incorrect
            else {
                res.send('Email or password are incorrect');
            }
        }

        // If email does not exist
        else {
            res.send('Email or password are incorrect');
        };
    });
}); 

// Get login data
app.get('/signin', (req, res) => {    
    // If user is logged in send user data
    if (req.session.username) {
        res.send({
            loggedIn: true, 
            username: req.session.username, 
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            profilePicture: req.session.ProfilePicture
        });
    }
    
    // Else user is not logged in
    else {
        res.send({loggedIn: false});
    };
});

// Logout
app.post("/signout", (req, res) => {
    req.session.destroy() // Destroy session
    res.send('Logged out');
});

//#endregion SIGN UP & SIGN IN

app.get("/getAllUsers", (req, res, next) => {
	// grab all user data
	db.query("SELECT * FROM users", [], (err, userData) => {
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

//#region Socket server
//On connection
io.on("connection", (socket) => {
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

//Server port
server.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
