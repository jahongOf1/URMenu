import React, { Component } from 'react'
const venues = [
    {
        name: "iTea",
        address: "1 dummy",
        genre: "Cafe"
    },
    {
        name: "O Sushi",
        address: "2 dummy",
        genre: "Japanese"

    },
    {
        name: "Cocurry",
        address: "3 dummy",
        genre: "Thai"

    }

]

function searchingFor(term){
    return function(x){
        return x.name.toLowerCase().includes(term.toLowerCase()) || 
        x.address.toLowerCase().includes(term.toLowerCase()) ||
        x.genre.toLowerCase().includes(term.toLowerCase()) ||
        !term;
    }
}

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            venues: venues,
            term: '',
        }

        this.searchHandler = this.searchHandler.bind(this);

    }

    searchHandler(event) {
        this.setState({ term: event.target.value })
    }

    render() {
        const {term, venues} = this.state

        return (
            <div>
                <form>
                    <input type="text"  id="searchbox" placeholder="Find your favorite food..." onChange= {this.searchHandler} value = {term} />
                </form>
                <div id = "restaurant_box_a">
                {
                    venues.filter(searchingFor(this.state.term)).map(venue =>
                        <div id = "restaurant_box_b">
                            <p id="venue_name"> {venue.name} </p> 
                            <p id="venue_addr"> {venue.address}</p>
                            <p id="venue_genre"> {venue.genre}</p>
                       </div>
                    )
                }
                </div>
            </div>
          
        );
    }
}

export default SearchForm