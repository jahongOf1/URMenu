import React, { Component } from 'react';
import './App.css';
import {slide as Menu} from 'react-burger-menu';
import SearchForm from './components/searchForm';
import Checkbox from './components/checkboxes';
import axios from 'axios'

const OPTIONS = ["One", "Two", "Three"];

class App extends Component {
  state = {
    venues: [],
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes, 
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);
  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);
  
  // call get Venues
  componentDidMount() {
    this.getVenues();
  }

//map renderin function
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAAT6-dWLvHbxFocWvYgmdEifZGFTWr0lk&callback=initMap")
    window.initMap = this.initMap;
  }

  // gets information by foursquare api
  getVenues = () => {

    // getting venues from API
    // retrieving information from API renders the map
    axios.get("http://localhost:5000/restaurants/")
      .then(response => {
        this.setState({
          venues: response.data
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

    // creates variable infowindow
    var infowindow = new window.google.maps.InfoWindow()

    this.state.venues.map(myVenue => {
      // sets content string into venue
      var contentString = "<p>" + myVenue.name + "</p>" + "<p>" + myVenue.address + "</p>" 
      function searchingFor(term){
        return function(x){
          console.log(myVenue.location)
          return myVenue;
        }
      }
      //sets the marker in the position
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.location.lat , lng: myVenue.location.lng},
        map: map,
        title: myVenue.name
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
        <Menu>
        <div id="page-wrap">
          <div id = "search">
            <p>Your Menu, your choice.</p>
            <SearchForm/>       
          </div>
          <div className="container">
              <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}
                <div className="form-group mt-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    onClick={this.selectAll}
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    onClick={this.deselectAll}
                  >
                    Deselect All
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
          </div>
        </div>
        </Menu>
        <div id="map"> </div>
      </main>
    );
  };
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
