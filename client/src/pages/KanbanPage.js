import SideBar from "../components/directory/SideBar";
import Kanban from "./Kanban";

const KanbanPage = () => {
	return (
		<div className="flex">
			<div>
				<SideBar
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
