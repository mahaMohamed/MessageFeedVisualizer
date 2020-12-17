import React from "react"
import './App.css';
import MapContainer from "./MapContainer"
import Geocode from "react-geocode";





class MessageFilter extends React.Component {

  constructor() {
    super()
    this.state = {
      data: [],
      messages: [],
      sentiments: [],
      locations: []

    }
  }



  

  componentWillMount() {

    /*Retrieving feed data*/
    let requestURL = 'https://spreadsheets.google.com/feeds/list/0Ai2EnLApq68edEVRNU0xdW9QX1BqQXhHRl9sWDNfQXc/od6/public/basic?alt=json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      const messageFeed = request.response;
      parseFeed(messageFeed);

    }

    /*Parsing the feed and saving it into the state*/
    let parseFeed = messageFeed => {
      let feedArray = messageFeed.feed.entry
      let messagesText = feedArray.map(feed => feed.content.$t)
      console.log(messageFeed)

      let messagesContent = messagesText.map(element => element.split(":")[2].split(", sentiment")[0])

      let messagesSentiment = messagesText.map(element => element.split(":")[3])

      let places = ["Damascus", "Mogadishu", "Ibiza", "Egypt", "Cairo", "Nairobi", "Kathmandu", "Bernabau", "Athens",
        "Istanbul"]



      Geocode.setApiKey("AIzaSyC_bahykCyBnj90GS2KQ2uYfT4q2Cef3p8");
      Geocode.setLanguage("en");
      let locationArray = [];

      setTimeout(()=>{ places.map((item, index) => {
        Geocode.fromAddress(item).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            let loc = { lat, lng };
            return loc
          },
          error => {
            console.error(error);
          },
        ).then(response => {
          locationArray[index] = response
          return response
        })
      })

      console.log(locationArray)

      Geocode.fromAddress("Eiffel Tower").then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
        },
        error => {
          console.error(error);
        }
      );

}, 1500)


      setTimeout(()=>{
        this.setState({
          data: messagesText,
          messages: messagesContent,
          sentiments: messagesSentiment,
          locations: locationArray})
  

      },2000)



      // // this.setState({
      // //   data: messagesText,
      // //   messages: messagesContent,
      // //   sentiments: messagesSentiment,
      // //   // locations: locationArray
      // //   locations: [
      // //     {
      // //       name: "Damascus",
      // //       location: {
      // //         lat: 33.513805,
      // //         lng: 36.276527
      // //       },
      // //     },
      // //     {
      // //       name: "Mogadishu",
      // //       location: {
      // //         lat: 2.046934,
      // //         lng: 45.318161
      // //       },
      // //     },
      // //     {
      // //       name: "Ibiza",
      // //       location: {
      // //         lat: 38.906986,
      // //         lng: 1.421416
      // //       }
      // //     },
      // //     {
      // //       name: "Egypt",
      // //       location: {
      // //         lat: 26.820553,
      // //         lng: 30.802498
      // //       },
      // //     },
      // //     {
      // //       name: "Cairo",
      // //       location: {
      // //         lat: 30.044420,
      // //         lng: 31.235712
      // //       },
      // //     },
      // //     {
      // //       name: "Nairobi",
      // //       location: {
      // //         lat: -1.292066,
      // //         lng: 36.821945
      // //       },
      // //     }, {
      // //       name: "Kathmandu",
      // //       location: {
      // //         lat: 27.717245,
      // //         lng: 85.323959
      // //       },
      // //     },
      // //     {
      // //       name: "Bernabau",
      // //       location: {
      // //         lat: 52.680860,
      // //         lng: 13.583550
      // //       },
      // //     },
      // //     {
      // //       name: "Athens",
      // //       location: {
      // //         lat: 37.983810,
      // //         lng: 23.727539
      // //       },
      // //     },
      // //     {
      // //       name: "Istanbul",
      // //       location: {
      // //         lat: 41.008240,
      // //         lng: 36.276527
      // //       },
      // //     },
      // //   ]

      // })
    }





  }

  render() {
    console.log("IN Mesasage Render", this.state.locations)

    if (this.state.locations.length > 0) 
     return (<MapContainer locations={this.state.locations} messages={this.state.messages} />)
      else{
        return (<p> Loading</p>)

      }


    // return (
    //   <div>

    //     {/* <h1 className="App">
    //         {this.state.messages.map(element => {
    //             return (<p> {element} </p>)
    //         })

    //         }
    //     </h1> */}

    //      <MapContainer locations={this.state.locations} messages={this.state.messages} />
    //   </div>
    // )
  }

}
export default MessageFilter;
