import "./LoginSignUpView.scss";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";

export default function LoginSignUpView() {
  function handleClick() {}

  return (
    <div className="view">
      <Header isLoggedIn={true} onClick={handleClick} />
      <section className="login-forms">
        <div className="login-wrapper-one">
          <Input label="USERNAME" htmlFor="login-input" />
        </div>
        <div className="login-wrapper-two">
          <Input label="USERNAME" htmlFor="login-input" fieldType="pwd" />
        </div>
      </section>
    </div>
  );
}
