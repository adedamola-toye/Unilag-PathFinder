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
  {from:"First Gate", to: "Faculty of Education", instruction:["From First Gate, turn at the first turning by the right, walk down to Faculty of Education", "From Faculty of Education, walk straight down to First Gate"]},

  {from:"Faculty of Education", to: "El Kanemi Hostel", instruction:["Turn left at Faculty of Education and walk towards El Kanemi Hostel", "From El Kanemi Hostel walk  towards Faculty of Education"]},

  {from:"El Kanemi Hostel", to: "Amina Hostel", instruction: ["Walk straight north from El Kanemi Hostel. To the right of the road is Amina Hostel.", "From Amina Hostel,walk straight down to Elkanemi Hostel"]},


  {from:"Amina Hostel", to: "Kofo Ademola Hostel", instruction: ["Opposite Amina Hostel is Kofo Ademola Hostel", "Opposite Kofo Ademola Hostel is Amina Hostel"]},

  {from:"Kofo Ademola Hostel", to: "Biobaku Hostel", instruction: ["Walk straight down and turn right. Then walk straight down and Biobaku Hostel is to the left", "From Biobaku, turn left and walk straight down to Kofo Ademola Hostel"]},

  {from:"Biobaku Hostel", to: "First Bank", instruction:["Head southwest from Biobaku hostel. Then turn left and walk striaght down to First Bank to your left", "From First Bank, walk straight down and turn right to Biobaku Hostel"]},

  {from:"First Bank", to: "ISL, Unilag", instruction: ["From First Bank walk straight down (at the north) towards ISL Unilag. ISL Unilag is to the right ", "From ISL, Unilag walk straight down to First Bank"]},

  {from:"ISL, Unilag", to: "Distance Learning Institute (DLI)", instruction: ["From ISL Unilag, walk straight down into the  Distance Learning Institute (DLI) compound", "From Distance Learning Institute (DLI) walk straight down to ISL, Unilag"]},

  {from: "Distance Learning Institute (DLI)", to: "Nurudeen Alao Auditorium" , instruction: ["On entering the Distance Learning Institute (DLI) compound, to your right is the Nurudeen Alao Auditorium", "Nurudeen Alao Auditorium is in DLI so you are still within the DLI compound"]},

  {from: "Distance Learning Institute (DLI)", to: "Unilag Women Society Hostel (ULWS)", instruction: ["Outside DLI facing the road, turn left and walk staright down to Unilag Women Society Hostel (ULWS) Hostel to the left", "From Unilag Women Society, walk back to Distance Learning Institute (DLI)"]},

  {from:"Unilag Women Society Hostel (ULWS)", to: "Honours Hostel" , instructions: ["Beside Unilag Women Society Hostel (ULWS) is  Honours Hostel", "Beside Honours Hostel is Unilag Women Society Hostel (ULWS)"]},

  {from:"First Bank", to: "Second Gate", instruction: ["From First Bank, turn Left at the other side of the road and walk straight to Second Gate", "Turn right at Unilag Second Gate and walk straight to first bank"]},



  {from:"First Gate", to: "Wema Bank", instruction: ["From First Gate, walk straight down to Wema Bank at the right side of the road", "From Wema Bank, walk back to First Gate"]},
 /*  {from: "First Gate", to:"Sports Center", instruction: "From First Gate, walk straight north to Sports Center at the right side of the road"}, */

  {from:"Wema Bank", to: "Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)", instruction: ["Beside Wema Bank is Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)", "Beside Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall) is Wema Bank"]},

  {from:"Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)", to: "Sports Center", instructions:["From Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall), walk straight down to Sports Center", "From Sports Center walk down to Jelili Adebisi Omotola Hall (Unilag Multipurpose Hall)"]},


  {from:"Sports Center", to: "Unilag Amphitheatre", instruction: ["From Sport Center, walk straight north to the Sport Center Shopping Complex Compound. The Amphitheatre is in this compound", "From Unilag Amphitheatre, walk out of the Sport Center Shopping Complex Compound and walk back to Sports Center"]},


  {from:"Sports Center", to: "Access Bank", instruction: ["From Sports Center walk straight down to Access Bank (the right side of the road)", "From Access  Bank, walk down to Sports  Center",]},

  {from:"Access Bank", to: "New Hall Shopping Complex", instruction: ["From Access Bank walk straight north New Hall Shopping Complex", "From New Hall Shopping Complex walk straight down to Access Bank"]},

  {from:"Access Bank", to: "Nithub", instruction:["Before getting to Access Bank, turn right and walk straight down to Nithub (at the right side of the road)", "From Nithub, walk back to Access Bank"]},

  {from:"Access Bank", to: "Faculty of Social Sciences", instruction:["Before getting to Access Bank, turn right and walk straight down to Faculty of Social Sciences(to the right saide of the road)", "From Faculty of Social Sciences, walk back to Access Bank"]},

  {from:"Faculty of Social Sciences", to: "First Bank", instruction:["From Faculty of Social Sciences, walk straight down to First Bank", "From First Bank, walk straight back to Faculty of Social Sciences"]},


  {from:"Nithub", to: "Faculty of Social Sciences", instruction:["From Nithub, walk straight down to Faculty of Social Sciences", "From Faculty of Social Sciences, walk back to Nithub"]},


  {from:"First Gate", to: "Faculty of Environmental Sciences", instruction:[" From First Gate, walk straight down to Faculty of Environmental Sciences(at your left)", "From Faculty of Environmental Sciences, walk down to First Gate"]},

  {from:"Faculty of Environmental Sciences", to:"St. Thomas More Catholic Chaplaincy", instruction: ["From Faculty of Environmental Sciences, walk straight down to St. Thomas More Catholic Chaplaincy(to your left)", "From St. Thomas More Catholic Chaplaincy, walk down to Faculty of Environmental Sciences"]},

  {from:"St. Thomas More Catholic Chaplaincy", to: "Chapel of Christ Church", instruction: ["Beside St. Thomas More Catholic Chaplaincy is the Chapel of Christ Church", "Beside Chapel of Christ Church  to St. Thomas More Catholic Chaplaincy"]},

  {from:"Chapel of Christ Church", to: "Unilag Central Mosque", instruction: ["Beside Chapel of Christ Church is the Unilag Central Mosque", "Beside Unilag Central Mosque is the Chapel of Christ Church"]},

  {from:"Unilag Central Mosque", to: "New Hall", instruction:["From Unilag Central Mosque,walk straight down to New Hall", "From New Hall, walk down to Unilag Central Mosque"]},

  {from:"New Hall", to: "Makama Hostel", instruction:["Walk straight into New Hall, turn right to Makama Hostel", "From Makama Hostel, walk out of the New Hall"]},

  {from:"Makama Hostel", to: "Fagunwa Hostel", instruction: ["Before turning right to Makama Hostel, walk straight down to Fagunwa Hostel", "From Makama Hostel, walk to Fagunwa Hostel"]},

  {from:"Fagunwa Hostel", to: "Madam Tinubu Hostel (MTH)", instruction:["Madam Tinubu Hostel (MTH) is beside Fagunwa Hostel", "Fagunwa Hostel is beside Madam Tinubu Hostel (MTH)"]},

  {from:"New Hall", to: "Sodeinde Hostel", instruction: ["Walk Straight into New Hall, turn right and walk straight down to Sodeinde Hostel after Makama Hostel", "From Sodeinde Hostel,  walk back out of New Hall"]},

  {from:"Sodeinde Hostel", to: "Eni Njoku Hostel", instruction:["Beside Sodeinde Hostel is Eni Njoku Hostel", "Beside Eni Njoku Hostel is Sodeinde Hostel"]},

  {from:"New Hall", to: "Faculty of Arts", instruction: ["Outside New Hall, walk straight down to Faculty of Arts to you left", "From Faculty of Arts, walk back to New Hall"]},
  
  {from:"New Hall", to: "Center for Information and Technology System (CITS)", instruction: ["From New Hall, walk straight down to to CITS", "From CITS walk down New Hall", "From CITS, walk straight down to New Hall"]},



  {from:"Center for Information and Technology System (CITS)", to: "Campus Cab Park", instruction: ["From CITS, walk straight down and make the first turning at your right to Campus", "From Campus Cab Park, walk down to CITS"]},

  {from:"New Hall Shopping Complex", to: "Unilag Microfinance Bank", instruction:["Outside New Hall Shopping Complex walk straight down to Unilag Microfinance Bank (at your left)", "From Unilag Microfinance Bank, walk down to New Hall"]},

  {from:"Unilag Microfinance Bank", to: "Afe Babalola Auditorium",instruction: ["From Unilag Microfinance Bank, walk straight down to Afe Babalola Auditorium (at your left)", "From Afe Babalola Auditorium, walk back to Unilag Microfinance Bank"] },

  {from:"Campus Cab Park", to: "Moremi Hostel", instruction: ["Opposite Campus Cab Park is Moremi Hostel", "Opposite Moremi Hostel is Campus Cab Park"]},

  {from:"Campus Cab Park", to: "Mariere Hostel", instruction: ["Beside Campus Cab Park is Mariere Hostel", "Campus Cab Park is beside Mariere Hostel"]},


  {from:"Mariere Hostel", to: "Senate Building", instruction: ["From Mariere Hostel, walk straight down, go down the stairs, walk staright down and turn left to Senate Building", "From Senate Building, turn left walk straight and turn right. Walk  straight down to the stairs. Climb the stairs and walk towards Mariere Hostel"]},

  {from:"Mariere Hostel", to: "J.F. Ade Ajayi Auditorium (Main Auditorium)", instruction: ["From Mariere Hostel, walk straight down, go down the stairs, walk straight down towards J.F. Ade Ajayi Auditorium (Main Auditorium)", "From J.F. Ade Ajayi Auditorium (Main Auditorium) walk straight down towards Mariere Hostel"]},

  {from:"Campus Cab Park", to: "Unilag DSA Building", instruction:["Opposite Campus Cab park, beside Moremi is the Unilag DSA Building", "Campus Cab Park is opposite Unilag DSA Building"]},
  
  {from:"Unilag DSA Building", to: "GTB Bank", instruction:["GTB Bank is opposite Unilag DSA Building, beside Campus Cab Park", "Unilag DSA Building is opposite GTB Bank"]},

  {from:"Campus Cab Park", to: "GTB Bank", instruction: ["At Campus Cab Park turn right and walk down to GTB Bank", "Campus Cab Park is beside GTB Bank"]},

  {from:"GTB Bank", to: "Zenith Bank", instruction: ["Zenith Bank is beside GTB Bank", "GTB Bank is beside Zenith Bank"]},

  {from:"Zenith Bank", to: "King Jaja Hostel", instruction: ["From Zenith Bank, walk straight down to Jaja Hostel", "From Jaja Hostel, walk back to Zenith Bank"]},

  {from:"King Jaja Hostel", to: "Faculty of Science", instruction:["From Jaja Hostel, walk straight down and turn left to Faculty of Science", "From Faculty of Science, walk out towards Jaja Hostel"]},

  {from: "Mariere Hostel", to: "King Jaja Hostel", instruction: ["From Mariere Hostel , walk straight down towards King Jaja Hostel", "From King Jaja Hostel , walk down to Mariere Hostel"]},

  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Faculty of Engineering", instruction: ["From J.F. Ade Ajayi Auditorium (Main Auditorium), turn right into Faculty of Engineering", "From Faculty of Engineering, walk straight to J.F. Ade Ajayi Auditorium (Main Auditorium)"]},

  {from:"King Jaja Hostel", to: "Unilag DSA Building", instruction: ["From Jaja Hostel turn right. On the other side of the road is the Unilag DSA Building", "From Unilag DSA Building, cross to the Campus Cab Park and walk down towards Jaja Hostel"]},


  {from:"Unilag DSA Building", to: "Unilag Health Centre", instruction: ["Walk straight down and turn right and walk straight down and turn right to Unilag Health Center", "From Unilag Health Center, turn right and walk straight down towards Unilag DSA Building"]},


  {from:"Unilag DSA Building", to: "Scholars Suites", instruction:["From Unilag DSA Building, walk straight down to Scholars Suites", "From Scholar Suites, walk straight down to Unilag DSA Building (to you right)"]},

  {from:"Scholars Suites", to: "Ozolua BQs", instruction: ["From Scholars Suites, turn right and walk straight down and turn left to Ozolua BQ", "From Ozolua BQ, turn right and walk straight down to Scholars Suites"]},
  
  {from:"Scholars Suites", to: "Distance Learning Institute (DLI)", instruction: ["From Scholars Suites, head north and then turn left. At the roundabout, turn left and slightly right onto DLI ", "From Scholars Suites, walk straight down till you get to a roundabout. Then turn left towards DLI"]},

  {from:"Mariere", to: "Faculty of Engineering", instruction: ["From Mariere and go straight north. Go down the stairs and walk straight north. To the second right is Faculty of Engineering", "From Faculty of Engineering, turn left and walk up the stairs towards Mariere Hostel."]},

  {from:"Faculty of Engineering", to: "Julius Berger Hall", instruction: ["From Faculty of Engineering, turn left and walk north. Then turn left just before the stairs near Mariere", "From Julius Berger Hall, turn left and walk down. Then turn right towards Faculty of Engineering"]},

  {from:"Faculty of Engineering", to:  "J.F. Ade Ajayi Auditorium (Main Auditorium)", instruction: ["From Faculty of Engineering, cross the road towards J.F. Ade Ajayi Auditorium (Main Auditorium). Walk straight down a bit then turn right to the entrance", "From, J.F. Ade Ajayi Auditorium (Main Auditorium), cross the road to Faculty of Engineering"]},

  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Faculty of Law", instruction: ["From J.F. Ade Ajayi Auditorium (Main Auditorium), walk down to Faculty of Law", "From Faculty of Law, walk down to J.F. Ade Ajayi Auditorium (Main Auditorium)"]},

  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Main Library", instruction: ["Outside J.F. Ade Ajayi Auditorium (Main Auditorium) entrance, climb the stairs to Main Library (at your left)", "From Main Library, climb down the stairs to your right. Then walk to J.F. Ade Ajayi Auditorium (Main Auditorium)"]},

  {from:"J.F. Ade Ajayi Auditorium (Main Auditorium)", to: "Senate Building", instruction: ["From J.F. Ade Ajayi Auditorium (Main Auditorium), walk towards Senate Building", "From Senate Building, walk towards J.F. Ade Ajayi Auditorium (Main Auditorium)"]},

  {from:"Main Library", to: "Faculty of Management Sciences", instructions : ["From Main Library walk down to Faculty of Management Sciences", "From Faculty of Management Sciences walk towards Main Library"]},

  {from:"Main Library", to: "UBA Bank", instruction: ["From Main Library, turn left and walk down. Then turn right towards UBA Bank", "From UBA walk down and climb the stairs. Then turn right towards Main Library"]},

  {from:"Main Library", to: "Lagoon Front", instruction:["From Main Library, turn left and walk down. Then  walk straight down and turn right. Then walk towards Lagoon Front","From Lagoon Front, walk and turn left and walk straight down. Then turn right towards Main Library"]},

  {from:"Faculty of Management Sciences", to: "Faculty of Law", instruction: ["From Faculty of Management Sciences walk down to Faculty of Law", "From Fcaulty of Law, walk down to Faculty of Management Sciences"]},

  {from:"Faculty of Management Sciences", to: "Unilag Guest House", instruction:["From Faculty of Management Sciences, turn left and walk straight down thenturn right towards Unilag Guest House", "From Unilag Guest House, walk down and turn left then walk straight. Then turn right towards Faculty of Management Sciences"]},

  {from:"Unilag Guest House", to: "Lagoon Front", instructions:["From Unilag Guest House, walk straight then turn right towards Lagoon Front", "From Lagoon Front, walk down and turn left. Then walk down to Unilag Guest House"]},

  {from:"Unilag Guest House", to: "Tayo Aderinokun Lecture Theatre", instruction: ["From Unilag Guest House, walk down to Tayo Aderinokun Lecture Theatre", "From Tayo Aderinokun Lecture Theatre walk straight down to Unilag Guest House"]},

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