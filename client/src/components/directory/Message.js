import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { ArrowLongUpIcon } from "@heroicons/react/24/outline";

export default function Message({ socket, recipient, profilePicture }) {
  const [sender, setSender] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const bottomRef = useRef(null);

  // Get messages
  useEffect(() => {
    axios
      .get("http://localhost:8080/messages/getMessages", {
        params: {
          recipient: recipient,
        },
      })
      .then((res) => {
        setMessageList(res.data.allMessages);
        setSender(res.data.sender);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipient, message]);

  //Sends message to server
  const sendMessage = () => {
    //If input isnt empty
    if (message !== "") {
      //Add message to database
      axios
        .post("http://localhost:8080/messages/insertMessage", {
          recipient: recipient,
          message: message,
          time: new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          date: new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          }),
        })
        .catch((err) => {
          console.log(err);
        });

      //Formats message for list
      const messageData = {
        sender: sender,
        recipient: recipient,
        message: message,
        time: new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      };

      socket.emit("send_message", messageData); // Send message to server
      setMessageList((list) => [...list, messageData]); //Add message to list

      setMessage(""); //Clears input
    }
  };

  
  // On receiving a message, add it to the message list
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // If the message sender is not equal to the current user, add the message to the message list
      if (data.sender !== sender) {
        setMessageList((prevMessageList) => [...prevMessageList, data].sort((a, b) => {
            // Sort by date
            if (a.date < b.date) return 1; // If a is greater than b list a first
            if (a.date > b.date) return -1; // If a is less than b list b first
            // Sort by time
            if (a.time < b.time) return 1;
            if (a.time > b.time) return -1;
            return 0;
          })
        );
      }
    });
  }, [socket, sender, setMessageList]);

  // Scrolls to bottom of message list
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [messageList]);

  return (
    /* Messages */
    <div class="flex flex-col h-full max-h-[750px] w-full px-4 py-6">
      {/* Message list */}
      <div class="h-full overflow-y-scroll pb-4">
        <div class="grid grid-cols-12">
          {/* Individual message */}
          {messageList
            .sort((a, b) => a.time.localeCompare(b.time)) // Sort messages by time sent
            .map((messageContent, index) => {
              return messageContent.sender === sender ? (
                /* Sender */
                <div key={index} class="col-start-6 col-end-13 p-2 rounded-lg">
                  <div class="flex justify-start flex-row-reverse">
                    {/* Message content */}
                    <div class="flex flex-col space-y-1.5">
                      <div class="relative mr-3 text-sm bg-blue-100 py-2 px-4 shadow rounded-xl">
                        <p ref={bottomRef}>{messageContent.message}</p>
                      </div>

                      <p class="text-xs text-gray-400 italic text-right mr-4">
                        {messageContent.time}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Recipient */
                <div key={index} class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row">
                    <div class="flex items-center justify-center h-10 w-10 flex-shrink-0">
                      <img
                        src={"http://localhost:8080/public/" + profilePicture}
                        alt="Profile picture"
                        class="rounded-full"
                      ></img>
                    </div>

                    <div class="flex flex-col space-y-2">
                      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <p ref={bottomRef}>{messageContent.message}</p>
                      </div>

                      <p class="text-xs text-gray-400 italic text-right ml-4">
                        {messageContent.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
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
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
          class="w-full h-10 px-4 text-sm  rounded-3xl focus:outline-none focus:border-blue-300 focus:ring focus:ring-opacity-40 focus:ring-blue-200"
        ></input>

        <div class="ml-6">
          <button
            onClick={sendMessage}
            class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600"
          >
            <svg
              class="w-5 h-5 transform rotate-90 -mr-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Back to top button */}
      <div class="flex justify-center my-5">
        <button
          onClick={() => {
            document.documentElement.scrollTop = 0;
          }}
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Back to top
          <ArrowLongUpIcon class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};