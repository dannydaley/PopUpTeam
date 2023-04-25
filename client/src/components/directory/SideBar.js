import { Fragment, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

import { Dialog, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    CalendarIcon,
    KeyIcon,
    FolderIcon,
    Cog6ToothIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../Logo";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SideBar(props) {
    const location = useLocation();

    const { isDesktop, showDirectory, setShowDirectory, showProjects, setShowProjects, account, setAccount } =
        props;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Logout user
    const onSignOut = () => {
        // Logout user
        axios
            .post(process.env.REACT_APP_SERVER + "/auth/signout")
            .then((res) => {
                //Default data
                setAccount({
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
                    skills: [],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Must be brought into function to prevent top level hook error
    const navigation = [
        {
            name: "Directory",
            link: "directory",
            icon: UsersIcon,
            current: location.pathname === "/directory" ? true : false,
            onClick: () => {
                if (!isDesktop) {
                    setShowDirectory(!showDirectory);
                    setSidebarOpen(false);
                };
            },
        },
        {
            name: "Projects",
            link: "projects",
            icon: FolderIcon,
            current: location.pathname === "/projects" ? true : false,
            onClick: () => {
                if (!isDesktop) {
                    setShowProjects(!showProjects);
                    setSidebarOpen(false);
                };
            },
        },
        {
            name: "Kanban",
            link: "kanban",
            icon: CalendarIcon,
            current: location.pathname === "/kanban" ? true : false,
        },
        {
            name: "Settings",
            link: "settings",
            icon: Cog6ToothIcon,
            current: location.pathname === "/settings" ? true : false,
        },
        {
            name: "Logout",
            link: "",
            icon: KeyIcon,
            current: location.pathname === "/" ? true : false,
            onClick: onSignOut,
        },
    ];

    return (
        <>
            {/* Mobile sidebar */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 md:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700">
                                {/* Close sidebar button */}
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>

                                {/*  Sidebar content */}
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <Logo
                                            width={170}
                                            image={"logo-white.png"}
                                        />
                                    </div>
                                    <nav className="mt-5 space-y-1 px-2">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={`/${item.link}`}
                                                onClick={item.onClick}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-indigo-800 text-white"
                                                        : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                                                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                                )}
                                            >
                                                <item.icon
                                                    className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Open sidebar button */}
            <div className="flex flex-1 flex-col md:pl-64">
                <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Desktop sidebar*/}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-indigo-700">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <Logo width={140} image={"logo-white.png"} />
                        </div>

                        {/* Sidebar content */}
                        <nav className="mt-5 flex-1 space-y-1 px-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={`/${item.link}`}
                                    onClick={(e) => {
                                        // If the link is the current page, prevent the default action
                                        if (
                                            location.pathname ===
                                            `/${item.link}`
                                        ) {
                                            e.preventDefault();
                                        }
                                        item.onClick();
                                    }}
                                    className={classNames(
                                        item.current
                                            ? "bg-indigo-800 text-white"
                                            : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                >
                                    <item.icon
                                        className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Profile */}
                    <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                        <div className="flex items-center">
                            <img
                                className="inline-block h-9 w-9 rounded-full"
                                src={
                                    process.env.REACT_APP_SERVER +
                                    "/public/" +
                                    account.profilePicture
                                }
                                alt="Logged in user profile"
                            />

                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">
                                    {account.firstName} {account.lastName}
                                </p>
                                <div className="">
                                    <a href="/settings">
                                        <p className="text-xs font-medium text-indigo-200 hover:text-white">
                                            View profile
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
