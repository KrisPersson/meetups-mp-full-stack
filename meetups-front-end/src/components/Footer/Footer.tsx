import "./Footer.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
interface Props {
  buttonText: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  radius?: string;
  border?: string;
  type?: string;
  onClick: () => void;
}

export default function Footer(props: Props) {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <Button {...props}>{props.buttonText}</Button>
      {props.type === "login-view" ? (
        <p className="footer-text" onClick={() => navigate}>Dont have username? Sign up!</p>
      ):
      (
        null
      )}
    </div>
  );
}
