import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Message({socket, sender, recipient}) {
    const router = useRouter()

    const [profile , setProfile] = useState('');

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
        setProfile(router.query.profile);

        //Receive message from back-end
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data]);
        }, [socket]);
    });

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messageList]);
    

    return (
        <>
            {/* Messages */}
            <div class="flex flex-col h-full max-h-[750px] w-full px-4 py-6">
                {/* Message list */}
                <div class="h-full overflow-y-scroll pb-4">
                    <div class="grid grid-cols-12 gap-y-2">
                        {/* Individual message */}
                        {messageList.map((messageContent) => {
                            return (
                                messageContent.sender === sender ? (
                                    /* Sender */
                                    <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                        <div class="flex items-center justify-start flex-row-reverse">
                                            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 flex-shrink-0">
                                                {/* Replace src with currently logged users profile picture */}
                                                <img 
                                                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" 
                                                    alt="Profile picture"
                                                    class="rounded-full"
                                                ></img>
                                            </div>
            
                                            <div class="relative mr-3 text-sm bg-blue-100 py-2 px-4 shadow rounded-xl">
                                                <div ref={bottomRef}>{messageContent.message}</div>
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                    /* Recipient */
                                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                        <div class="flex flex-row items-center">
                                            {/* Profile picture */}
                                            <div class="flex items-center justify-center h-10 w-10 flex-shrink-0">
                                                <img
                                                    src={profile}
                                                    alt="Profile picture"
                                                    class="rounded-full"
                                                ></img>
                                            </div>

                                            {/* Message content */}
                                            <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div ref={bottomRef}>{messageContent.message}</div>
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
            </div>
        </>
    );
};