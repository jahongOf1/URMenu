import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Filter from './Filter.jsx'
import axios from 'axios'




function MenuList(menu) {
   return (
       <ul>{
           menu.map((item, i) =>
               {
                   return  (
                       <li key={i}> {item.name} - {item.price} </li>
                       )
               }
           )
       }
       </ul> 
   );
}

class SearchForm extends Component {
   constructor(props) {
       super(props);

       this.state = {
           venues: [],
           term: '',
       }
       this.handleSubmit = this.handleSubmit.bind(this);
   }

//    searchHandler(event) {
//        this.setState({ term: event.target.value });

//    //     fetch('/api/form-submit-url', {
//    //        method: 'GET',
//    //        body: data,
//    //     });
//    }

   handleSubmit(event){
        event.preventDefault();
        this.setState({term: event.target.value}).
        axios.get("http://localhost:5000/restaurants/" + this.term)
        .then(response => {
        this.setState({
            venues: response.data
        }, this.renderMap())
        })
        .catch(error => {
        console.log(error)
        });   
   }
   render() {
       const {term, venues} = this.state
//change <form> to <form onSubmit={this.handleSubmit}>
       return (
           <div>
               <form  onSubmit={this.handleSubmit}>
                   <input type="text" name="search" id="searchbox" placeholder="Find your favorite food..."  value = {this.term} />
                   <button>Find Food!</button>
               </form>
               <div id = "restaurant_box_a">
               {
                venues.map(venue =>
                <div id = "restaurant_box_b">
                    <ul>
                    <Popup id = "menu"  trigger={<li className="button" id="venue_name">{venue.name} </li>}
                    arrow = "false"
                    closeOnDocumentClick>

                    { MenuList(venue.menu)


                        }
                    </Popup>
                    <li id="venue_addr"> {venue.address}</li>
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