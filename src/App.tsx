import LogoAndTitle from "./components/LogoAndTitle"
import './App.css'
import UserLocInfo from "./components/UserLocInfo"
import Map from "./components/Map"
import haversineDistance
 from "./components/haversineDistance"
 import graph from "./components/graphData"
function App() {
  console.log(haversineDistance([6.51854, 3.38490], [6.516783,3.386586 ]))
  console.log("Graph Structure: ", Array.from(graph.entries()));
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