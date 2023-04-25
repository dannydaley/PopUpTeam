import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

import Message from "./Message";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import MemberCards from "./MemberCards";

const tabs = [
  { name: "Profile", href: "#", current: true },
  { name: "Past Projects", href: "#", current: false },
  { name: "Messages", href: "#", current: false },
];

export default function Profile(props) {
  const { profile, renderMessage, setRenderMessage, sender, account } = props;

  const profileHeader = {
    name:
      profile.firstName === undefined
        ? account.firstName + " " + account.lastName
        : profile.firstName + " " + profile.lastName,

    profile_picture:
      profile.profilePicture === undefined
        ? account.profilePicture
        : profile.profilePicture,
    coverImageUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  };

  const profileFields = [
    { label: "About Me", value: profile.aboutMe },
    { label: "Phone", value: profile.phone },
    { label: "Email", value: profile.email },
    { label: "Work", value: profile.work },
    { label: "Team", value: profile.team },
    { label: "Country", value: profile.country },
    { label: "Location", value: profile.location },
    { label: "Hourly Rate", value: profile.hourlyRate },
    { label: "Birthday", value: profile.birthday },
  ];

  const socket = io.connect(process.env.REACT_APP_SERVER);

  const recipient = profile.firstName + " " + profile.lastName;
  const [messageList, setMessageList] = useState([]);

  // Join room
  const joinRoom = () => {
    // Join room
    socket.emit("join_room", {
      sender: sender,
      recipient: recipient,
    });

    // Get messages
    axios
      .get(process.env.REACT_APP_SERVER + "/messages/getMessages", {
        params: {
          recipient: recipient,
        },
      })
      .then((res) => {
        // Sort messages by date and time
        setMessageList(
          res.data.sort((a, b) => {
            // Sort by date
            if (a.date < b.date) return -1; // If a is less than b list a first
            if (a.date > b.date) return 1; // If a is less than b list b first
            // Sort by time
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
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
            if (a.date < b.date) return -1; // If a is less than b list a first
            if (a.date > b.date) return 1; // If a is less than b list b first
            // Sort by time
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
          })
        );
      }
    });
  }, [socket, sender, setMessageList]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Render profile field
  function renderProfileField(label, value, link) {
    // If the value is null, render a link to add the field
    if (value === null) {
      return (
        <>
          {/* If the sender is the current user, render a link to add the field */}
          {sender === profile.firstName + " " + profile.lastName ? (
            <div className="text-xs italic text-gray-400">
              Add {label}{" "}
              <Link
                className="text-blue-500 hover:underline hover:text-blue-700"
                to={link}
              >
                Here
              </Link>
            </div>
          ) : (
            <div className="text-xs italic text-gray-400">
              {profile.firstName} has not added {label} yet
            </div>
          )}
        </>
      );
      /* Else the value is not null, render the value */
    } else {
      return <div className="text-sm text-gray-400">{value}</div>;
    }
  }

  return (
    <article className="min-w-[350px]">
      {/* Profile header */}
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={profileHeader.coverImageUrl}
            alt=""
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={
                  process.env.REACT_APP_SERVER +
                    "/public/" +
                    profileHeader.profile_picture || account.profilePicture
                }
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {profileHeader.name}
                </h1>
              </div>

              {/* Message button */}
              {sender !== profile.firstName + " " + profile.lastName && (
                <div className="min-w-[155px] justify-stretch mt-6 flex flex-row sm:space-x-4">
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
              )}
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {profileHeader.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab, index) => (
                <a
                  key={index}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "border-blue-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {index === 2 &&
                  sender === profile.firstName + " " + profile.lastName ? (
                    <></>
                  ) : (
                    <span>{tab.name}</span>
                  )}
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
          profilePicture={profile.profilePicture}
          messageList={messageList}
          setMessageList={setMessageList}
        />
      ) : (
        <>
          {/* Description list */}
          <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {profileFields.map((field, index) => (
                <div key={index} className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {field.label}
                  </dt>

                  <dd className="mt-2">
                    {(() => {
                      switch (index) {
                        case 0:
                          return renderProfileField(
                            "a description",
                            profile.aboutMe || account.aboutMe,
                            "/settings"
                          );
                        case 1:
                          return renderProfileField(
                            "a phone number",
                            "+44 " + profile.phone || account.phone,
                            "/settings"
                          );
                        case 2:
                          return renderProfileField(
                            "an email",
                            profile.email || account.email,
                            "/settings"
                          );
                        case 3:
                          return renderProfileField(
                            "a work",
                            profile.work || account.work,
                            "/settings"
                          );
                        case 4:
                          return renderProfileField(
                            "a team",
                            profile.team || account.team,
                            "/projects"
                          );
                        case 5:
                          return renderProfileField(
                            "a country",
                            profile.country || account.country,
                            "/settings"
                          );
                        case 6:
                          return renderProfileField(
                            "a location",
                            profile.location || account.location,
                            "/settings"
                          );
                        case 7:
                          return renderProfileField(
                            "a hourly rate",
                            "£ " + profile.hourlyRate || account.hourlyRate,
                            "/settings"
                          );
                        case 8:
                          return renderProfileField(
                            "a date of birth",
                            profile.birthday || account.birthday,
                            "/settings"
                          );
                        default:
                          return null;
                      }
                    })()}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Team member list */}
          <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
            <h2 className="text-sm font-medium text-gray-500">
              Previously worked with
            </h2>

            <MemberCards />
          </div>
        </>
      )}
    </article>
  );
};