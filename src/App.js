import logo from './logo.svg';
import MessageFilter from "./MessageFilter.js"
import MapContainer from "./MapContainer.js"
import React from "react"
import './App.css';
import GoogleMapReact from 'google-map-react';
import withScriptjs from 'google-map-react';
import withGoogleMap from 'google-map-react';






function App() {

  document.title = "Message Feed"

  return (
    <div>


     <span><h1 className="App-header"> Message Feed </h1>
     <i class="bi bi-envelope-open-fill"></i>

</span> 

      <MessageFilter />
    </div>


  )

}
export default App;
