import MemberCards from "../directory/MemberCards";

export default function ProjectOverview(props) {
  const { project } = props;

  // Format creation date
  const date = new Date(project.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, "-");

  return (
    <div className="w-full">
      <div className="relative h-32 w-full object-cover lg:h-48 bg-gray-5a0">
        <div className="absolute flex flex-row items-center px-5 top-1/2 transform -translate-y-1/2 space-x-5">
          <img
            className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 rounded-full border border-gray-500"
            src="../images/background-auth.jpg"
            alt="Project logo"
          />
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="mx-5">
        <hr className="w-full -mx-5 border-gray-300"></hr>

        {/* Project description */}
        <h2 className="mt-8 text-base font-bold text-gray-700">Overview</h2>

        <p className="mt-2.5 text-sm text-gray-500">
          {project.description}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row w-full space-y-8 sm:space-y-0 lg:space-y-8 xl:space-y-0">
          {/* Project leader */}
          <div className="w-1/2">
            <h2 className="text-base font-bold text-gray-700">
              Project leader
            </h2>

            <div className="mt-2.5 flex flex-row items-center space-x-2.5">
              <img
                className="h-16 w-16 rounded-full border border-gray-500"
                src="../images/background-auth.jpg"
                alt="Project leader"
              />

              <div>
                <div className="font-semibold text-gray-700">{project.leader}</div>
                <a href={`mailto:${project.leader_email}`} className="text-sm text-gray-400 hover:text-gray-700 hover:underline hover:cursor-pointer">
                  {project.leader_email}
                </a>
              </div>
            </div>
          </div>

          {/* Completion date */}
          <div className="w-1/2">
            <h2 className="text-base font-bold text-gray-700">
              Created
            </h2>

            <div className="mt-1.5 text-gray-500">{formattedDate}</div>
          </div>
        </div>

        {/* Project members */}
        <h2 className="mt-8 text-base font-bold text-gray-700">Members</h2>

        <MemberCards />
      </div>
    </div>
  );
}
