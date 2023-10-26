import { useState } from "react";
import "./LoginSignUpView.scss";
import Footer from "../../components/Footer/Footer";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function LoginSignUpView() {
  const [loginView, setLoginView] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Nedanstående funktion ska tas bort efter att jag pull:at Pablos version (tror jag)
  function clickLogin() {}

  function handleClick() {}

  function clickLoginSignUp() {
    loginView
      ? console.log(
          `Du är nu inloggad som användare ${usernameInput} med lösenord ${passwordInput}.`
        )
      : console.log(
          `Du är nu registrerad som användare ${usernameInput} med lösenord ${passwordInput}.`
        );
  }

  function switchLoginSignUp() {
    loginView ? setLoginView(false) : setLoginView(true);
  }

  return (
    <div className="view login-view">
    <div className="view login-view">
      <Header isLoggedIn={true} onClick={handleClick} />
      <section className="login-forms">
        <div className="login-wrapper-one">
          <Input
            label="USERNAME"
            htmlFor="login-input"
            inputValue={usernameInput}
            setInputValue={setUsernameInput}
          />
        </div>
        <div className="login-wrapper-two">
          <Input
            label="PASSWORD"
            htmlFor="pwd-input"
            fieldType="pwd"
            inputValue={passwordInput}
            setInputValue={setPasswordInput}
          />
        </div>
      </section>
      {loginView ? (
        <Footer
          buttonText="LOGIN"
          loginView={true}
          onClick={clickLoginSignUp}
          switchLoginSignUp={switchLoginSignUp}
          thisIsLoginSignUpPage={true}
        />
      ) : (
        <Footer
          buttonText="SIGN UP"
          loginView={false}
          onClick={clickLoginSignUp}
          switchLoginSignUp={switchLoginSignUp}
          thisIsLoginSignUpPage={true}
        />
      )}
    </div>
  );
}
