import React from 'react'
import { useState } from 'react';

export default function Edit(props) {

    const [server, setServer] = useState({
        "id": props.id,
        "name": props.name,
        "ip": props.ip,
        "location": props.location,
        "map": props.map,
        "gps": props.gps
    })

    function Save() {
        props.close();
        var gpsObj = ToGpsJSONFromText(server.gps)

        //hacky solution because setserver wasn't working
        var serverFinal = {
            "id": server.id,
            "name": server.name,
            "ip": server.ip,
            "location": server.location,
            "map": server.map,
            "gps": gpsObj
        }

        //console.log(serverFinal);
        props.Save(serverFinal);
      }
    //convert from string to gps
    function ToGpsJSONFromText(str)
    {
        var gpsArray = str.split(", ");
        if (gpsArray.length > 2 || gpsArray.length < 2) console.log("Error parsing server save.");
        return props.ToGpsJSONFromPoint(gpsArray[0], gpsArray[1]);
    }

  return (

    <div class="Delete-Pop-Up-Wrapper">
        <div class="Delete-Pop-Up">
            <ul class="Server-Header Server-Header-PU">
                <li>Name</li>
                <li>IP</li>
                <li>Location</li>
                <li>Gps</li>
            </ul>
            <div class="Browser-Pop-Up">
                <ul class="Server Server-PU">
                    <li><div contentEditable="true"  suppressContentEditableWarning={true} onInput={(e) => setServer({...server, name: e.target.innerText})}>{props.name}</div></li>
                    <li><div contentEditable="true"  suppressContentEditableWarning={true} onInput={(e) => setServer({...server, ip: e.target.innerText})}>{props.ip}</div></li>
                    <li><div contentEditable="true" suppressContentEditableWarning={true} onInput={(e) => setServer({...server, location: e.target.innerText})}>{props.location}</div></li>
                    <li><div contentEditable="true" suppressContentEditableWarning={true} onInput={(e) => setServer({...server, gps: e.target.innerText})}>{props.gps}</div></li>
                </ul>
            </div>
            <button class="Button-PU Button-PU-Yes" onClick={Save}>Save</button>
            <button class="Button-PU Button-PU-No" onClick={props.close}>Cancel</button>
        </div>
  </div>
  )
}
