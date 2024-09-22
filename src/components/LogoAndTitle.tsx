import UnilagLogo from "../assets/Unilag Logo.png";
function LogoAndTitle() {
  return (
    <>
      <div className="logo-and-title">
        <img src={UnilagLogo} alt="University of Lagos Logo" className="logo-img" />
        <h1>Unilag PathFinder</h1>
      </div>
    </>
  );
}

export default LogoAndTitle;
