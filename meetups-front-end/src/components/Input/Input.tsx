import { useState } from "react";
import "./Input.scss";

function InsertTypeOfField({
  htmlFor,
  fieldType,
  inputValue,
  setInputValue,
}: InputProps) {
  const [isPasswordMasked, setIsPasswordMasked] = useState(true);

  if (fieldType === "pwd") {
    let textOrDots: string, maskedOrNot: string, iconType: string;

    if (isPasswordMasked) {
      textOrDots = "password";
      maskedOrNot = "big-dots";
      iconType = "icon-pwd-hidden";
    } else {
      textOrDots = "text";
      maskedOrNot = "";
      iconType = "icon-pwd-visible";
    }

    return (
      <div className="input-text-field-wrapper add-border">
        <input
          type={textOrDots}
          id={htmlFor}
          className={`input-text-field remove-border ${maskedOrNot}`}
          // defaultValue=""
          // ref={passwordInput}
          // onChange={(e) => onChange && onChange(e)}
          value={inputValue}
          onChange={(e) => setInputValue && setInputValue(e.target.value)}
        />
        <div
          className={iconType}
          onClick={() => {
            isPasswordMasked
              ? setIsPasswordMasked(false)
              : setIsPasswordMasked(true);
          }}
        ></div>
      </div>
    );
  } else {
    return (
      <input
        type="text"
        id={htmlFor}
        className="input-text-field"
        // defaultValue=""
        // ref={usernameInput}
        // onChange={(e) => onChange && onChange(e)}
        value={inputValue}
        onChange={(e) => setInputValue && setInputValue(e.target.value)}
      />
    );
  }
}

type InputProps = {
  label: string;
  htmlFor: string;
  fieldType?: string;
  value?: string;
  inputValue?: string;
  setInputValue?: (value: string) => void;
};

export default function Input(props: InputProps) {
  return (
    <form className="input-wrapper">
      <div className="input-sign">
        <label htmlFor={props.htmlFor} className="input-sign-text">
          {props.label}
        </label>
      </div>
      <InsertTypeOfField {...props} />
    </form>
  );
}
