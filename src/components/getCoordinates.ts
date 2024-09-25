
export const getCoordinates = async(locationName: string) => {
    try{
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`    
        );
        const data = await response.json();

        if(data.length > 0){
            return{
                latitude:data[0].lat,
                longitude: data[0].lon,
                displayName: data[0].display_name
            };
            
        }
        else{
            throw new Error("Location not found")
        }
    }
    catch(error){
        console.error("Error fetching coordinates: ", error);
        return null
    }
};