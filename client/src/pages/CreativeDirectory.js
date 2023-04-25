import { useState } from "react";

import SideBar from "../components/directory/SideBar";
import Profile from "../components/directory/Profile";
import DirectoryList from "../components/directory/DirectoryList";

export default function CreativeDirectory(props) {
    const { isDesktop, profile, setProfile, account, setAccount, sender } = props;

    const [showDirectory, setShowDirectory] = useState(true);
    const [renderMessage, setRenderMessage] = useState(false);

    return (
        <div class="flex">
            <SideBar
                isDesktop={isDesktop}
                showDirectory={showDirectory}
                setShowDirectory={setShowDirectory}
                account={account}
                setAccount={setAccount}
            />

            <div className="flex w-screen h-auto">
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last max-h-screen">
                            <Profile
                                account={account}
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
