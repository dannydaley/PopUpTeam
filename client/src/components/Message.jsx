export default function Message() {
    return (
        <>
            {/* Heading tab */}
            <div className="mt-6 sm:mt-2 2xl:mt-5">
                <div className="border-b border-gray-200">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <a
                                key="messages"
                                href="#"
                                className="border-blue-600 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                aria-current={true ? 'page' : undefined}
                            >
                                Messages
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div class="flex flex-col h-full max-h-[750px] w-full px-4 py-6">
                {/* Message list */}
                <div class="h-full overflow-y-scroll pb-4">
                    <div class="grid grid-cols-12 gap-y-2">
                        {/* Recipient */}
                        {/* Individual message */}
                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                            <div class="flex flex-row items-center">
                                {/* Profile picture */}
                                <div class="flex items-center justify-center h-10 w-10 flex-shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="Profile picture"
                                        class="rounded-full"
                                    ></img>
                                </div>

                                {/* Message content */}
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <div>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div>
                                </div>
                            </div>
                        </div>

                        {/* Sender */}
                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                            <div class="flex items-center justify-start flex-row-reverse">
                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 flex-shrink-0">
                                    <img 
                                        src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" 
                                        alt="Profile picture"
                                        class="rounded-full"
                                    ></img>
                                </div>

                                <div class="relative mr-3 text-sm bg-blue-100 py-2 px-4 shadow rounded-xl">
                                    <div> Lorem ipsum dolor sit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input */}
                <div class="flex flex-row items-center pt-3">
                    <input 
                        type="text" 
                        class="w-full h-10 px-4 text-sm  rounded-3xl focus:outline-none focus:border-blue-300 focus:ring focus:ring-opacity-40 focus:ring-blue-200" 
                        placeholder="Enter your message">
                    </input>

                    <div class="ml-6">
                        <button class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600">
                            <svg class="w-5 h-5 transform rotate-90 -mr-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};