import React, { Component } from 'react'
const venues = [
    {
        name: "iTea",
    },
    {
        name: "O Sushi"
    },
    {
        name: "Cocurry"
    }

]

function searchingFor(term){
    return function(x){
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
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
                {
                    venues.filter(searchingFor(this.state.term)).map(venue => 
                       <h1> {venue.name} </h1> 
                    )
                }
            </div>
          
        );
    }
}

export default SearchForm