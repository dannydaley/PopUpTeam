import SideBar from "../components/directory/SideBar";

export default function Projects(props) {
  const { account } = props;

  return (
    <div className="flex">
      <SideBar account={account} />
    </div>
  );
};