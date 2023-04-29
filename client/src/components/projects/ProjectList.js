import { useState } from "react";
import { Link } from "react-router-dom";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function ProjectList(props) {
    const {
        memberList,
        leaderList,
        isDesktop,
        showProjects,
        setShowProjects,
        projectList,
        setProjectList,
        setProject,
    } = props;

    leaderList.sort((a, b) => (a.title > b.title ? 1 : -1)); // Sort projects alphabetically

    const [showCreated, setShowCreated] = useState(true);
    const [showPartOf, setShowPartOf] = useState(true);

    // Filter results based on search input
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();

        // If search bar is empty, display all projects
        if (searchValue.length === 0) {
            setProjectList(projectList);
        } else {
            // Else, filter projects based on search input
            const filteredProjects = projectList.filter((project) =>
                project.title.toLowerCase().includes(searchValue)
            );
            setProjectList(filteredProjects);
        }
    };

    return (
        <>
            {/* Show projects by default on desktop, else allow toggling */}
            {(isDesktop || showProjects) && (
                <div>
                    {/* Project List */}
                    <div className="w-96 h-screen flex flex-col border-r border-gray-200">
                        {/* Heading */}
                        <div className="px-6 pt-6 pb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Projects
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Search project your part of or create a new one
                            </p>
                        </div>

                        <div className="mt-6 mx-5 space-x-2 flex flex-row">
                            {/* Search bar */}
                            <div className="min-w-0 flex-1">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 hover:cursor-pointer">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        onChange={handleSearch}
                                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                                        placeholder="Search"
                                    />
                                </div>
                            </div>

                            {/* Create new project button */}
                            <Link to="/create-project">
                                <button className="rounded-md border border-gray-300 p-2 text-center hover:border-gray-400">
                                    <svg
                                        className="mx-auto h-6 w-6 text-gray-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                                        />
                                    </svg>
                                </button>
                            </Link>
                        </div>

                        {/* Project Lists */}
                        <div
                            onClick={() => setShowCreated(!showCreated)}
                            className="mt-6 mb-4 mx-5 text-sm hover:cursor-pointer "
                        >
                            Created by you
                        </div>

                        {showCreated && (
                            <div className="overflow-y-auto">
                                {leaderList.map((project, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            !isDesktop &&
                                                setShowProjects(false);
                                            setProject(project);
                                        }}
                                        className={`mx-2 p-4 border-t border-gray-200 ${
                                            index === projectList.length - 1
                                                ? "border-b"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium text-gray-500">
                                                {project.title}
                                            </div>

                                            <div className="text-xs font-medium text-gray-300">
                                                - {project.role}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div
                            onClick={() => setShowPartOf(!showPartOf)}
                            className={`py-4 px-5 text-sm border-t hover:cursor-pointer ${
                                !showPartOf ? "border-b" : ""
                            }`}
                        >
                            Projects your part of
                        </div>

                        {showPartOf && (
                            <div className="overflow-y-auto">
                                {memberList.map((project, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            !isDesktop &&
                                                setShowProjects(false);
                                            setProject(project);
                                        }}
                                        className={`mx-2 p-4 border-t border-gray-200 ${
                                            index === projectList.length - 1
                                                ? "border-b"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium text-gray-500">
                                                {project.title}
                                            </div>

                                            <div className="text-xs font-medium text-gray-300">
                                                - {project.role}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
