import UnilagLogo from "../assets/unilag-logo.svg";
function LogoAndTitle() {
  return (
    <>
      <div className="logo-and-title">
        <img src={UnilagLogo} alt="University of Lagos Logo" className="logo-img" />
        <h1 className="title">Unilag  <span style={{color:'blue'}}> Path</span>Finder</h1>
      </div>
      
    </>
  );
}

export default LogoAndTitle;