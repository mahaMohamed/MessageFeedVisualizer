import logo from './logo.svg';
import React from "react"
import './App.css';






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


    componentDidMount() {

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
        let parseFeed = (messageFeed) => {
            let feedArray = messageFeed.feed.entry
            let messagesText = feedArray.map(feed => feed.content.$t)



            let messagesContent =  messagesText.map(element => element.split(":")[2].split(", sentiment")[0])

            let messagesSentiment = messagesText.map(element => element.split(":")[3])
            


            this.setState({
                data: messagesText,
                messages: messagesContent,
                sentiments: messagesSentiment, 
                locations: ["Damascus","Mogadishu","Ibiza","Egypt","Cairo","Nairobi","Kathmandu","Bernabau","Athens",
                            "Istanbul"]
            })
        }





    }

    render() {
        return (<h1 className="App">
            {this.state.messages.map(element => {
                return (<p> {element} </p>)
            })

            }
        </h1>)
    }

}
export default MessageFilter;
