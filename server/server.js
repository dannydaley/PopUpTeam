require("dotenv").config({ path: `.env` });
const express = require("express");
const cors = require("cors");
const http = require("http");

const session = require('./session');
const { upload, defaultProfilePicture} = require('./imageUpload');
const { PasswordHash, salt } = require('./security')
const db = require('./config/db');
const socket = require('./socket');

// Import kanban router
const kanbanRouter = require("./routes/kanban");

const app = express();
const server = http.createServer(app);
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

//Dependencies
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use("/kanban", kanbanRouter); // Initialise kanban router
app.use(session); //Session config
app.use(upload); //Image uploading

const PORT = process.env.PORT || 8080;

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

app.get("/getDirectory", (req, res, next) => {
    db.query("SELECT user_name, first_name, last_name, about_me, location, education, work, profile_picture FROM users", [], (err, directoryData) => {
        //if error
        if (err) {
            // respond with error status and message
            res.status(500).send(err.message);
            return;
        }

        // trying to filter results before sending to the front end to prevent duplicates
        // let usernames = [];
        // let directory = [];
        // directoryData.forEach(entry => {
        //     if (usernames.includes(entry.user_name)) {
        //         return
        //     } else {
        //         usernames.push(entry.user_name);
        //         directory.push(entry)
        //     }            
        // })


        // respond with data if no errors
        res.json(directoryData);
    });
});

//Server port
server.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);
    socket(server); //Adds socket listener
});