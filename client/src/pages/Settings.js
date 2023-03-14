import SideBar from "../components/directory/SideBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Settingspage(props) {
    const { account } = props;

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newAbout, setNewAbout] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newLastName, setNewLastName] = useState("");

    useEffect(() => {
        // Get session user data
        axios
            .get(process.env.REACT_APP_SERVER + "/auth/signin")
            .then((res) => {
                if (res.data.loggedIn === true) {
                    setUsername(res.data.username);
                    setUsername(res.data.username);
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();
    const changeProfilePicture = async (image) => {
        let formData = new FormData();
        formData.append("image", image);
        formData.append("uploader", firstName + lastName);
        formData.append("username", username);
        await axios
            .post(
                process.env.REACT_APP_SERVER +
                    "/settings" +
                    "/changeProfilePicture",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    body: JSON.stringify({
                        username: username,
                        name: firstName + lastName,
                    }),
                }
            )
            .then((res) => {
                this.setState({ profilePicture: res.data.profilePicture });
            });
    };

    async function saveNewSettings() {
        await axios
            .post(process.env.REACT_APP_SERVER + "/settings/updateSettings", {
                username: username,
                newFirstName: newFirstName,
                newLastName: newLastName,
                newEmail: newEmail,
                newAbout: newAbout,
            })
            .then((res) => {
                if (res.data.status === "success") {
                    navigate("/directory");
                }
            });
    }

    return (
        <div class="flex">
            <SideBar
                account={account}
            />

            <form className="space-y-6 px-6 py-6" action="#" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <p className="mt-1 text-sm text-gray-500">
                                This information will be displayed publicly so
                                be careful what you share.
                            </p>
                        </div>
                        <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                            <div>
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    About
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="you@example.com"
                                        defaultValue={""}
                                        onChange={(event) =>
                                            setNewAbout(event.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="w-1/2 col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="work"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Work
                                    </label>
                                    <input
                                        type="text"
                                        name="work"
                                        id="work"
                                        autoComplete="family-name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Photo
                                </label>
                                <div className="mt-1 flex items-center space-x-5">
                                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>
                                    <button
                                        id="loadFileXml"
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById("file-input")
                                                .click()
                                        }
                                        className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Change
                                    </button>
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        id={"file-input"}
                                        name="file"
                                        onChange={(event) =>
                                            changeProfilePicture(
                                                event.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Cover photo
                                </label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Personal Information
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Use a permanent address where you can receive
                                mail.
                            </p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        first name
                                    </label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(event) =>
                                            setNewFirstName(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="last-name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        last name
                                    </label>
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(event) =>
                                            setNewLastName(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="email-address"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="text"
                                        name="email-address"
                                        id="email-address"
                                        autoComplete="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(event) =>
                                            setNewEmail(event.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Country
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option>Canada</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label
                                        htmlFor="street-address"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Street address
                                    </label>
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label
                                        htmlFor="region"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        State / Province / County
                                    </label>
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label
                                        htmlFor="postal-code"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        ZIP / Postal code
                                    </label>
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => saveNewSettings()}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
