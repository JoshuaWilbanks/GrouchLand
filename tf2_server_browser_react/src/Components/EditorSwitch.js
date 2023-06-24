import React from 'react';
import On from '../Images/pencil_on.png';
import Off from '../Images/pencil_off.png';
import '../Css/Switches.css';

export default function EditorSwitch(props)  {
  return (
    <div>
        {!props.lightsOn ?
            <img src={On} class="EditorSwitch" onClick={() => props.toggleEditorMode(!props.editorMode)}/>
        :
            <img src={Off} class="EditorSwitch" onClick={() => props.toggleEditorMode(!props.editorMode)}/>
        }
    </div>
  )
}
