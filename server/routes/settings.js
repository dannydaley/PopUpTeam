const multer = require("multer");
const express = require("express");
const router = express.Router();

const defaultProfilePicture = "images/defaults/defaultUser.png";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("image");

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

// router.get(
//     "/changeProfilePicture",
//     upload("image"),
//     (req, res, next) => {
//         res.json({
//             connected: "connected",
//         });
//     }
// );

module.exports = router;
// module.exports = { router, upload, defaultProfilePicture };
