import "./Header.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  backButton?: boolean;
  profileButton?: boolean;
  onClick: () => void;
};

export default function Header(props: Props) {
  const navigate = useNavigate();

  return (
    <>
      {props.isLoggedIn ? (
        <div className="header logged-in">
          <h1 className="nav-home" onClick={() => navigate("/")}>
            HOME
          </h1>
        </div>
      ) : (
        <div className="header not-logged-in">
          <Button
            width="fit-content"
            height="fit-content"
            radius="0.3rem"
            border="solid 0.1rem #ff4910"
            backgroundColor="transparent"
            color="#ff4910"
            fontFamily="Open Sans"
            fontWeight="400"
            padding="0.3rem 0.6rem 0.3rem 0.6rem"
            onClick={props.onClick}
          >
            Sign up
          </Button>
        </div>
      )}
    </>
  );
}
