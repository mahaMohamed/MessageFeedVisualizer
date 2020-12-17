import logo from './logo.svg';
import MessageFilter from "./MessageFilter.js"
import MapContainer from "./MapContainer.js"
import React from "react"
import './App.css';
import GoogleMapReact from 'google-map-react';
import withScriptjs from 'google-map-react';
import withGoogleMap from 'google-map-react';






function App() {


  return (
    <div>


    <h1> Message Feed </h1>

    <MessageFilter/>
    {/* <MapContainer/> */}

    {/* <div style={{color: "black", width: "100%", height:"100%"}}> Hwllo  </div> */}

    </div>
    
    
    )

}
export default App;
