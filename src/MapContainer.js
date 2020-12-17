
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import MessageFilter from "./MessageFilter"



const mapStyles = {
  width: '100%',
  height: '85%',
};

export class MapContainer extends Component {


  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}

    };

    console.log("In Map", this.props.locations)

  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  putMarkers() {
    let markers = this.props.locations.map((item, index) =>

      <Marker position={item} onClick={this.onMarkerClick}
        name={this.props.messages[index]} />

    )

    return markers
  }


  render() {


    return (
      <Map
        google={this.props.google}
        zoom={3}
        style={mapStyles}
        initialCenter={
          {
            lat: 39.074207,
            lng: 21.824312
          }
        }
      >

        {/* {this.props.locations.map((mark, index) => <Marker key={index} position={mark.location} name={this.props.messages[index]} />)} */}


        {
           this.props.locations.map((item,index) => 
             
              <Marker position={item} onClick={this.onMarkerClick}
               name={this.props.messages[index]}/>
            
          )
      }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>

      
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_bahykCyBnj90GS2KQ2uYfT4q2Cef3p8'
})(MapContainer);
