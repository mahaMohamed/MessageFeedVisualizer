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

    console.log("In Map", this.props.time);

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
        {
          this.props.locations.map((item, index) => {
            return <Marker key={index} position={item} onClick={this.onMarkerClick}
              name={this.props.messages[index]} sentiment={this.props.sentiments[index]} time={this.props.time[index]} />
          }
          )
        }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}

        >
          <div style={{ textAlign: "center" }}>
            <h4>{this.state.selectedPlace.name}</h4>
            {(this.state.selectedPlace.sentiment === " Positive") ?
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="goldenrod" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c.552 0 1-.672 1-1.5S10.552 5 10 5s-1 .672-1 1.5S9.448 8 10 8z" />
              </svg> :
              (this.state.selectedPlace.sentiment === " Negative") ?
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM10 8c.552 0 1-.672 1-1.5S10.552 5 10 5s-1 .672-1 1.5S9.448 8 10 8z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="grey" class="bi bi-emoji-neutral-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM10 8c.552 0 1-.672 1-1.5S10.552 5 10 5s-1 .672-1 1.5S9.448 8 10 8z" />
                </svg>
            }

            {(this.state.selectedPlace.time >= 18 && this.state.selectedPlace.time <= 23)
              || (this.state.selectedPlace.time >= 0 && this.state.selectedPlace.time <= 5) ?
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" class="bi bi-moon" viewBox="0 0 16 16"  style={{marginLeft:"10px" , marginTop: "10px"}}>
                <path fill-rule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z" />
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="goldenrod" class="bi bi-sun" viewBox="0 0 16 16" style={{marginLeft:"10px" , marginTop: "10px"}}>
              <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
              <path fill-rule="evenodd" d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.155l-.36 1.508a.25.25 0 0 1-.282.19l-1.532-.245a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.508a.25.25 0 0 0-.374-.155l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/>
            </svg>
              }
          </div>


        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_bahykCyBnj90GS2KQ2uYfT4q2Cef3p8'
})(MapContainer);

<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="goldenrod" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c.552 0 1-.672 1-1.5S10.552 5 10 5s-1 .672-1 1.5S9.448 8 10 8z" />
</svg> 