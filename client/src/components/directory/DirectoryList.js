/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function DirectoryList(props) {
    const [directoryList, changeDirectoryList] = useState("directory");
    const [directoryLoaded, setDirectoryLoaded] = useState(false);

    const {
        isDesktop,
        showDirectory,
        setShowDirectory,
        setProfile,
        setRenderMessage,
    } = props;

    useEffect(() => {
        // Hide directory if not on desktop
        if (window.innerWidth < 1024) {
            setShowDirectory(false);
        }
    }, [setShowDirectory]);

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
    }

    const rawDirectory = useRef([]);

    const directory = useRef({
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
    });

    const searchResults = useRef({
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
    });

    useEffect(
        () =>
            axios
                .get(process.env.REACT_APP_SERVER + "/directory/getDirectory")
                .then((res) => {
                    // apply raw list to rawdirectory variable
                    rawDirectory.current = res.data.directoryData;
                    // add each user from the response data to directory at the corresponding letter,
                    // by first letter of last name
                    res.data.directoryData.forEach((element) => {
                        directory.current[
                            element.last_name[0].toUpperCase()
                        ].push(element);
                    });
                    // set directory as loaded to reveal result
                    setDirectoryLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                }),
        [directory]
    );

    function searchDirectory(query) {
        // only search if query is greater than 3 characters
        if (query.length > 3) {
            // empty the search results list
            searchResults.current = {
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
            rawDirectory.current.forEach((element) => {
                // if the first and last name when joined together (raised to uppercase) contains the query (raised to uppercase)..
                if (
                    (element.first_name + " " + element.last_name)
                        .toLocaleUpperCase()
                        .includes(query.toUpperCase())
                ) {
                    searchResults.current[
                        element.last_name[0].toUpperCase()
                    ].push(element);
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
    }

    return (
        <>
            {/* Show directory by default on desktop, else allow toggling */}
            {isDesktop || showDirectory ? (
                <aside className="w-96 flex-shrink-0 border-r border-gray-200 order-first flex flex-col overflow-auto max-h-screen">
                    <div className="px-6 pt-6 pb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Directory
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Search directory of{" "}
                            {directoryLoaded ? rawDirectory.current.length : ""}{" "}
                            employees
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
                                        onChange={(event) =>
                                            searchDirectory(event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                            >
                                <FunnelIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>

                    {/* Directory list */}
                    {directoryLoaded ? (
                        <nav
                            className="min-h-0 flex-1 overflow-y-auto"
                            aria-label="Directory"
                        >
                            {directoryList === "directory"
                                ? Object.keys(directory.current).map(
                                      (letter) => (
                                          <div
                                              key={letter}
                                              onClick={() => {!isDesktop && setShowDirectory(false)}}
                                              className="relative"
                                          >
                                              <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                                                  <h3>{letter}</h3>
                                              </div>
                                              <ul className="relative z-0 divide-y divide-gray-200">
                                                  {directory.current[
                                                      letter
                                                  ].map((person) => (
                                                      <li
                                                          key={person.id}
                                                          onClick={() => {
                                                              loadProfile(
                                                                  person
                                                              );
                                                              setRenderMessage(
                                                                  false
                                                              );
                                                          }}
                                                      >
                                                          <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50">
                                                              <div className="flex-shrink-0">
                                                                  <img
                                                                      className="h-10 w-10 rounded-full"
                                                                      src={
                                                                          process
                                                                              .env
                                                                              .REACT_APP_SERVER +
                                                                          "/public/" +
                                                                          person.profile_picture
                                                                      }
                                                                      alt=""
                                                                  />
                                                              </div>
                                                              <div className="min-w-0 flex-1">
                                                                  <div className="focus:outline-none">
                                                                      {/* Extend touch target to entire panel */}
                                                                      <span
                                                                          className="absolute inset-0"
                                                                          aria-hidden="true"
                                                                      />
                                                                      <p className="text-sm font-medium text-gray-900">
                                                                          {person.first_name +
                                                                              " " +
                                                                              person.last_name}
                                                                      </p>
                                                                      <p className="truncate text-sm text-gray-500">
                                                                          {
                                                                              person.work
                                                                          }
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      )
                                  )
                                : Object.keys(searchResults.current).map(
                                      (letter) => (
                                          <div
                                              key={letter}
                                              className="relative"
                                          >
                                              <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                                                  <h3>{letter}</h3>
                                              </div>
                                              <ul className="relative z-0 divide-y divide-gray-200">
                                                  {searchResults.current[
                                                      letter
                                                  ].map((person) => (
                                                      <li key={person.id}>
                                                          <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50">
                                                              <div className="flex-shrink-0">
                                                                  <img
                                                                      className="h-10 w-10 rounded-full"
                                                                      src={
                                                                          process
                                                                              .env
                                                                              .REACT_APP_SERVER +
                                                                          "/public/" +
                                                                          person.profile_picture
                                                                      }
                                                                      alt=""
                                                                  />
                                                              </div>
                                                              <div className="min-w-0 flex-1">
                                                                  <a
                                                                      href="/"
                                                                      className="focus:outline-none"
                                                                  >
                                                                      {/* Extend touch target to entire panel */}
                                                                      <span
                                                                          className="absolute inset-0"
                                                                          aria-hidden="true"
                                                                      />
                                                                      <p className="text-sm font-medium text-gray-900">
                                                                          {person.first_name +
                                                                              " " +
                                                                              person.last_name}
                                                                      </p>
                                                                      <p className="truncate text-sm text-gray-500">
                                                                          {
                                                                              person.work
                                                                          }
                                                                      </p>
                                                                  </a>
                                                              </div>
                                                          </div>
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      )
                                  )}
                        </nav>
                    ) : (
                        ""
                    )}
                </aside>
            ) : (
                <></>
            )}
        </>
    );
}
