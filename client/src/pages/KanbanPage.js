import SideBar from "../components/directory/SideBar";
import Kanban from "./Kanban";

const KanbanPage = (props) => {
    const { account } = props;
    return (
        <div className="flex">
            <div>
                <SideBar
                    account={account}
                    //Replace with actual user data from user session
                    userData={{
                        firstName: "test",
                        lastName: "test",
                        profilePicture: "test",
                    }}
                />
            </div>
            <Kanban />
        </div>
    );
};

export default KanbanPage;
