import LogoAndTitle from "./components/LogoAndTitle"
import './App.css'
import UserLocInfo from "./components/UserLocInfo"
function App() {
  

  return (
    <>
        <LogoAndTitle/>
        <div className="main">
            <UserLocInfo/>
        </div>
    </>
  )
}

export default App
