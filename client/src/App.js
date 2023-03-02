import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Home from "./pages/Index";
import About from "./pages/About";
import BecomeACreative from "./pages/BecomeACreative";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/BusinessLogin";
import Register from "./pages/BusinessRegister";

import CreativeDirectory from "./pages/CreativeDirectory";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";

import Error from "./pages/404";

import KanbanPage from "./pages/KanbanPage";

axios.defaults.withCredentials = true; // Allows axios to send cookies to the server

function App() {
    const userData = {
        firstName: "",
        lastName: "",
        profilePicture: "",
        aboutMe: "",
        phone: "",
        email: "",
        work: "",
        team: "",
        country: "",
        location: "",
        hourlyRate: "",
        birthday: "",
    };

    const [profile, setProfile] = useState(userData);
    const [account, setAccount] = useState(userData);

    const [sender, setSender] = useState("");

    // Get session user data
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SERVER + "/auth/signin")
            .then((res) => {
                //If user is logged in set login data
                if (res.data.loggedIn === true) {
                    setProfile({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        profilePicture: res.data.profilePicture,
                        aboutMe: res.data.aboutMe,
                        phone: res.data.phone,
                        email: res.data.email,
                        work: res.data.work,
                        team: res.data.team,
                        hourlyRate: res.data.hourlyRate,
                        birthday: res.data.birthday,
                        location: res.data.location,
                        country: res.data.country,
                    });

                    setAccount(userData);

                    setSender(res.data.firstName + " " + res.data.lastName);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Routes>
            {/* Index */}
            <Route
                path="/"
                element={<Home profile={account} setProfile={setAccount} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/become-a-creative" element={<BecomeACreative />} />

            {/* Authentication */}
            <Route
                path="/business-login"
                element={<Login account={account} setAccount={setAccount} />}
            />
            <Route path="/business-register" element={<Register />} />

            {/* Directory */}
            <Route
                path="/directory"
                element={
                    <CreativeDirectory
                        profile={profile}
                        setProfile={setProfile}
                        account={account}
                        setAccount={setAccount}
                        sender={sender}
                    />
                }
            />
            <Route path="/projects" element={<NewProject />} />
            <Route path="*" element={<Error />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project" element={<Project />} />

            {/* Kanban */}
            <Route path="/kanban" element={<KanbanPage />} />
        </Routes>
    );
}

export default App;
