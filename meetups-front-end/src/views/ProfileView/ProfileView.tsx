import "./ProfileView.scss";
import Header from "../../components/Header/Header";




export default function ProfileView() {
  function handleClick() { }

  const userName = "Kalle";

  return <div className="view profile-view">
    <Header showHomeBtn={true} showMyPageBtn={false} onClick={handleClick} />
    <section className="profile-container"></section>
    <h1>{userName}s meetups</h1>

  </div>;
}
