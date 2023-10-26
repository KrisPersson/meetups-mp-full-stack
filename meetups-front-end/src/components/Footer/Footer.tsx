import "./Footer.scss";
import Button from "../Button/Button";

function checkIfLoginSignUpPage({ loginView, switchLoginSignUp }: Props) {
  return loginView ? (
    <button className="footer-switchlogin-text" onClick={() => switchLoginSignUp?.()}>
      Don't have a user? Sign up!
    </button>
  ) : (
    <button className="footer-switchlogin-text" onClick={() => switchLoginSignUp?.()}>
      Already have a user? Login!
    </button>
  );
}

interface Props {
  buttonText: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  radius?: string;
  border?: string;
  loginView?: boolean;
  thisIsLoginSignUpPage?: boolean;
  switchLoginSignUp?: () => void;
  onClick: () => void;
}

export default function Footer(props: Props) {
  return (
    <div className="footer">
      <Button {...props}>{props.buttonText}</Button>
      {props.thisIsLoginSignUpPage
        ? checkIfLoginSignUpPage({ ...props })
        : null}
    </div>
  );
}
