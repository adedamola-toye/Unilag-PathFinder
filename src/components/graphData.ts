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

export const edges =[
  {from:"First Gate", to: "Faculty of Education", instruction:"From First Gate, turn at the first turning by the right, walk down to Faculty of Education"},
  {from:"Faculty of Education", to: "El Kanemi Hostel", instruction: "Turn left at Faculty of Education and walk towards El Kanemi Hostel"},
  {from:"El Kanemi Hostel", to: "Amina Hostel", instruction: "Walk straight down from El Kanemi Hostel. To the right of the road is Amina Hostel"},
  {from:"Amina Hostel", to: "Kofo Ademola Hostel", instruction: "Opposite Amina Hostel is Kofo Ademola Hostel"},
  {from:"Kofo Ademola Hostel", to: "Biobaku Hostel", instruction: "Walk straight down and turn right. Then walk straight down and Biobaku Hostel is to the left"},
  {from:"Biobaku Hostel", to: "First Bank", instruction:"Head southwest from Biobaku hostel. Then turn left and walk striaght down to First Bank to your left"},
  {from:"First Bank", to: "ISL, Unilag", instruction: "From First Bank walk straight down (at the north) towards ISL Unilag. ISL Unilag is to the right "},
  {from:"ISL, Unilag", to: "Distance Learning Institute (DLI)", instruction: "From ISL Unilag, walk straight down into the  Distance Learning Institute (DLI) compound"},
  {from: "Distance Learning Institute (DLI)", to: "Nurudeen Alao Auditorium" , instruction: "On entering the Distance Learning Institute (DLI) compound, to your right is the Nurudeen Alao Auditorium"},
  {from: "Distance Learning Institute (DLI)", to: "Unilag Women Society Hostel (ULWS)", instruction: "Outside DLI facing the road, turn left and walk staright down to Unilag Women Society Hostel (ULWS) Hostel to the left"},
  {from:"Unilag Women Society Hostel (ULWS)", to: "Honours Hostel" , instructions: "Beside Unilag Women Society Hostel (ULWS) is  Honours Hostel"},
  {from:"First Bank", to: "Second Gate", instruction: "From First Bank, turn Left at the other side of the road and walk straight to Second Gate"},



  {from:"First Gate", to: "Wema Bank", instruction: "From First Gate, walk straight down to Wema Bank at the right side of the road"},
 /*  {from: "First Gate", to:"Sports Center", instruction: "From First Gate, walk straight north to Sports Center at the right side of the road"}, */
  {from:"Wema Bank", to: "Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)", instruction: "Beside Wema Bank is Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)"},
  {from:"Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)", to: "Sports Center", instructions: "From Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall), walk straight down to Sports Center"},
  {from:"Sports Center", to: "Unilag Amphitheatre", instruction: "From Sport Center, walk straight north to the Sport Center Shopping Complex Compound. The Amphitheatre is in this compound"},
  {from:"Sports Center", to: "Access Bank", instruction: "From Sports Center walk straight down to Access Bank (the right side of the road)"},
  {from:"Access Bank", to: "New Hall Shopping Complex", instruction: " From Access Bank walk straight north New Hall Shopping Complex"},
  {from:"Access Bank", to: "Nithub", instruction:"Before getting to Access Bank, turn right and walk straight down to Nithub (at the right side of the road)"},
  {from:"Access Bank", to: "Faculty of Social Sciences", instruction:"Before getting to Access Bank, turn right and walk straight down to Faculty of Social Sciences(to the right saide of the road)"},
  {from:"Faculty of Social Sciences", to: "First Bank", instruction:"From Faculty of Social Sciences, walk straight down to First Bank"},
  {from:"Nithub", to: "Faculty of Social Sciences", instruction:"From Nithub, walk straight down to Faculty of Social Sciences"},


  {from:"First Gate", to: "Faculty of Environmental Sciences", instruction:" From First Gate, walk straight down to Faculty of Environmental Sciences(at your left)"},
  {from:"Faculty of Environmental Sciences", to:"St. Thomas More Catholic Chaplaincy", instruction: "From Faculty of Environmental Sciences, walk straight down to St. Thomas More Catholic Chaplaincy(to your left)"},
  {from:"St. Thomas More Catholic Chaplaincy", to: "Chapel of Christ Church", instruction: "Beside St. Thomas More Catholic Chaplaincy is the Chapel of Christ Church"},
  {from:"Chapel of Christ Church", to: "Unilag Central Mosque", instruction:"Beside Chapel of Christ Church is the Unilag Central Mosque"},
  {from:"Unilag Central Mosque", to: "New Hall", instruction:"From Unilag Central Mosque,walk straight down to New Hall"},
  {from:"New Hall", to: "Makama Hostel", instruction:"Walk straight into New Hall, turn right to Makama Hostel"},
  {from:"Makama Hostel", to: "Fagunwa Hostel", instruction: "Before turning right to Makama Hostel, walk straight down to Fagunwa Hostel"},
  {from:"Fagunwa Hostel", to: "Madam Tinubu Hostel (MTH)", instruction:"Madam Tinubu Hostel (MTH) is beside Fagunwa Hostel"},
  {from:"New Hall", to: "Sodeinde Hostel", instruction:"Walk Straight into New Hall, turn right and walk staright down to Sodeinde Hostel after Makama Hostel"},
  {from:"Sodeinde Hostel", to: "Eni Njoku Hostel", instruction:"Beside Sodeinde Hostel is Eni Njoku Hostel"},
  {from:"New Hall", to: "Faculty of Arts", instruction: "Outside New Hall, walk straight down to Faculty of Arts to you left"},
  

  {from:"New Hall Shopping Complex", to: "Unilag Microfinance Bank", instruction:"Outside New Hall Shopping Complex walk straight down to Unilag Microfinance Bank (at your left)"},
  {from:"Unilag Microfinance Bank", to: "Afe Babalola Auditorium",instruction:"From Unilag Microfinance Bank, walk straight down to Afe Babalola Auditorium (at your left)" },
  {from:"Afe Babalola Auditorium", to: "Campus Cab Park", instruction: "After Afe Babalola Auditorium, turn right and walk straight down to the Campus Cab Park(to your left)"},
  {from:"Campus Cab Park", to: "Moremi Hostel", instruction: "Opposite Campus Cab Park is Moremi Hostel"},
  {from:"Campus Cab Park", to: "Mariere Hostel", instruction:"Beside Campus Cab Park is Mariere Hostel"},
  {from:"Mariere Hostel", to: "Senate Building", instruction: "From Mariere Hostel, walk straight down, go down the stairs, walk staright down and turn left to Senate Building"},
  {from:"Campus Cab Park", to: "Unilag DSA Building", instruction:"Opposite Campus Cab park, beside Moremi is the Unilag DSA Building"},
  
  {from:"Unilag DSA Building", to: "GTB Bank", instruction:"GTB Bank is opposite Unilag DSA Building is "},
  {from:"Campus Cab Park", to: "GTB Bank", instruction: "At Campus Cab Park turn right and walk down to GTB Bank"},
  {from:"GTB Bank", to: "Zenith Bank", instruction: "Zenith Bank is beside GTB Bank"},
  {from:"Zenith Bank", to: "King Jaja Hostel", instruction: "From Zenith Bank, walk straight down to Jaja Hostel"},

  {from:"King Jaja Hostel", to: "Faculty of Science", instruction:"From Jaja Hostel, walk straight down and turn left to Faculty of Science"},
  {from: "Faculty of Science", to: "J.F. Ade Ajayi Auditorium (Main Auditorium)", instruction: "From faculty of science , walk straight down to Jaja Hostel and turn right. Then walk down to Mariere Hostel and turn right. Walk straight down to J.F. Ade Ajayi Auditorium (Main Auditorium)"},
  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Faculty of Engineering", instruction: "Turn right into Faculty of Engineering"},
  {from:"King Jaja Hostel", to: "Unilag DSA Building", instruction:"From Jaja Hostel turn right. On the other side of the road is the Unilag DSA Building"},
  {from:"Unilag DSA Building", to: "Unilag Health Centre", instruction:"Walk straight down and turn right and walk straight down and turn right to Unilag Health Center"},
  {from:"Unilag DSA Building", to: "Scholars Suites", instruction:"From Unilag DSA Building, walk straight down to Scholars Suites"},
  {from:"Scholars Suites", to: "Ozolua BQs", instruction:"From Scholars Suites, turn right and walk straight down and turn left to Ozolua BQ"},
  
  {from:"Scholars Suites", to: "Distance Learning Institute (DLI)", instruction: "From Scholars Suites, head north and then turn left. At the roundabout, turn left and slightly right onto DLI "},

  {from:"Campus Cab Park", to: "Faculty of Engineering", instruction: "From Campus Cab Park, walk towards Mariere and go straight north. Go down the stairs and walk straight north. To the second right is Faculty of Engineering"},
  {from:"Campus Cab Park", to: "J.F. Ade Ajayi Auditorium (Main Auditorium)", instruction: "From Campus Cab Park, walk towards Mariere and go straight north. Go down the stairs and walk straight north to J.F. Ade Ajayi Auditorium (Main Auditorium)"},
  {from: "Campus Cab Park", to: "Senate Building", instruction:"From Campus Cab Park, walk towards Mariere and go straight north. Go down the stairs and walk straight north.Then turn left to Senate Building"},
  {from:"Faculty of Engineering", to: "Julius Berger Hall", instruction:"From Faculty of Engineering, turn left and walk north. Then turn left just before the stairs near Mariere"},
  {from:"Faculty of Engineering", to:  "J.F. Ade Ajayi Auditorium (Main Auditorium)", instruction: "Opposite Faculty of Engineering is J.F. Ade Ajayi Auditorium (Main Auditorium) "},
  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Faculty of Law", instruction:"From J.F. Ade Ajayi Auditorium (Main Auditorium), walk north to Faculty of Law"},
  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Main Library", instruction: "Outside J.F. Ade Ajayi Auditorium (Main Auditorium) entrance, climb the stairs to Main Library (at your left)"},
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