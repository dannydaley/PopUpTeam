import { useEffect, useState, useRef } from 'react';
import { ArrowLongUpIcon } from '@heroicons/react/24/outline';

export default function Message({socket, sender, recipient}) {
    const [profile , setProfile] = useState('');
    const [name , setName] = useState('');

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const bottomRef = useRef(null);
    
    //Sends message to server
    const sendMessage = async () => {
        //If input isnt empty
        if (message !== '') {
            //Formats message
            const messageData = {
                sender: sender,
                recipient: recipient,
                message: message,
                time:
                    new Date().getHours() +
                    ':' +
                    new Date().getMinutes(),
            };

            //Sends to back end
            await socket.emit('send_message', messageData);
            //Shows previously sent message
            setMessageList((list) => [...list, messageData]);    
            
            //Clears input
            setMessage('');
        };
    };

    useEffect(() => {
        //Select profile picture as pushed URL from CreativeDirectory
        setProfile("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");
        //Select name as pushed URL from CreativeDirectory
        setName("John smith");

        //Receive message from back-end
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data]);
        }, [socket]);
    });

    useEffect(() => {
        // Scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messageList]);

    return (
        /* Messages */
        <div class="flex flex-col h-full max-h-[750px] w-full px-4 py-6">
            {/* Message list */}
            <div class="h-full overflow-y-scroll pb-4">
                <p class="text-center italic text-gray-400">Chat started with: <span class="font-semibold">{name}</span></p>
                <div class="grid grid-cols-12">
                    {/* Individual message */}
                    {messageList.map((messageContent) => {
                        return (
                            messageContent.sender === sender ? (
                                /* Sender */
                                <div class="col-start-6 col-end-13 p-2 rounded-lg">
                                    <div class="flex justify-start flex-row-reverse">
                                        {/* Profile picture */}
                                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 flex-shrink-0">
                                            {/* Replace src with currently logged users profile picture */}
                                            <img 
                                                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" 
                                                alt="Profile picture"
                                                class="rounded-full"
                                            ></img>
                                        </div>
        
                                        {/* Message content */}
                                        <div class="flex flex-col space-y-1.5">
                                            <div class="relative mr-3 text-sm bg-blue-100 py-2 px-4 shadow rounded-xl">
                                                <p ref={bottomRef}>{messageContent.message}</p>
                                            </div>

                                            <p class="text-xs text-gray-400 italic text-right mr-4">{messageContent.time}</p>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                /* Recipient */
                                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                    <div class="flex flex-row">
                                        <div class="flex items-center justify-center h-10 w-10 flex-shrink-0">
                                            <img
                                                src={profile}
                                                alt="Profile picture"
                                                class="rounded-full"
                                            ></img>
                                        </div>

                                        <div class="flex flex-col space-y-2">
                                            <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <p ref={bottomRef}>{messageContent.message}</p>
                                            </div>

                                            <p class="text-xs text-gray-400 italic text-right ml-4">{messageContent.time}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    })}
                </div>
            </div>

            {/* Input */}
            <div class="flex flex-row items-center pt-3">
                <input 
                    type="text" 
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    //Sends message on enter
                    onKeyPress={(e) => {
                        e.key === 'Enter' && sendMessage();
                    }}
                    class="w-full h-10 px-4 text-sm  rounded-3xl focus:outline-none focus:border-blue-300 focus:ring focus:ring-opacity-40 focus:ring-blue-200">
                </input>

                <div class="ml-6">
                    <button 
                        onClick={sendMessage}
                        class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600"
                    >
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

            {/* Back to top button */}
            <div class="flex justify-center my-5">
                <button
                    onClick={() => {document.documentElement.scrollTop = 0;}}
                    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                    Back to top

                    <ArrowLongUpIcon class="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};