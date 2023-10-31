import { APP_URL } from '../../utils';
import './Header.scss';
//import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';

type Props = {
  showHomeBtn?: boolean;
  showMyPageBtn?: boolean;
  backButton?: boolean;
  loginSignUpHeader?: boolean;
  onClick?: () => void;
};

export default function Header(props: Props) {
  const navigate = useNavigate();

  return (
    <header className='header'>
      {props.showHomeBtn ? (
        <div className='home'>
          <h1 className='nav-home' onClick={() => navigate(`${APP_URL}`)}>
            HOME
          </h1>
        </div>
      ) : null}
      {props.showMyPageBtn ? (
        <div className='myPage'>
          <h1
            className='nav-myPage'
            onClick={() => navigate(APP_URL + 'profile')}
          >
            MIN SIDA
          </h1>
        </div>
      ) : null}
      {props.loginSignUpHeader ? (
        <div className='nav-login-signup'>
          <h1 className='nav-login-signup-text'>MEETUP</h1>
        </div>
      ) : null}
    </header>
  );
}
