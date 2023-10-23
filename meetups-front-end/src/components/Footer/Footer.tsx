import "./Footer.scss";
import Button from "../Button/Button";
interface Props {
  buttonText: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  radius?: string;
  border?: string;
  onClick: () => void;
}

export function Footer(props: Props) {
  return (
    <div className="footer">
      <Button {...props}>{props.buttonText}</Button>
    </div>
  );
}
