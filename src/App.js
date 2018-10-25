import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AddBookForm from './components/AddBookForm';
import ViewBook from './components/ViewBook';
import Game from './components/Game';



class App extends Component {

  render() {
    return (
      <Router>
       <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light active-link">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link active-link"> Add a Book </Link></li>
            <li><Link to={'/viewbook'} className="nav-link active-link"> View Recently Read Books </Link></li>
            <li><Link to={'/game'} className="nav-link active-link"> Play </Link></li>
          </ul>
        </nav>
        <br />
        <header className="App-header">
          <h1 className="App-title">Book Tracker</h1>
        </header>
        <Switch>
          <Route exact path="/" component={AddBookForm} />
          <Route exact path ="/viewbook" component={ViewBook} />
          <Route exact path="/game" component={Game} />
        </Switch>
         </div>
      </ Router>
    )
  }
}

export default App;
