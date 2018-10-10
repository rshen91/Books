import React, { Component } from 'react';
import './App.css';
import Elasticsearch from './api/elasticsearch.js';
import AddBookForm from './components/AddBookForm';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Book Tracker</h1>
        </header>
        <div className="App-intro">
          <Elasticsearch />
        </div>
        <section>
          <div id="addBookForm">
            <AddBookForm />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
