import React from 'react'

export default function Links(props) {
  return (
    <div>
        <a
            style={{backgroundColor: 'black', height:'30%', width:'15%', position: 'absolute', top:'51%', left:'2%', opacity:'0%', cursor:'pointer'}}
            onMouseEnter={() =>{props.UpdateBackground("PN")}}
            onMouseLeave={() =>{props.UpdateBackground("BG")}} key='patreon'
            href="https://www.patreon.com/grouchland"
            target="_blank"
        >

        </a>
        <a
            style={{backgroundColor: 'black', height:'50%', width:'15%', position: 'absolute', top:'54%', left:'40%', opacity:'0%', cursor:'pointer'}}
            onMouseEnter={() =>{props.UpdateBackground("TJ")}}
            onMouseLeave={() =>{props.UpdateBackground("BG")}} key='thunderjumper'
            href="https://store.steampowered.com/app/2588240/Thunder_Jumper/"
            target="_blank"
            
        >
            
        </a>
        <a
            style={{backgroundColor: 'black', height:'28%', width:'18%', position: 'absolute', top:'62%', left:'77%', opacity:'0%', cursor:'pointer'}}
            onMouseEnter={() =>{props.UpdateBackground("YT")}}
            onMouseLeave={() =>{props.UpdateBackground("BG")}} key='youtube'
            href="https://www.youtube.com/@HeyGrouch"
            target="_blank"
        >
            
        </a>
    </div>
  )
}
