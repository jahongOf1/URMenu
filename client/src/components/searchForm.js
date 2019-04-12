import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Filter from './Filter.jsx'

const venues = [
   {
       name: "iTea",
       address: "1 dummy",
       genre: "Cafe",
       menu: [{name:"Panda Tea", price:"5.99", diet:""}, {name:"Matcha", price:"4.99", diet:""}, {name:"Watermelon", price:"5.99", diet:["gluten-free", "vegan"]}]
   },
   {
       name: "O Sushi",
       address: "2 dummy",
       genre: "Japanese",
       menu: [{name:"California Rolls", price:"3.99", diet:""}, {name:"Soy Paper Roll", price:"7.99", diet:["gluten-free",]},]

   },
   {
       name: "Cocurry",
       address: "3 dummy",
       genre: "Thai",
       menu: [{name:"Coconut Curry", price:"10.99", diet:"vegetarian"}, ]

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

function MenuList(menu) {
   return (
       <ul>
           {menu.map((item, i) =>
               {
                   return  (
                       <li key={i}> {item.name} - {item.price} </li>
                       )
               }
           )}
       </ul>
   );
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
       this.setState({ term: event.target.value });

   //     fetch('/api/form-submit-url', {
   //        method: 'GET',
   //        body: data,
   //     });
   }

   render() {
       const {term, venues} = this.state
//change <form> to <form onSubmit={this.handleSubmit}>
       return (
           <div>
               <form>
                   <input type="text" name="search" id="searchbox" placeholder="Find your favorite food..." onChange= {this.searchHandler} value = {term} />
                   <button>Find Food!</button>
               </form>
            {/*    <div id = "restaurant_box_a">
               {
                   venues.filter(searchingFor(this.state.term)).map(venue =>
                       <div id = "restaurant_box_b">
                           <ul>
                           <Popup id = "menu"  trigger={<li className="button" id="venue_name">{venue.name} </li>}
                           arrow = "false"
                           closeOnDocumentClick>
                               {
                                  MenuList(venue.menu)
                               }
                           </Popup>
                           <li id="venue_addr"> {venue.address}</li>
                           <li id="venue_genre">{venue.genre} </li>
                           </ul>
                      </div>
                   )
               }
               </div> */}
           </div>

       );
   }
}

export default SearchForm;