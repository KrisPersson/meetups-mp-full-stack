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
  switchRegisterBtn?: () => void;
  onClick: () => void;
}

export default function Footer(props: Props) {


  return (
    <div className="footer">
      <Button {...props}>{props.buttonText}</Button>
    </div >
  );
}
