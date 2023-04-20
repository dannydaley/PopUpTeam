import SideBar from "../components/directory/SideBar";
import AddTeam from "../components/projects/AddTeam";

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
                <AddTeam />
            </div>
        </div>
    );
}
