import { useState, useEffect } from "react";
import axios from "axios";

import SideBar from "../components/directory/SideBar";
import ProjectList from "../components/projects/ProjectList";
import ProjectOverview from "../components/projects/ProjectOverview";

export default function Projects(props) {
  const { isDesktop, account } = props;

  const [showProjects, setShowProjects] = useState(true);

  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState({});

  // Get all created projects
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "/projects/created")
      .then((res) => {
        setProjectList(res.data);
      });
  }, []);

  return (
    <div className="flex flex-row">
      <SideBar
        showProjects={showProjects}
        setShowProjects={setShowProjects}
        account={account}
      />

      <ProjectList
        isDesktop={isDesktop}
        showProjects={showProjects}
        setShowProjects={setShowProjects}
        projectList={projectList}
        setProjectList={setProjectList}
        setProject={setProject}
      />

      <ProjectOverview 
        project={project}
        projectList={projectList}
      />
    </div>
  );
};