import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import "./App.css";
import Home from "./pages/Index";
import About from "./pages/About";
import BecomeACreative from "./pages/BecomeACreative";

import Login from "./pages/BusinessLogin";
import Register from "./pages/BusinessRegister";

import CreativeDirectory from "./pages/CreativeDirectory";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import KanbanPage from "./pages/KanbanPage";
import Settings from "./pages/Settings";

import Error from "./pages/404";

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

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [sender, setSender] = useState("");

  // Get session user data
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "/auth/signin")
      .then((res) => {
        //If user is logged in set login data
        if (res.data.loggedIn === true) {
          setProfile({
            firstName: res.data.userData.firstName,
            lastName: res.data.userData.lastName,
            profilePicture: res.data.userData.profilePicture,
            aboutMe: res.data.userData.aboutMe,
            phone: res.data.userData.phone,
            email: res.data.userData.email,
            work: res.data.userData.work,
            team: res.data.userData.team,
            hourlyRate: res.data.userData.hourlyRate,
            birthday: res.data.userData.birthday,
            location: res.data.userData.location,
            country: res.data.userData.country,
          });

          setAccount(res.data.userData);

          setSender(
            res.data.userData.firstName + " " + res.data.userData.lastName
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Routes>
      {/* Index */}
      <Route path="/" element={<Home profile={account} />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/become-a-creative"
        element={<BecomeACreative profile={account} />}
      />

      <Route
        path="/business-login"
        element={<Login account={account} setAccount={setAccount} />}
      />
      <Route path="/business-register" element={<Register />} />

      <Route
        path="/directory"
        element={
          <CreativeDirectory
            isDesktop={isDesktop}
            profile={profile}
            setProfile={setProfile}
            account={account}
            setAccount={setAccount}
            sender={sender}
          />
        }
      />

      <Route
        path="/projects"
        element={<Projects isDesktop={isDesktop} account={account} />}
      />

      <Route
        path="/create-project"
        element={<NewProject account={account} />}
      />

      <Route path="/kanban" element={<KanbanPage account={account} />} />

      <Route
        path="/settings"
        element={<Settings account={account} setAccount={setAccount} />}
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;