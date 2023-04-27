require("dotenv").config({ path: `.env` });
const express = require("express");
const app = express();
app.use(express.json());
const http = require("http");
const socket = require("./lib/socket");
var fallback = require("express-history-api-fallback");
var logger = require("morgan");

const cors = require("cors");

app.use(
    cors({
        origin: [
            // remove the * wildcard when done testing
            "*",
            process.env.FRONTEND,
            "localhost:3000",
            "http://localhost:3000",
            "http://localhost:3000/",
            "localhost:9080",
            "http://localhost:9080",
            "http://localhost:9080/",
            "http://192.168.168.6:3000",
            "https://popupteam.kemeneth.net",
            "https://popupteam.kemeneth.net:3050",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
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

const kanbanServer = require("./kanban-server/routes/index");
const authRoutes = require("./routes/auth");
const directoryRoutes = require("./routes/directory");
const messageRoutes = require("./routes/messages");
const settingsRoutes = require("./routes/settings");
const projectRoutes = require("./routes/projects");

//Routes
app.use("/auth", authRoutes); 
app.use("/directory", directoryRoutes)
app.use("/messages", messageRoutes); 
app.use("/settings", settingsRoutes);
app.use("/projects", projectRoutes);

//kanban routes
app.use("/kanban-server", kanbanServer);
const devRoutes = require("./routes/devSetup");
app.use("/dev", devRoutes);

// fallback reroutes any unknown url entries to the front end
// (Keep this at the end of the file)
app.use(fallback("index.html", { root: root }));
const PORT = process.env.PORT || 8080;

//Server port
server.listen(process.env.PORT || PORT, () => {
    socket(server); // Socket.io server

    console.log(`Server listening on port ${PORT}`);
});
