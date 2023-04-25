import MemberCards from "../directory/MemberCards";

export default function ProjectOverview() {
  return (
    <div className="w-full">
      <div className="relative h-32 w-full object-cover lg:h-48 bg-gray-5a0">
        <div className="absolute flex flex-row items-center px-5 top-1/2 transform -translate-y-1/2 space-x-5">
          <img
            className="h-24 w-24 rounded-full border border-gray-500 sm:h-32 sm:w-32"
            src="../images/background-auth.jpg"
            alt="Project logo"
          />
          <h1 className="truncate text-2xl font-bold text-gray-900">
            Project name
          </h1>
        </div>
      </div>

      <div className="mx-5">
        <hr className="w-full -mx-5 border-gray-300"></hr>

        {/* Project description */}
        <h2 className="mt-8 text-base font-bold text-gray-700">Overview</h2>

        <p className="mt-2.5 text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          congue vitae nisl vestibulum imperdiet. Etiam ut quam sollicitudin,
          sodales tortor non, vulputate tellus. Phasellus vitae justo ac nulla
          vulputate placerat vel vitae nunc. Etiam iaculis, leo id vulputate
          congue, neque enim luctus nibh, et ullamcorper mauris odio non nunc.
          Integer in justo ex. Integer id nibh in tellus bibendum accumsan id eu
          lacus.
        </p>

        <div className="mt-8 flex flex-row w-full">
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
                <div className="font-semibold text-gray-700">John Doe</div>
                <div className="text-sm text-gray-400 hover:text-gray-700 hover:underline hover:cursor-pointer">
                  JohnDoe@example.com
                </div>
              </div>
            </div>
          </div>

          {/* Completion date */}
          <div className="w-1/2">
            <h2 className="text-base font-bold text-gray-700">
              Expected completion
            </h2>

            <div className="mt-1.5 text-gray-500">00/00/0000</div>
          </div>
        </div>

        {/* Project members */}
        <h2 className="mt-8 text-base font-bold text-gray-700">Members</h2>

        <MemberCards />
      </div>
    </div>
  );
}