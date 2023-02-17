import { useEffect, useState } from "react";
import axios from "axios";

import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const searchResults = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
  F: [],
  G: [],
  H: [],
  I: [],
  J: [],
  K: [],
  L: [],
  M: [],
  N: [],
  O: [],
  P: [],
  Q: [],
  R: [],
  S: [],
  T: [],
  U: [],
  V: [],
  W: [],
  X: [],
  Y: [],
};

export default function DirectoryList(props) {
  const { setProfile, setRenderMessage } = props;

  let rawDirectory;
  let rawDirectoryLength;

  let directory;
  const [directoryList, changeDirectoryList] = useState("directory");
  const [directoryLoaded, setDirectoryLoaded] = useState(false);

  function loadProfile(userData) {
    setProfile({
      firstName: userData.first_name,
      lastName: userData.last_name,
      profilePicture: userData.profile_picture,
      aboutMe: userData.about_me,
      phone: userData.phone,
      email: userData.email,
      work: userData.work,
      team: userData.team,
      hourlyRate: userData.hourly_rate,
      birthday: userData.birthday,
      location: userData.location,
      country: userData.country,
    });
  };

  // function getDirectory() {
  //     axios.get("http://localhost:8080/search/getDirectory")
  //         .then((res) => {
  //             directory = {
  //                 A: [],
  //                 B: [],
  //                 C: [],
  //                 D: [],
  //                 E: [],
  //                 F: [],
  //                 G: [],
  //                 H: [],
  //                 I: [],
  //                 J: [],
  //                 K: [],
  //                 L: [],
  //                 M: [],
  //                 N: [],
  //                 O: [],
  //                 P: [],
  //                 Q: [],
  //                 R: [],
  //                 S: [],
  //                 T: [],
  //                 U: [],
  //                 V: [],
  //                 W: [],
  //                 X: [],
  //                 Y: [],
  //             };
  //             rawDirectory = res.data;
  //             rawDirectoryLength = rawDirectory.length;
  //             // loop through each of the fetched user elements
  //             let sortedUsers = [];
  //             rawDirectory.forEach((element) => {
  //                 if (!sortedUsers.includes(element.user_name)) {
  //                     //     // loop through each of the directory keys ie A, B, C etc
  //                     sortedUsers.push(element.user_name);
  //                     Object.keys(directory).forEach((letter) => {
  //                         // if first letter of users last name, raised to upper case matches the directory key
  //                         if (element.last_name[0].toUpperCase() === letter) {
  //                             // add the element to that directory key
  //                             directory[letter].push(element);
  //                         }
  //                     });
  //                 } else {
  //                     return;
  //                 }
  //             });
  //             setDirectoryLoaded(true);
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  // };

  function searchDirectory(query) {
    // only search if query is greater than 3 characters
    if (query.length > 3) {
      // empty the search results list
      searchResults = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
      };
      // loop through each user in the raw directory list
      rawDirectory.forEach((element) => {
        // if the first and last name when joined together (raised to uppercase) contains the query (raised to uppercase)..
        if (
          (element.first_name + " " + element.last_name)
            .toLocaleUpperCase()
            .includes(query.toUpperCase())
        ) {
          // loop through each of the directory keys ie A, B, C etc
          Object.keys(searchResults).forEach((letter) => {
            // if first letter of users last name, raised to upper case matches the directory key
            if (element.last_name[0].toUpperCase() === letter) {
              // add the element to that directory key
              searchResults[letter].push(element);
            }
          });
        } else {
          return;
        }
      });
      // change the state to trigger search results being displayed
      changeDirectoryList("searchResults");
    } else {
      // any less than 3 characters in query, show full directory
      changeDirectoryList("directory");
    }
  };

  // getDirectory(props);

  return (
    <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col overflow-auto max-h-screen">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Directory</h2>
        <p className="mt-1 text-sm text-gray-600">
          Search directory of {rawDirectoryLength} employees
        </p>
        <form className="mt-6 flex space-x-4" action="#">
          <div className="min-w-0 flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                placeholder="Search"
                onChange={(event) => searchDirectory(event.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>

      {/* Directory list */}
      {directoryLoaded && (
        <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
          {directoryList === "directory"
            ? Object.keys(directory).map((letter) => (
                <div key={letter} className="relative">
                  <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>{letter}</h3>
                  </div>
                  <ul
                    role="list"
                    className="relative z-0 divide-y divide-gray-200"
                  >
                    {directory[letter].map((person) => (
                      <li
                        key={person.id}
                        onClick={() => {
                          loadProfile(person);
                          setRenderMessage(false);
                        }}
                      >
                        <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                "http://localhost:8080/public/" +
                                person.profile_picture
                              }
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <a href="#" className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {person.first_name + " " + person.last_name}
                              </p>
                              <p className="truncate text-sm text-gray-500">
                                {person.work}
                              </p>
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : Object.keys(searchResults).map((letter) => (
                <div key={letter} className="relative">
                  <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                    <h3>{letter}</h3>
                  </div>
                  <ul
                    role="list"
                    className="relative z-0 divide-y divide-gray-200"
                  >
                    {searchResults[letter].map((person) => (
                      <li key={person.id}>
                        <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                "http://localhost:8080/public/" +
                                person.profile_picture
                              }
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <a href="#" className="focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {person.first_name + " " + person.last_name}
                              </p>
                              <p className="truncate text-sm text-gray-500">
                                {person.work}
                              </p>
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
        </nav>
      )}
    </aside>
  );
};