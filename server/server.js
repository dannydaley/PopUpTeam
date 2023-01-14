require("dotenv").config({ path: `.env` });
const express = require("express");
const cors = require("cors");
const http = require("http");

const session = require('./session');
const socket = require('./socket');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

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

app.use(session); //Session config

//Routes
app.use("/kanban", kanbanRouter); // Initialise kanban router
app.use('/auth', authRoutes); //Login and register routes
app.use('/search', searchRoutes); //Search routes

const devRoutes = require('./routes/devSetup');
app.use('/dev', devRoutes);


const PORT = process.env.PORT || 8080;

//Server port
server.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);
    socket(server); //Adds socket listener
});