import { locationsCoordinates } from "./locationsCoordinates";
import haversineDistance from "./haversineDistance";
import { findShortestPath } from "./dijkstra";

type UnilagLocation={
  location: string;
  latitude: number;
  longitude: number
}
type Graph = Map<string, Map<string, number>>;

function createGraph(): Map<string, Map<string, number>> {
  return new Map();
}


function addNodeToGraph(graph: Graph, location: UnilagLocation){
  const {location: locationName} = location;
  graph.set(locationName, new Map())
}

function addEdgeToGraph(graph: Graph, location1: string, location2: string, distance: number){
  graph.get(location1)!.set(location2, distance)
  graph.get(location2)!.set(location1, distance)
}

const graph = createGraph();

for(const location of locationsCoordinates){
  addNodeToGraph(graph, location)
}

const edges =[
  {from:"First Gate", to: "Faculty of Education"},
  {from:"Faculty of Education", to: "El Kanemi Hostel"},
  {from:"El Kanemi Hostel", to: "Amina Hostel"},
  {from:"Amina Hostel", to: "Kofo Ademola Hostel"},
  {from:"Kofo Ademola Hostel", to: "Biobaku Hostel"},
  {from:"Biobaku Hostel", to: "First Bank"},
  {from:"First Bank", to: "ISL, Unilag"},
  {from:"ISL, Unilag", to: "Distance Learning Institute (DLI)"},
  {from: "Distance Learning Institute (DLI)", to: "Nurudeen Alao Auditorium"},
  {from: "Distance Learning Institute (DLI)", to: "Unilag Women Society Hostel (ULWS)"},
  {from:"Unilag Women Society Hostel (ULWS)", to: "Honours Hostel"},
  {from:"First Bank", to: "Second Gate"},



  {from:"First Gate", to: "Wema Bank"},
  {from:"Wema Bank", to: "Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)"},
  {from:"Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)", to: "Sports Center"},
  {from:"Sports Center", to: "Unilag Amphitheatre"},
  {from:"Sports Center", to: "Access Bank"},
  {from:"Access Bank", to: "New Hall Shopping Complex"},
  {from:"Access Bank", to: "Nithub"},
  {from:"Access Bank", to: "Faculty of Social Sciences"},
  {from:"Faculty of Social Sciences", to: "First Bank"},


  {from:"Sports Center", to: "Unilag Amphitheatre"},

  {from:"First Gate", to: "Faculty of Environmental Sciences"},
  {from:"Faculty of Environmental Sciences", to:"St. Thomas More Catholic Chaplaincy"},
  {from:"St. Thomas More Catholic Chaplaincy", to: "Chapel of Christ Church"},
  {from:"Chapel of Christ Church", to: "Unilag Central Mosque"},
  {from:"Unilag Central Mosque", to: "New Hall"},
  {from:"New Hall", to: "Makama Hostel"},
  {from:"Makama Hostel", to: "Fagunwa Hostel"},
  {from:"Fagunwa Hostel", to: "Madam Tinubu Hostel (MTH)"},
  {from:"New Hall", to: "Sodeinde Hostel"},
  {from:"Sodeinde Hostel", to: "Eni Njoku Hostel"},
  {from:"New Hall", to: "Faculty of Arts"},
  

  {from:"New Hall Shopping Complex", to: "Unilag Microfinance Bank"},
  {from:"Unilag Microfinance Bank", to: "Afe Babalola Auditorium"},
  {from:"Afe Babalola Auditorium", to: "Campus Cab Park"},
  {from:"Campus Cab Park", to: "Moremi Hostel"},
  {from:"Campus Cab Park", to: "Mariere Hostel"},
  {from:"Campus Cab Park", to: "Unilag DSA Building"},
  {from:"Unilag DSA Building", to: "GTB Bank"},
  {from:"GTB Bank", to: "King Jaja Hostel"},
  {from:"King Jaja Hostel", to: "Faculty of Science"},
  {from:"King Jaja Hostel", to: "Unilag Health Centre"},
  {from:"Unilag Health Centre", to: "Scholars Suites"},
  {from:"Scholars Suites", to: "Ozolua BQs"},
  {from:"Ozolua BQs", to: "Ozolua BQs"},
  {from:"Scholars Suites", to: "Distance Learning Institute (DLI)"},

  {from:"Campus Cab Park", to: "Faculty of Engineering"},
  {from:"Campus Cab Park", to: "Senate Building"},
  {from:"Faculty of Engineering", to: "Julius Berger Hall"},
  {from:"Faculty of Engineering", to:  "J.F. Ade Ajayi Auditorium (Main Auditorium)"},
  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Faculty of Law"},
  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Main Library"},
  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Senate Building"},
  {from:"Main Library", to: "Faculty of Management Sciences"},
  {from:"Main Library", to: "UBA Bank"},
  {from:"Main Library", to: "Lagoon Front"},
  {from:"Faculty of Management Sciences", to: "Faculty of Law"},
  {from:"Faculty of Management Sciences", to: "Unilag Guest House"},
  {from:"Faculty of Management Sciences", to: "Lagoon Front"},
  {from:"Unilag Guest House", to: "Tayo Aderinokun Lecture Theatre"},
  {from:"Unilag Guest House", to: "Lagoon Front"},
]

for (const edge of edges){
  const fromLocation = locationsCoordinates.find(location => location.location === edge.from)
  const toLocation = locationsCoordinates.find(location =>location.location === edge.to)
  if(fromLocation &&  toLocation){
    const distance = haversineDistance([fromLocation.latitude, fromLocation.longitude], [toLocation.latitude, toLocation.longitude])
    addEdgeToGraph(graph, fromLocation.location, toLocation.location, distance)
  }
  else{
    console.log(`No location found from ${edge.from} to ${edge.to}`)
  }
} 

export default graph
const result = findShortestPath(graph, "First Gate", "Kofo Ademola Hostel");
console.log("Shortest path from First Gate to Kofo Ademola Hostel:", result?.path);
console.log("Total distance:", result?.distance, "km");