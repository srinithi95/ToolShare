import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "70%",
  height: "80%",
  left: "60px",
};

export class ToolMap extends Component {
  
  
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {  
    console.log(this.props.coordinates.length)
    
    return (
      <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{
          lat: 37.7790262,
          lng: -122.419906,
        }}
      >       
        
        {this.props.coordinates.map(marker => {
        
          return(
            <Marker position={{ lat: marker.lat, lng: marker.lng }} ></Marker>
          )
        })}
          
       
        {/* <Marker
          onClick={this.onMarkerClick}
          name={"Carpet Vaccum Cleaner"}
        /> */}
        
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
      // <h1>Hello, {this.props.coordinates[0].lat}</h1>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyALPCrM1o0G3wqbTLToT2KWvsExLao5vhE",
})(ToolMap);
