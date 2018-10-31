import React from 'react';
import GuessAuthor from './GuessAuthor';
// import SortDate from './SortDate';

const Game = (props) =>  {

return ( 
    <div>
        <form className = "form" id="play">
            <ul className = "list-group list-group-flush">
                <section>
                    {/* <SortDate /> */}
                    <GuessAuthor />
                </section>    
            </ul>  
            <br />
        </form>  
    </div>
    )
}

export default Game;