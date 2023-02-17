import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import Message from "./Message";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

const tabs = [
  { name: "Profile", href: "#", current: true },
  { name: "Past Projects", href: "#", current: false },
  { name: "Messages", href: "#", current: false },
];

const teamPlaceHolder = [
  {
    name: "Leslie Alexander",
    handle: "lesliealexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Foster",
    handle: "michaelfoster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Dries Vincent",
    handle: "driesvincent",
    role: "Manager, Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    handle: "lindsaywalton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Profile(props) {
  const {
    profileProfilePicture,
    profileFirstName,
    profileLastName,
    profileAboutMe,
    profilePhone,
    profileEmail,
    profileWork,
    profileTeam,
    profileCountry,
    profileLocation,
    profileHourlyRate,
    profileBirthday,
    renderMessage,
    setRenderMessage,
    sender,
  } = props;

  const profile = {
    name: profileFirstName + " " + profileLastName,
    profile_picture: profileProfilePicture,
    coverImageUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    about_me: profileAboutMe,
    fields: {
      Phone: profilePhone,
      email: profileEmail,
      work: profileWork,
      team: profileTeam,
      country: profileCountry,
      location: profileLocation,
      hourly_rate: profileHourlyRate,
      birthday: profileBirthday,
    },
  };

  const socket = io.connect("http://localhost:8080");

  const recipient = profileFirstName + " " + profileLastName;
  const [messageList, setMessageList] = useState([]);

  // Join room
  const joinRoom = () => {
    // Join room
    socket.emit("join_room", {
      sender: sender,
      recipient: recipient,
    });

    // Get messages
    axios.get("http://localhost:8080/messages/getMessages", {
      params: {
        recipient: recipient,
      },
    }).then((res) => {
      // Sort messages by date and time
      setMessageList(
        res.data.sort((a, b) => {
          // Sort by date
          if (a.date < b.date) return 1; // If a is greater than b list a first
          if (a.date > b.date) return -1; // If a is less than b list b first
          // Sort by time
          if (a.time < b.time) return 1;
          if (a.time > b.time) return -1;
          return 0;
        })
      );
    });
  };

  // On receiving a message, add it to the message list
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // If the message sender is not equal to the current user, add the message to the message list
      if (data.sender !== sender) {
        setMessageList((prevMessageList) =>
          [...prevMessageList, data].sort((a, b) => {
            // Sort by date
            if (a.date < b.date) return 1; // If a is greater than b list a first
            if (a.date > b.date) return -1; // If a is less than b list b first
            // Sort by time
            if (a.time < b.time) return 1;
            if (a.time > b.time) return -1;
            return 0;
          })
        );
      }
    });
  }, [socket, sender, setMessageList]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <article>
      {/* Profile header */}
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={profile.coverImageUrl}
            alt=""
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={"http://localhost:8080/public/" + profile.profile_picture}
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {profile.name}
                </h1>
              </div>
              <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setRenderMessage(!renderMessage);
                    !renderMessage && joinRoom();
                  }}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <EnvelopeIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {renderMessage ? (
                    <span>Close Message</span>
                  ) : (
                    <span>Message</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {profile.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "border-blue-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* If state is true render Messaging component */}
      {renderMessage ? (
        <Message
          socket={socket}
          sender={sender}
          recipient={recipient}
          profilePicture={profileProfilePicture}
          messageList={messageList}
          setMessageList={setMessageList}
        />
      ) : (
        <>
          {/* Description list */}
          <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {Object.keys(profile.fields).map((field) => (
                <div key={field} className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{field}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {profile.fields[field]}
                  </dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd
                  className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: profile.about_me,
                  }}
                />
              </div>
            </dl>
          </div>

          {/* Team member list */}
          <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
            <h2 className="text-sm font-medium text-gray-500">
              Previously worked with
            </h2>
            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {teamPlaceHolder.map((person) => (
                <div
                  key={person.handle}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:border-gray-400"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={person.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {person.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {person.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </article>
  );
};