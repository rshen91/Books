import React, { Component } from 'react';
import Elasticsearch, { client } from '../api/elasticsearch.js';
import moment from 'moment';
import { withAlert } from 'react-alert';

class AddBookForm extends Component {
    constructor(props) {
      super(props);
             
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        title: '',
        finished: '',
        numberOfRead: 0,
        author: '',
        nationality: '',
        numberOfPages: 0,
        published: '',
        "@timestamp": null,
      };

    //   console.log(this.state["@timestamp"])
    }
  
    handleInputChange(event) {
  
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let Last_Finished = moment(data.get('finished')).format();
        
        const resp = client.index({
            index: 'books',
            type: 'doc',
            body: 
                { 
                    Title: data.get('title'),
                    Last_Finished: Last_Finished,
                    Tally: data.get('numberOfRead'),
                    Author: data.get('author'),
                    Nationality: data.get('nationality'),
                    Pages: data.get('numberOfPages'),
                    Published: data.get('published'),
                    "@timestamp": moment().format("YYYY-MM-DD")
                }
        }).then(() => {
            this.setState({
                title: '',
                finished: '',
                numberOfRead: 0,
                author: '',
                nationality: '',
                numberOfPages: 0,
                published: '',
                "@timestamp": '',
            });
        })
        
        this.props.alert.success('Book added!')
    
        console.log(resp);
    };

   
  
    render() {
      return (
                
        <div>
          <p>{Elasticsearch.checkConnectivity}</p>
        <form className="form" onSubmit={e => this.handleSubmit(e)}>
            <label>
                Title:
                <input 
                    name="title"
                    type="text" 
                    value={this.state.title} 
                    onChange={e => this.handleInputChange(e)} required/>
            </label>

            <label>
                Finished: 
                <input 
                    type="date" 
                    name="finished"
                    value={this.state.finished} 
                    onChange={e => this.handleInputChange(e)} required/>
            </label>

            <label>
                Number of Times Read:
                <input
                    name="numberOfRead"
                    type="number"
                    value={this.state.numberOfRead}
                    onChange={e => this.handleInputChange(e)} required/>
            </label>

            <label>
                Author: 
                <input 
                    name="author"
                    type="text" 
                    value={this.state.author} 
                    onChange={e => this.handleInputChange(e)} required/>
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
                    onChange={e => this.handleInputChange(e)} required/>
            </label>

            <label>
                Published: 
                <input 
                    type="date" 
                    name="published"
                    value={this.state.published} 
                    onChange={e => this.handleInputChange(e)} required/>
            </label>

            <br />
            <button type="submit">Submit</button>
            <br />
        </form>
        </div>
        )
    }
}


  export default withAlert(AddBookForm);