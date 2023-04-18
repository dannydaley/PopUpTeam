const multer = require("multer");
const express = require("express");
const router = express.Router();
const db = require("../config/db");
var path = require("path");
router.use("/public", express.static(path.join(__dirname, "public")));

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
    req.body.imageLocations = req.body.imageLocations.replace("undefined", "");
    req.body.imageLocations = req.body.imageLocations.replace(",", "");
  },
});

// set up multer function to be called on uploads
let upload = multer({ storage: storage });

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

// Update account details
router.put("/updateAccount", (req, res) => {
  const email = req.session.userData.email;
  const {
    aboutMe,
    work,
    firstName,
    lastName,
    birthday,
    phone,
    location,
    country,
    hourlyRate,
  } = req.body;

  const updateAccount =
    "UPDATE users SET about_me = ?, work = ?, first_name = ?, last_name = ?, birthday = ?, phone = ?, location = ?, country = ?, hourly_rate = ? WHERE email = ?";

  db.query(
    updateAccount,
    [
      aboutMe,
      work,
      firstName,
      lastName,
      birthday,
      phone,
      location,
      country,
      hourlyRate,
      email,
    ],
    (err, result) => {
      if (err) throw err;

      res.send("Updated " + email + "'s account details");
    }
  );
});

module.exports = router;
