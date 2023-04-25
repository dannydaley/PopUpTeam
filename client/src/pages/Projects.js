import SideBar from "../components/directory/SideBar";
import ProjectList from "../components/projects/ProjectList";
import ProjectOverview from "../components/projects/ProjectOverview";

export default function Projects(props) {
  const { account } = props;

  return (
    <div className="flex flex-row">
      <SideBar account={account} />

      <ProjectList />

      <ProjectOverview />
    </div>
  );
};