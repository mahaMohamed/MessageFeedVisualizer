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



    /*Parsing the feed and saving it into the state*/
    let parseFeed = messageFeed => {
      let feedArray = messageFeed.feed.entry
      let messagesText = feedArray.map(feed => feed.content.$t)
      let messagesContent = messagesText.map(element => element.split(":")[2].split(", sentiment")[0])

      let messagesSentiment = messagesText.map(element => element.split(":")[3])

      let time = feedArray.map(element => +element.title.$t.split(" ")[1].split(":")[0])

      let places = ["Damascus", "Mogadishu", "Ibiza", "Egypt", "Cairo", "Nairobi", "Kathmandu", "Bernabau", "Athens",
        "Istanbul"]



      console.log(time)
      Geocode.setApiKey("AIzaSyC_bahykCyBnj90GS2KQ2uYfT4q2Cef3p8");
      Geocode.setLanguage("en");

      return new Promise((resolve, reject) => {
        let locationArray = [];
        places.forEach((item, index) => {
          Geocode.fromAddress(item)
            .then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                let loc = { lat, lng };
                return loc;
              },
              error => {
                reject(error);
              },
            )
            .then(response => {
              locationArray[index] = response
              return response;
            });
        });
        resolve([messagesText, messagesContent, messagesSentiment, locationArray, time]);
      });
    }

    let self = this;
    request.onload = function () {
      const messageFeed = request.response;
      parseFeed(messageFeed)
        .then((datas) => {
          self.setState({
            data: datas[0],
            messages: datas[1],
            sentiments: datas[2],
            locations: datas[3],
            time: datas[4]
          });
        });

    }

    request.send();

  }

  render() {
    if (this.state.messages.length > 0) {
      return (<MapContainer locations={this.state.locations} messages={this.state.messages} sentiments={this.state.sentiments}
                            time={this.state.time}/>);
    }
    else {
      return (<p> Loading</p>);
    }
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
export default MessageFilter;
