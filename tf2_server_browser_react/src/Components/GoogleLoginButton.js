import React, { useEffect } from 'react';
import { useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import '../App.css';
import googleLogo from '../Images/googleLogo.png';
import jwt_decode from "jwt-decode";

export default function GoogleLoginButton(props) {


    //const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

    const url ="https://localhost:7250/";
    //const url = "http://localhost:5052/";
    const headers = {
        headers: {
            'Content-Type': 'application/json',
        }
      }

    //attempt to get user data from login then store the data in the database and update the webpage
    const handleLogin = (googleData) => {
        if(props.debug)
            console.log("attempting verification...");

        axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + googleData.access_token

        )
        .then(function (response) {
            if(props.debug)
                console.log(response);
            storeData(response.data);
        })
        .catch(function (response)
        {
            console.log(response);
        });
        
    }

    //call api to (1) see if record exists of google user data (2) update or create record for google user's data
    const storeData = (payload) => {   
        
        var data = {
            name: payload.name,
            userId: payload.id,
            email: payload.email,
            picture: payload.picture

        }

        props.handleLogin(data);

        var recordJson = JSON.stringify(data);


        if(props.debug)
            console.log(recordJson);

        //checks if record exists based on UserID -> returns true or false
        if(props.debug)
            console.log("pinging /login/exists...")
        axios.post(url + "login/exists", recordJson, headers)
        .then( function (response) {
            if(props.debug)
            {
                console.log("login ping successful!");
                console.log(response);
            }
            //if exists, update, otherwise, create
            if(response.data) update(recordJson);
            else create(recordJson);
        })
        .catch( function (error) {
            console.log ("login ping failed");

            console.log(error);

            if(error.response)
            {
                console.log(error.response);
                console.log(error.response.data);
            }
        })

        //create record
        const create = (recordJson) => {
            if(props.debug)
                console.log("attempting login create...")
            axios.post(url + "login/create", recordJson, headers)
            .then(function (response) {
                if(props.debug)
                {
                    console.log("create successful!");
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log("login create failed");

                console.log(error);

                if(error.response)
                console.log(error.response);
            });
        }

        const update = (recordJson) => {
            if(props.debug)
                console.log("attempting login update...")
            axios.post(url + "login/edit", recordJson, headers)
            .then(function (response) {
                if(props.debug)
                {
                    console.log("update successful!");
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log("login update failed");

                console.log(error);

                if(error.response)
                console.log(error.response);
            });

        }


    }

    const handleFailure = (error) => {
        console.log(error);
    }

    //the google part of the login button
    const login = useGoogleLogin({
        onSuccess: tokenResponse => handleLogin(tokenResponse),
        onFailure: handleFailure
    })


    return (
        <div>
            { props.loginData == null ? 
            <div class="LoginButton">
                <img src={googleLogo} class="LoginImage" onClick={() => login()} alt="Login"></img>
            </div>
            :
            <div class="LoginButton" style={{backgroundColor: 'transparent'}}>
                {/*refferrerPolicy fixes some bug with not loading images properly. Something to do with the foreign website not recognizing this domain.*/}
                <img referrerPolicy='no-referrer' src={props.loginData.picture} class="LoginImage" onClick={props.handleLogout} style={{borderRadius: 5, width: 30}} alt="Login"></img>
            </div>
            }
        </div>
    )
}
