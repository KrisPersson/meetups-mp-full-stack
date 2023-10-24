import "./LoginSignUpView.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function LoginSignUpView() {
  function clickLogin() {}

  function handleClick() {}

  return (
    <div className="view login-view">
      <Header isLoggedIn={true} onClick={handleClick} />
      <section className="login-forms">
        <div className="login-wrapper-one">
          <Input label="USERNAME" htmlFor="login-input" />
        </div>
        <div className="login-wrapper-two">
          <Input label="PASSWORD" htmlFor="login-input" fieldType="pwd" />
        </div>
      </section>
      <Footer buttonText="LOGIN" type="login-view" onClick={clickLogin} />
    </div>
  );
}
