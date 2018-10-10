import React, { Component} from 'react';
import Elasticsearch, {client} from '../api/elasticsearch.js';

class AddBookForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        finished: '',
        numberOfRead: 0,
        author: '',
        nationality: '',
        numberOfPages: 0,
        published: ''
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        console.log(data.get('title'));
        console.log(data.get('finished'));
        console.log(data.get('numberOfRead'));
        
        const resp = client.index({
            index: 'books',
            type: 'doc',
            body: 
                { 
                    title: data.get('title'),
                    finished: data.get('finished'),
                    numberOfRead: data.get('numberOfRead'),
                    author: data.get('author'),
                    nationality: data.get('nationality'),
                    numberOfPages: data.get('numberOfPages'),
                    published: data.get('published')
                }
        });

        console.log(resp);

        // fetch('/api/form-submit-url',{
        //     method: 'POST',
        //     body: data,
        // });
    };
  
    render() {
      return (
        <div>
          <p>{Elasticsearch.checkConnectivity}</p>
        <form id="form" onSubmit={e => this.handleSubmit(e)}>
            <label>
                Title:
                <input 
                    name="title"
                    type="text" 
                    value={this.state.title} 
                    onChange={e => this.handleInputChange(e)} />
            </label>

            <label>
                Finished: 
                <input 
                    type="date" 
                    name="finished"
                    value={this.state.finished} 
                    onChange={e => this.handleInputChange(e)} />
            </label>

            <label>
                Number of Times Read:
                <input
                    name="numberOfRead"
                    type="number"
                    value={this.state.numberOfRead}
                    onChange={e => this.handleInputChange(e)} />
            </label>

            <label>
                Author: 
                <input 
                    name="author"
                    type="text" 
                    value={this.state.author} 
                    onChange={e => this.handleInputChange(e)} />
            </label>

            <label>
                Nationality: 
                <input
                    name="nationality" 
                    type="text" 
                    value={this.state.nationality} 
                    onChange={e => this.handleInputChange(e)} />
            </label>

            <label>
                Number of Pages:
                <input
                    name="numberOfPages"
                    type="number"
                    value={this.state.numberOfPages}
                    onChange={e => this.handleInputChange(e)} />
            </label>

            <label>
                Published: 
                <input 
                    type="date" 
                    name="published"
                    value={this.state.published} 
                    onChange={e => this.handleInputChange(e)} />
            </label>

            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
      );
    }
  }

  export default AddBookForm;