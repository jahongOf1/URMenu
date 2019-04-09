import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class App extends Component {
  
  state = {
    venues: []
  };

  // call get Venues
  componentDidMount() {
    this.getVenues();
  }

//map renderin function
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key= AIzaSyAAT6-dWLvHbxFocWvYgmdEifZGFTWr0lk&callback=initMap")
    window.initMap = this.initMap;
  }
  // gets information by foursquare api
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      near: "Newark, CA",
      query: "food",
      client_id: "W2U3DBQDEGBNLJ3LNWS4RSST33R3XP3J2TD0GMNE1G1W4TP5",
      client_secret: "LYYCAIVJQDS5RAGMHQY4CAQWFFAW2IV0CU4YFE23WFHWQPAN",
      v: "20190201" 
    };
    // getting venues from API
    // retrieving information from API renders the map
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        // console.log(response.data.response.groups)
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log(error)
      });
  }

  initMap = () => {
    // coordinates and zoom for map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:  37.529659, lng: -122.040237},
      zoom: 13.5,
      mapTypeControl: false
    });

    // creates variale infowindow
    var infowindow = new window.google.maps.InfoWindow()

    //
    this.state.venues.map(myVenue => {
      // sets content string into venue
      var contentString = myVenue.venue.name

      //sets the marker in the position
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })
      // ads a listener to marker where clicking will bring 
      // up infowindow
      // sets the content of infowindow then opens it
      marker.addListener('click', function(){

        infowindow.setContent(contentString)
        infowindow.open(map, marker)
      })

    });


    
  }
  //render map in html
  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}


function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script,index);
}

export default App;
