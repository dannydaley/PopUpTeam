import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import SideBar from "../components/directory/SideBar";
import Profile from "../components/directory/Profile";
import DirectoryList from "../components/directory/DirectoryList";

export default function CreativeDirectory(props) {
    const isDesktop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    const [showDirectory, setShowDirectory] = useState(true);
    const [renderMessage, setRenderMessage] = useState(false);

    const { profile, setProfile, sender } = props;

    return (
        <div class="flex">
            <SideBar
                isDesktop={isDesktop}
                showDirectory={showDirectory}
                setShowDirectory={setShowDirectory}
                profile={profile}
                setProfile={setProfile}
            />

            <div className="flex w-screen h-auto">
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last max-h-screen">
                            <Profile
                                profile={profile}
                                renderMessage={renderMessage}
                                setRenderMessage={setRenderMessage}
                                sender={sender}
                            />
                        </main>

                        <DirectoryList
                            isDesktop={isDesktop}
                            showDirectory={showDirectory}
                            setShowDirectory={setShowDirectory}
                            setProfile={setProfile}
                            setRenderMessage={setRenderMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
