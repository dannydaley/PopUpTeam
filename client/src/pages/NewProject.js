import SideBar from "../components/directory/SideBar";

export default function NewProject(props) {
    const { account } = props;
    return (
        <div class="flex">
            <SideBar
                account={account}
                //Replace with actual user data from user session
                userData={{
                    firstName: "test",
                    lastName: "test",
                    profilePicture: "test",
                }}
            />

            <div className="text-center w-screen h-screen flex flex-col col-span-4 justify-center">
                <section class="text-gray-600 body-font h-screen">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="flex flex-wrap -m-4 text-center">
                            <div class="p-4 sm:w-1/2 lg:w-1/3 w-full ">
                                <div class=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                                    <button
                                        type="button"
                                        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
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
                                        <span className="mt-2 block text-sm font-large text-gray-900">
                                            Project Name
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div class="p-4 sm:w-1/2 lg:w-1/3 w-full ">
                                <div class=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                                    <button
                                        type="button"
                                        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
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
                                        <span className="mt-2 block text-sm font-large text-gray-900">
                                            Create a new proejct
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
