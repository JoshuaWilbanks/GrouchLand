import React from 'react'
import ColorWheel from '../Images/colorwheel.png';
import '../Css/ColorPicker.css'
import { useState, useEffect } from 'react';
import { SketchPicker as Picker } from 'react-color';

export default function ColorPicker(props) {

    const [color, setColor] = useState(props.color);

    function saveColor(color) {
        props.setColor(color);
    }

  return (
    <div class={props.class}>
        <div class="TextBackground" style={{backgroundColor: color}}><h1 style={{color: color}} className="InvertColor Text">{props.name}</h1></div>
        <Picker width='10vw' presetColors={[]} color={color} onChange={setColor} onChangeComplete={(color) => saveColor(color.hex)}/>

    </div>
  )
}
