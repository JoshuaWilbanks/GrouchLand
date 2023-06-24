import React from 'react';
import On from '../Images/lightbulb_on.png';
import Off from '../Images/lightbulb_off.png';
import '../Css/Switches.css';

export default function LightSwitch(props) {
  return (
    <div>
        {!props.lightsOn ?
            <img src={On} class="LightSwitch" onClick={props.toggleLights}/>
        :
            <img src={Off} class="LightSwitch" onClick={props.toggleLights}/>
        }
    </div>
  )
}
