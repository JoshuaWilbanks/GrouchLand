import React, { useEffect, useState } from 'react'
import Server from './Server'
import '../Css/Browser.css';
import axios from 'axios';
import {Textfit} from 'react-textfit';
import Pip from '../Images/Single_Pip.png';

export default function Browser(props) {

  //call database to create new server record
  function addServer() {
    axios.post(props.url + "Server/CreateServer", props.defaultObj)
    .then((response) => {
      props.LogAxios(response);
      props.GetAllServers();
    })
    .catch((error) => {
      props.LogAxios(error.response);
    })
  }
  
  //get the gps coord as a string from the data json
  function getGpsString(data)
  {
    return "" + data.gps.coordinates[0] + ", " + data.gps.coordinates[1];
  }

  return (
    <div>
      <div class="BrowserWrapper">
        <div class="Browser" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <img src={Pip} style={{width:'8%'}}/>
          <div style={{width:'90vw', flexGrow:'10', marginLeft:'-10%'}}>
            <ul class="Server-Header">
                <li>Name</li>
                <li>IP</li>
                <li>Location</li>
                <li>Players</li>
                <li>Map</li>
                {/*if in editor mode, replace connect button with gps location. Saves the trouble of reformatting the table, and connect button is useless in edit mode anyways */}
                {!props.editorMode ? <li>Connect</li> : <li>GPS</li>  }
            </ul>
            
            {/*Data retrieved from database. Iterate through each server record in database and display them.*/}
            {props.servers.map((data) => {
              return(
                <div>
                  <hr />
                  <Server GetAllServers={props.GetAllServers} id={data.id} name={data.name} ip={data.ip} location={data.location} map={data.map} gps={getGpsString(data)} playerCount={data.players} editorMode={props.editorMode} LogAxios={props.LogAxios} PopUpActive={props.PopUpActive} url={props.url} ToGpsJSONFromPoint={props.ToGpsJSONFromPoint} color={props.color}/>
                </div>
              )
            })}
          </div>
        {
          props.editorMode ? 
            <div class="Browser-Button" onClick={addServer}>
                add server
            </div>
          : null
        }
        <img src={Pip} style={{width:'8%', marginLeft:'-10%'}}/>
        </div>
      </div>
    </div>
  )
}

//<li>Players</li>