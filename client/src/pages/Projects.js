import { useState } from "react";

import SideBar from "../components/directory/SideBar";
import ProjectList from "../components/projects/ProjectList";
import ProjectOverview from "../components/projects/ProjectOverview";

export default function Projects(props) {
  const { isDesktop, account } = props;

  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="flex flex-row">
      <SideBar showProjects={showProjects} setShowProjects={setShowProjects} account={account} />

      <ProjectList isDesktop={isDesktop} showProjects={showProjects} setShowProjects={setShowProjects} />

      <ProjectOverview />
    </div>
  );
};