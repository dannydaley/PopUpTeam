import { useNavigate } from "react-router-dom";

export default function Logo(props) {
  const navigate = useNavigate();

  const { width, height, image } = props;

  return (
    <img
      src={`/images/logos/${image}`}
      width={width ? width : "auto"}
      height={height ? height : "auto"}
      alt="Logo"
      onClick={() => navigate("/")}
      className="hover:cursor-pointer"
    ></img>
  );
};