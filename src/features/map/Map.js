import React, { useState } from 'react';
import MapView from '../components/GoogleMap'
import Card from '@material-ui/core/Card';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

export function Map() {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });
    
    
    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      console.log(coordinates)
      setAddress(value);
      setCoordinates(latLng);
    };
  
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
            <Box display="flex" p={1} height='100vh'>
                <Card raised={true} style={{ height: '100%', width: '20vh', textAlign:'center', paddingTop: '1.5vh', fontWeight:'bold'}}>
                    F I N D E R R
                    <div style ={{paddingTop: '1.5vh'}}>
                        <PlacesAutocomplete
                            value={address}
                            onChange={setAddress}
                            onSelect={handleSelect}
                        >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                            <input {...getInputProps({ placeholder: "Type address" })} />
                
                            <div>
                                {loading ? <div style={{fontWeight: 'light', fontSize: '8px'}}>l o a d i n g</div> : null}
                
                                {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                };
                
                                return (
                                    <div style={{fontSize: '8px', paddingBottom: '5px'}} {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                        <Divider />
                                    </div>
                                );
                                })}
                            </div>
                            </div>
                        )}
                        </PlacesAutocomplete>
                    </div>
                    </Card>
          
            </Box>
            <Box p={1} width="100%" height='100vh' >
            <MapView 
                coordinates={coordinates}
            />
            </Box>
        </Box>
          
           
        </div>
    );
}
