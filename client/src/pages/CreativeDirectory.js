import { useState, useEffect } from "react";
import axios from "axios";

import SideBar from "../components/directory/SideBar";
import Profile from "../components/directory/Profile";
import DirectoryList from "../components/directory/DirectoryList";

export default function CreativeDirectory() {
  const [renderMessage, setRenderMessage] = useState(false);

  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profileProfilePicture, setProfileProfilePicture] = useState("");
  const [profileAboutMe, setProfileAboutMe] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileWork, setProfileWork] = useState("");
  const [profileTeam, setProfileTeam] = useState("");
  const [profileCountry, setProfileCountry] = useState("");
  const [profileLocation, setProfileLocation] = useState("");
  const [profileHourlyRate, setProfileHourlyRate] = useState("");
  const [profileBirthday, setProfileBirthday] = useState("");

  const [sender, setSender] = useState("");

  useEffect(() => {
    // Get session user data
    axios.get("http://localhost:8080/auth/signin")
      .then((res) => {
        //If user is logged in set login data
        if (res.data.loggedIn === true) {
          setProfileFirstName(res.data.firstName);
          setProfileLastName(res.data.lastName);
          setProfileProfilePicture(res.data.profilePicture);
          setProfileAboutMe(res.data.aboutMe);
          setProfilePhone(res.data.phone);
          setProfileEmail(res.data.email);
          setProfileWork(res.data.work);
          setProfileTeam(res.data.team);
          setProfileHourlyRate(res.data.hourlyRate);
          setProfileBirthday(res.data.birthday);
          setProfileLocation(res.data.location);
          setProfileCountry(res.data.country);

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
                profileFirstName={profileFirstName}
                profileLastName={profileLastName}
                profileEmail={profileEmail}
                profilePhone={profilePhone}
                profileProfilePicture={profileProfilePicture}
                profileAboutMe={profileAboutMe}
                profileWork={profileWork}
                profileTeam={profileTeam}
                profileCountry={profileCountry}
                profileLocation={profileLocation}
                profileHourlyRate={profileHourlyRate}
                profileBirthday={profileBirthday}
                renderMessage={renderMessage}
                setRenderMessage={setRenderMessage}
                sender={sender}
              />
            </main>

            <DirectoryList
              setProfileFirstName={setProfileFirstName}
              setProfileLastName={setProfileLastName}
              setProfileEmail={setProfileEmail}
              setProfilePhone={setProfilePhone}
              setProfileProfilePicture={setProfileProfilePicture}
              setProfileAboutMe={setProfileAboutMe}
              setProfileWork={setProfileWork}
              setProfileTeam={setProfileTeam}
              setProfileCountry={setProfileCountry}
              setProfileLocation={setProfileLocation}
              setProfileHourlyRate={setProfileHourlyRate}
              setProfileBirthday={setProfileBirthday}
              setRenderMessage={setRenderMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};