
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import L, { Icon } from "leaflet"

function Map(props){

    const [position, setPosition] = useState({})

    
    const custIcon = new L.Icon.Default();
    custIcon.options.shadowSize = [0, 0];

    function CustomState() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
    
        const map = useMap();
    
        useEffect(() => {
          map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom(), {animate: true, duration: 1.5});
            const radius = e.accuracy;
            const marker = L.marker(e.latlng, {icon: custIcon});
            marker.addTo(map).bindPopup("You");
            setBbox(e.bounds.toBBoxString().split(","));
          });
        }, [map]);
    
      }

    return(
        <div className='map'>
            <MapContainer center={[40.7128, -74.0060]} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {props.servers.map((data) =>
                    {
                        return(
                            <Marker position={[data.gps.coordinates[0], data.gps.coordinates[1]]} icon={custIcon}>
                                <Popup>
                                    {data.location} <br /> {data.ip}
                                </Popup>
                            </Marker>    
                        )
                    })}
                    <CustomState />
                </MapContainer>
        </div>
    )



}


export default Map;