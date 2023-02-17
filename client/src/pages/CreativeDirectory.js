import { useState, useEffect } from "react";
import axios from "axios";

import SideBar from "../components/directory/SideBar";
import Profile from "../components/directory/Profile";
import DirectoryList from "../components/directory/DirectoryList";

export default function CreativeDirectory() {
  const [renderMessage, setRenderMessage] = useState(false);
  const [profile, setProfile] = useState({
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
  });

  const [sender, setSender] = useState("");

  useEffect(() => {
    // Get session user data
    axios.get("http://localhost:8080/auth/signin")
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

          setSender(res.data.firstName + " " + res.data.lastName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="flex">
      <SideBar />

      <div className="flex w-screen h-auto">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last max-h-screen">
              <Profile
                profile={profile}
                renderMessage={renderMessage}
                setRenderMessage={setRenderMessage}
                sender={sender}
              />
            </main>

            <DirectoryList
              setProfile={setProfile}
              setRenderMessage={setRenderMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
