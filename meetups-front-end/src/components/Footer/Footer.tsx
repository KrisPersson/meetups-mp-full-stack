import "./Footer.scss";
import Button from "../Button/Button";
//import { useNavigate } from "react-router-dom";
interface Props {
  buttonText: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  radius?: string;
  border?: string;
  type?: string;
  unannounced?: boolean;
  registered?: boolean;
  onClick: () => void;
}

export default function Footer(props: Props) {


  return (
    <div className="footer">
      <Button {...props}>{props.buttonText}</Button>
      {/* {props.loginView ? (
        <p className="footer-text" onClick={() => props.switchLoginSignUp?.()}>
          Don't have a user? Sign up!
        </p>
      ) : (
        <p className="footer-text" onClick={() => props.switchLoginSignUp?.()}>
          Already have a user? Login!
        </p>
      )} */}
    </div >
  );
}
