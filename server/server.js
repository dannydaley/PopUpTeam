require("dotenv").config({ path: `.env` });
const express = require("express");
const app = express();
app.use(express.json());
const http = require("http");
const socket = require("./lib/socket");
var fallback = require("express-history-api-fallback");

const cors = require("cors");

app.use(
    cors({
        origin: process.env.FRONT_END,
        methods: ["GET", "POST"],
        credentials: true,
    })
);

var dotenv = require("dotenv").config();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var path = require("path");
app.use(
    "/public",
    express.static(path.join(__dirname, "public"), { dotfiles: "allow" })
);
app.use(express.static(path.join(__dirname, "build")));
const root = path.join(__dirname, "build");
app.use(fallback("index.html", { root: root }));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = http.createServer(app);

// enabling fallback makes sure any routes not specified in server get passed back to front end to react router
// var fallback = require("express-history-api-fallback");

// app.use("/public", express.static(path.join(__dirname, "public")));

//Dependencies

const session = require("./lib/session");
app.use(session);

const authRoutes = require("./routes/auth");
const searchRoutes = require("./routes/search");
const messageRoutes = require("./routes/messages");
const settingsRoutes = require("./routes/settings");

// Import kanban router
const kanbanRouter = require("./routes/kanban");
//Routes
app.use("/kanban", kanbanRouter); // Initialise kanban router
app.use("/auth", authRoutes); //Login and register routes
app.use("/search", searchRoutes); //Search routes
app.use("/messages", messageRoutes); //Message routes
app.use("/settings", settingsRoutes);

const devRoutes = require("./routes/devSetup");
app.use("/dev", devRoutes);

const PORT = process.env.PORT || 8080;

//Server port
server.listen(process.env.PORT || PORT, () => {
    socket(server); // Socket.io server

    console.log(`Server listening on port ${PORT}`);
});
