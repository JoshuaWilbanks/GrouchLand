import logo from './logo.svg';
import './App.css';
import Map from './Components/Map'
import Browser from './Components/Browser';
import patreonLogo from './Images/patreon.png'; 
import youtubeLogo from './Images/youtube.png';
import itchLogo from './Images/itch.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleLoginButton from './Components/GoogleLoginButton';
import LightSwitch from './Components/LightSwitch';
import EditorSwitch from './Components/EditorSwitch';
import ColorPicker from './Components/ColorPicker';
import './Css/ColorPicker.css'

function App() {
  //const url = "https://localhost:7250/";
  const url = "/API/";
  const debug = true;


  const ToGpsJSONFromPoint = (lat, long) => {
    return {
      "type": "Point",
      "coordinates": [
        parseFloat(lat),
        parseFloat(long)
      ]
    }
  }

  const defaultObj = 
  {
    "Name": "New Server",
    "Location": "Location",
    "Ip": "0.0.0.0",
    "Map": "surf_kitsune",
    "gps": ToGpsJSONFromPoint(35.227085, -80.843124)
  }

  //all the servers in the server browser
  const [servers, setServers] = useState([]);

  //can edit
  //start in false, set to true if cached as true and the user is authorized to edit (in useEffect)
  const [editorMode, setEditorMode] = useState(false);

  //when editing the server browser there are pop-ups. This keeps track of if they are active or not for CSS.
  const [popUpActive, setPopUpActive] = useState(false);

  //user data from google login
  const [loginData, setLoginData] = useState(null);

  //set after user login, true if their google id matches any authorized google id's in the database
  //these authorized google id's are set by hand, partly because i'm lazy and partly because i'm paranoid
  const [userAuthorized, setUserAuthorized] = useState(false);

  //state for dark / light mode
  const [lightsOn, setLightsOn] = useState(false);

  //state for main background color
  const [primaryColorDark, setPrimaryColorDark] = useState(null);

  //state for server background color / title color
  const [secondaryColorDark, setSecondaryColorDark] = useState(null);
  
  //state for main background color
  const [primaryColorLight, setPrimaryColorLight] = useState(null);

  //state for server background color / title color
  const [secondaryColorLight, setSecondaryColorLight] = useState(null);
  
  //load data from client cache if exists
  //also initialize server data, and color palettes
  //this is my "onComponentDidMount method"
  useEffect(() =>
  {

    //get colors
    axios.get(url + "color/getallcolors")
    .then((response) => {
      if(debug)
      {
        
        console.log("-------");
        console.log(response);
      
      } 
      //check if contains color "Dark"
      if(response.data.filter(color => color.name === "Dark").length > 0)
      {
        var color = response.data.filter(c => c.name === "Dark")[0];
        setPrimaryColorDark(color.primaryColor);
        setSecondaryColorDark(color.secondaryColor);
      }
      else
      {
        setPrimaryColorDark("#252525");
        setSecondaryColorDark("#dd5050");
      }
      //check if contains color "Light"
      if(response.data.filter(color => color.name === "Light").length > 0)
      {
        var color = response.data.filter(color => color.name === "Light")[0];
        setPrimaryColorLight(color.primaryColor);
        setSecondaryColorLight(color.secondaryColor);
      }
      else
      {
        setPrimaryColorLight("#ceae7f");
        setSecondaryColorLight("#dd5050");
      }
    })
    .catch((error) => {
      LogAxios(error);
    })

    
    //get client data from cache
    if(localStorage.getItem("userData"))
    {
      setLoginData(JSON.parse(localStorage.getItem("userData")));
      checkUserAuth(JSON.parse(localStorage.getItem("userData")));
    }
    
    //set editorMode from cache
    if(localStorage.getItem("editorMode"))
    {
      updateEditorMode(localStorage.getItem("editorMode"));
    }

    //set lights on or off
    if(localStorage.getItem("lights"))
    {
      var lightsCheck = (localStorage.getItem("lights") === "true");
      setLightsOn(lightsCheck);
    }

    //initialize server data
    GetAllServers();

  }, [])

  //retrieve all the servers in the database
  function GetAllServers() {
    axios.get(url + "server/GetAllServers")
    .then(function (response) {

      //if debug enabled log everything
      if(debug)
      {
        console.log("response " + response);
        console.log("response.data " + response.data);
        console.log("response.status " + response.status);
        console.log("response.statusText " + response.statusText);
        console.log("response.headers " + response.headers);
        console.log("response.config " + response.config);
      }

      //update servers list
      var serversList = []
      response.data.forEach((data) => {
        serversList.push(data);
      })

      setServers(serversList);


    })
    .catch(function (error) {
      if(debug)
      {
        
        if (error.response)
        {
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else console.log(error);
      }
      else console.log(error.response);

    });
  }

  function LogAxios(response)
  {
    if(debug)
    {
        console.log("response " + response);
        console.log("response.data " + response.data);
        console.log("response.status " + response.status);
        console.log("response.statusText " + response.statusText);
        console.log("response.headers " + response.headers);
        console.log("response.config " + response.config);
    }

  }

  function PopUpActive() {
    setPopUpActive(!popUpActive);
  }

  //update browser state with user data
  const handleLogin = (data) =>
  {
    setLoginData(data);
    localStorage.setItem('userData', JSON.stringify(data));

    checkUserAuth(data);
  }

  //reset browser state
  const handleLogout = () =>
  {
    setLoginData(null);
    setUserAuthorized(false);
    updateEditorMode(false);
    localStorage.removeItem("userData");
  }
  
  const toggleLights = () =>
  {
    localStorage.setItem('lights', !lightsOn);
    setLightsOn(!lightsOn);
  }

  //update the color record in the db
  const saveColor = (data) =>
  {

    //api call
    axios.put(url + "color/updatecolor", data)
    .then((response) => {
      LogAxios(response);
    })
    .catch((error) => {
      console.log(error);
    })

  }

  const setPrimaryColor = (color) =>
  {
    if(lightsOn)
    {
      setPrimaryColorLight(color);
      var data = {
        "name" : "Light",
        "primaryColor" : color,
        "secondaryColor" : secondaryColorLight
      }
      saveColor(data);
    }
    else
    {
      setPrimaryColorDark(color);
      var data = {
        "name" : "Dark",
        "primaryColor" : color,
        "secondaryColor" : secondaryColorDark
      }
      saveColor(data);
    }
  }

  const setSecondaryColor = (color) =>
  {
    if(lightsOn)
    {
      setSecondaryColorLight(color);
      var data = {
        "name" : "Light",
        "primaryColor" : primaryColorLight,
        "secondaryColor" : color
      }
      saveColor(data);
    }
    else
    {
      setSecondaryColorDark(color);
      var data = {
        "name" : "Dark",
        "primaryColor" : primaryColorDark,
        "secondaryColor" : color
      }
      saveColor(data);
    }
  }

  //check database for userid to see if authorized to edit or not
  function checkUserAuth(data)
  {
    var $this = this;
    if(debug)
    {
    console.log("getting authorized useres list...")
    }
    axios.get(url + "login/authusers")
    .then(function (response) {
      if(debug)
      {
        console.log("List got!");
        console.log(response);
      }

      var check = response.data.find(x => x.userId === data.userId);
      if(check)
      {
        if(debug)
        {
          console.log("user authorized!");
        }
        setUserAuthorized(true);
      }
      //if(response.data.find(x => x.UserId == data.UserId))

    })
    .catch(function (error) {
      console.log("Getting list failed.");
      console.log(error);
      if(error.response)
      $this.logAxios(error.response);
    })
  }


  //update the browser cache and state for editor mode
  function updateEditorMode(editorMode)
  {
    console.log(editorMode + " " + userAuthorized + " e+ua");
    localStorage.setItem("editorMode", editorMode);
    if(editorMode && userAuthorized)
      setEditorMode(true);
    if(!editorMode)
      setEditorMode(false);
  }


  return (
    <div className="App" style={{backgroundColor:  lightsOn ? primaryColorLight : primaryColorDark}} key={"bg " + lightsOn ? primaryColorLight : primaryColorDark}>
      <GoogleLoginButton handleLogin={handleLogin} handleLogout={handleLogout} loginData={loginData} debug={debug}/>
      <LightSwitch lightsOn={lightsOn} toggleLights={toggleLights}/>

      {/*allow use of editor mode if user is authorized */}
      {userAuthorized ? <EditorSwitch lightsOn={lightsOn} editorMode={editorMode} toggleEditorMode={updateEditorMode} key={" " + editorMode}/> : null}

      {/*enable color pickers if in editor mode */}
      {editorMode && primaryColorDark && primaryColorLight ?
      <div>
        
        <ColorPicker name="Background" setColor={setPrimaryColor} color={ lightsOn ? primaryColorLight : primaryColorDark} saveColor={saveColor} class="PrimaryColorPicker" invert="true" key={lightsOn ? primaryColorLight + " " + editorMode : primaryColorDark + " " + editorMode}/>
        <ColorPicker name="Server Browser" setColor={setSecondaryColor} color={ lightsOn ? secondaryColorLight : secondaryColorDark} saveColor={saveColor} class="SecondaryColorPicker" key={lightsOn ? secondaryColorLight + " " + editorMode : secondaryColorDark + " " + editorMode}/>
      </div>
      : null}

      <div className="Title" style={{color: lightsOn ? secondaryColorLight : secondaryColorDark}}>
        Grouchland
        <a href="https://www.youtube.com/@HeyGrouch"><img src={youtubeLogo} alt="Youtube" width="5%"/></a>
        <a href="https://www.patreon.com/grouchland"><img src={patreonLogo} alt="Patreon" width="3.5%"/></a>
        <a href="https://heygrouch.itch.io/"><img src={itchLogo} alt="itch" width="12%"/></a>
      </div>
      <div style={{width:"5%"}}>
      </div>   
      {!popUpActive ? <Map servers={servers}/> : <div className='Map-Place-Holder' /> }
      <Browser servers={servers} editorMode={editorMode} url={url} defaultObj={defaultObj} GetAllServers={GetAllServers} LogAxios={LogAxios} PopUpActive={PopUpActive} ToGpsJSONFromPoint={ToGpsJSONFromPoint} color={lightsOn ? secondaryColorLight : secondaryColorDark} key={servers.length + " "}/>
    </div>
  );
}

export default App;
