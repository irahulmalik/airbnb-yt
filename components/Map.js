import React, { useState } from 'react';
import  getCenter  from 'geolib/es/getCenter';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

function Map({searchResults}) {
const [selectedLocation, setselectedLocation] = useState({});
    //transform search result object to our desired object
    const coordinates = searchResults.map(item => ({
        longitude: item.long,
        latitude: item.lat
    }));

    const center = getCenter(coordinates);


    const [viewPort, setViewPort]= useState({
        width:'100%',
        height:'100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom:11,
    });
    return (
        <ReactMapGL 
        mapStyle="mapbox://styles/raymalik07/cks7ku7d57omc17q66ybx1evu"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewPort}
        onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
        >
            {searchResults.map(result => (
                <div className="" key={result.long}>
                    <Marker
                        longitude={result.long}    
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p className="cursor-pointer text-2xl animate-bounce"
                        onClick={()=>setselectedLocation(result)}
                        aria-label="push-pin">📌</p>
                    </Marker>

                    {/* this is popup */}
                    {selectedLocation.long === result.long ? (
                        <Popup  
                        onClose={ () => setselectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                        )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
