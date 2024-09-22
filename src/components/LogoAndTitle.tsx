import UnilagLogo from "../assets/unilag-logo.svg";
import UserLocInfo from "./UserLocInfo";
function LogoAndTitle() {
  return (
    <>
      <div className="logo-and-title">
        <img src={UnilagLogo} alt="University of Lagos Logo" className="logo-img" />
        <h1 className="title">Unilag PathFinder</h1>
      </div>
      <div className="main">
            <UserLocInfo/>
        </div>
    </>
  );
}

export default LogoAndTitle;
