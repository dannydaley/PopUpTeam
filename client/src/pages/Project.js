import SideBar from "../components/directory/SideBar";
import AddTeam from "../components/directory/AddTeam";

export default function NewProject() {
  return (
    <div class="flex">
      <SideBar
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
};