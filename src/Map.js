import React from "react"
import GoogleMapReact from 'google-map-react'
import withScriptjs from 'google-map-react'
import withGoogleMap from 'google-map-react'


function Map() {


    return (<GoogleMapReact defaultZoom={10}
        defaultCenter={{ lat: 30.044420, lng: 31.235712 }}/>)

}

// const WrappedMap = withScriptjs(withGoogleMap(Map))


export default Map