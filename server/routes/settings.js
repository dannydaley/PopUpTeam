// const multer = require("multer");
const express = require("express");
const router = express.Router();
const db = require("../config/db");
var path = require("path");
router.use("/public", express.static(path.join(__dirname, "public")));

//set up multer middleware for image uploads
var multer = require("multer");

// set up storage for file uploads
// default profile picture applied to all users profilePicture field in the users table of the db on account creation
let defaultProfilePicture = "images/defaultUser.png";
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
        req.body.imageLocations += fileName;
        req.body.imageLocations = req.body.imageLocations.replace(
            "undefined",
            ""
        );
        req.body.imageLocations = req.body.imageLocations.replace(",", "");
    },
});

// set up multer function to be called on uploads
let upload = multer({ storage: storage });

//#endregion IMAGES AND IMAGE UPLOAD HANDLING

router.post("/updateSettings", (req, res, next) => {
    if (req.body.newFirstName) {
        db.query("UPDATE users SET first_name = ? WHERE user_name = ?", [
            req.body.newFirstName,
            req.body.username,
        ]),
            (err, result) => {
                // if error
                if (err) {
                    // respond with error status and error message
                    res.status(500).send(err.message);
                    return;
                }
                // grab users first name and lastname from database by username from request
            };
    }
    if (req.body.newLastName) {
        db.query("UPDATE users SET last_name = ? WHERE user_name = ?", [
            req.body.newLastName,
            req.body.username,
        ]),
            (err, result) => {
                // if error
                if (err) {
                    // respond with error status and error message
                    res.status(500).send(err.message);
                    return;
                }
                // grab users first name and lastname from database by username from request
            };
    }
    if (req.body.newAbout) {
        db.query("UPDATE users SET about_me = ? WHERE user_name = ?", [
            req.body.newAbout,
            req.body.username,
        ]),
            (err, result) => {
                // if error
                if (err) {
                    // respond with error status and error message
                    res.status(500).send(err.message);
                    return;
                }
                // grab users first name and lastname from database by username from request
            };
    }
    res.json({
        status: "success",
    });
});

router.post("/changeProfilePicture", upload.single("image"), (req, res) => {
    /*ALREADY RUN THROUGH MULTER*/
    //remove undefined from filename after being processed by multer
    req.body.imageLocations = req.body.imageLocations.replace("undefined", "");
    upload.single(req.body.image);
    //remove any commas from filename after being processed by multer
    let image = req.body.imageLocations;
    console.log(image);
    // update the profilePicture attached to the user where username matches the logged in users from the request
    db.query(
        "UPDATE users SET profile_picture = ? WHERE user_name = ?",
        [image, req.body.username],
        (err, result) => {
            // if error
            if (err) {
                // respond with error status and error message
                res.status(500).send(err.message);
                return;
            }
            // grab users first name and lastname from database by username from request
        }
    );
    res.json({
        profilePicture: image,
    });
});

module.exports = router;
// module.exports = { router, upload, defaultProfilePicture };
