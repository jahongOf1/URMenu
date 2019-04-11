import React, { Component } from 'react'
import Popup from 'reactjs-popup'

const venues = [
    {
        name: "iTea",
        address: "1 dummy",
        genre: "Cafe",
        menu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit\n Condimentum ligula hendrerit donec tortor ac, ornare cursus pharetra montes\n Lobortis orci placerat vehicula dignissim ligula, fermentum maecenas urna\n Neque sed curabitur rhoncus malesuada, nascetur varius\n Aliquam lacinia velit conubia id, nulla etiam\n Potenti tincidunt torquent purus sociosqu scelerisque, non integer aliquam\n Mi dictum proin sollicitudin velit, egestas fusce ad\n Aptent posuere ad risus tempus primis, vulputate habitant dui. Faucibus dictumst ornare erat sem, odio gravida aenean.\n Potenti sociis ad nulla vehicula, habitant nisi."
    },
    {
        name: "O Sushi",
        address: "2 dummy",
        genre: "Japanese",
        menu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit\n Condimentum ligula hendrerit donec tortor ac, ornare cursus pharetra montes\n Lobortis orci placerat vehicula dignissim ligula, fermentum maecenas urna\n Neque sed curabitur rhoncus malesuada, nascetur varius\n Aliquam lacinia velit conubia id, nulla etiam\n Potenti tincidunt torquent purus sociosqu scelerisque, non integer aliquam\n Mi dictum proin sollicitudin velit, egestas fusce ad\n Aptent posuere ad risus tempus primis, vulputate habitant dui. Faucibus dictumst ornare erat sem, odio gravida aenean.\n Potenti sociis ad nulla vehicula, habitant nisi."

    },
    {
        name: "Cocurry",
        address: "3 dummy",
        genre: "Thai",
        menu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit\n Condimentum ligula hendrerit donec tortor ac, ornare cursus pharetra montes\n Lobortis orci placerat vehicula dignissim ligula, fermentum maecenas urna\n Neque sed curabitur rhoncus malesuada, nascetur varius\n Aliquam lacinia velit conubia id, nulla etiam\n Potenti tincidunt torquent purus sociosqu scelerisque, non integer aliquam\n Mi dictum proin sollicitudin velit, egestas fusce ad\n Aptent posuere ad risus tempus primis, vulputate habitant dui. Faucibus dictumst ornare erat sem, odio gravida aenean.\n Potenti sociis ad nulla vehicula, habitant nisi."

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
                            <ul>
                            <Popup id = "menu"  trigger={<li className="button" id="venue_name">{venue.name} </li>} 
                            arrow = "false"
                            closeOnDocumentClick>
                                
                                {venue.menu}
                            </Popup>
                            <li id="venue_addr"> {venue.address}</li>
                            <li id="venue_genre">{venue.genre} </li>
                            </ul>
                       </div>
                    )
                }
                </div>
            </div>
          
        );
    }
}

export default SearchForm