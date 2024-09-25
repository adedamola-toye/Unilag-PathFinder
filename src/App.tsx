import LogoAndTitle from "./components/LogoAndTitle"
import './App.css'
import UserLocInfo from "./components/UserLocInfo"
import Map from "./components/Map"
function App() {
  

  return (
    <>
        <LogoAndTitle/>
        <div className="main">
            <UserLocInfo/>
            <Map/>
        </div>
    </>
  )
}

export default App
