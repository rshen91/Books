import React, { Component } from 'react';
import GuessAuthor from './GuessAuthor';
// import SortDate from './SortDate';

export default class Game extends Component {

    render() {
        if (this.error) {
            return ( <p> { this.error } </p>)
        }

        return ( 
        <div>
            <form className = "form" id="play">
                <ul className = "list-group list-group-flush">
                    <section>
                        <GuessAuthor />
                    </section>    
                </ul>  
                <br />
            </form>  
        </div>
        )
    }
}