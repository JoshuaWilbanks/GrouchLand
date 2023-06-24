import React from 'react'
import '../Css/Pop-Ups.css'

export default function Delete(props) {

  function Confirmed() {
    props.close();
    props.Delete();
  }

  return (
    <div class="Delete-Pop-Up-Wrapper">
      <div class="Delete-Pop-Up">
        <p>Are you certain you would like to delete this server?</p>
        
        <div class="Browser-Pop-Up">
          <ul class="Server Server-PU">
            <li><div>{props.name}</div></li>
            <li><div>{props.ip}</div></li>
            <li><div>{props.location}</div></li> 
            <li><div>{props.gps}</div></li> 
          </ul>
        </div>

        <button class="Button-PU Button-PU-Yes" onClick={Confirmed}>Yes</button>
        <button class="Button-PU Button-PU-No" onClick={props.close}>No</button>
      </div>
    </div>
  )
}
