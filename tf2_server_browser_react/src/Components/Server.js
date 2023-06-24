import React, { useState } from 'react'
import '../Css/Browser.css'
import trash from '../Images/trash.png'
import pencil from '../Images/pencil.png'
import Popup from 'reactjs-popup';
import Delete from './Delete';
import axios from 'axios';
import Edit from './Edit';

export default function Server(props) {

  //delete server
  function DeleteServer() {
    axios.delete(props.url + "Server/Delete/" + props.id)
    .then((response) => {
      props.LogAxios(response);
      props.GetAllServers();
    })
    .catch((error) => {
      props.LogAxios(error);
    })
  }

  //update server
  function SaveServer(server) {

    axios.post(props.url + "Server/EditServer", server)
    .then((response) => {
      props.LogAxios(response);
      props.GetAllServers();
    })
    .catch((error) => {
      props.LogAxios(error);
    })
  }
  return (
    <div class="Server-Wrapper">
      <ul class="Server">
          <li>{props.name}</li>
          <li>{props.ip}</li>
          <li>{props.location}</li>
          <li>{props.playerCount}</li>
          <li>{props.map}</li>
          {/*if in editor mode, replace connect button with gps location. Saves the trouble of reformatting the table, and connect button is useless in edit mode anyways */}
          {!props.editorMode ?
          <li>
              <div>
                <a href={"steam://connect/" + props.ip + ":27015"} target="_blank" rel="noreferrer">
                  <button class="Connect">Connect</button>
                </a>
              </div>
          </li>
          :
          <li><div class="GPS">{props.gps}</div></li>
          }
      </ul>
            
      {
        props.editorMode ? 
          <div class="Server-Icon-Wrapper" style={{height:'5px'}}>
            <div style={{position: 'absolute', width:'inherit', display:'flex', flexDirection:'row', left:'3vw', alignContent: 'center'}}>
              <Popup
                trigger={<img src={trash} alt="Delete" width="100%" class="Server-Icon" style={{backgroundColor: "#" + props.color}}/>}
                position="center"
                closeOnDocumentClick
                modal
                onClose={props.PopUpActive}
                onOpen={props.PopUpActive}
              >
                {close => (<Delete close={close} name={props.name} ip={props.ip} location={props.location} map={props.map} playerCount={props.players} gps={props.gps} Delete={DeleteServer}/>)}
              </Popup>
              <Popup
                trigger={<img src={pencil} alt="Edit" width="100%" class="Server-Icon"  style={{backgroundColor: "#" + props.color}}/>}
                position="center"
                closeOnDocumentClick
                modal
                onClose={props.PopUpActive}
                onOpen={props.PopUpActive}
                
              >
                {close => (<Edit close={close} id={props.id} name={props.name} ip={props.ip} location={props.location} map={props.map} gps={props.gps} playerCount={props.players} Save={SaveServer} ToGpsJSONFromPoint={props.ToGpsJSONFromPoint}/>)}
              </Popup>
            </div>
          </div>
        : null
      }
    </div>
  )
}

//<li><div>{props.playerCount}/24</div></li>
        