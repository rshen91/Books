import React, { Component } from 'react';
import { client } from '../api/elasticsearch.js';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: [],
            isLoading: false,
            error: null,
        };
    }

    handleInputChange(event) {
  
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    async getQuestionsAboutAuthors() {
        await client.search({
            index: 'books',
            type: 'doc',
            body: {
                query: {
                    "match_all" : {}
                },
                "size": 5
            }
        }).then((body) => {
            console.log(body);
            let hits = body.hits.hits;
            let resultsTitle = [];
            let resultsAuthor = [];
            let resultsPublished = [];
            hits.forEach(i => {
                resultsTitle.push(i._source.Title);
                resultsAuthor.push(i._source.Author);
                resultsPublished.push(i._source.Published);
            })
            
            this.setState(() => {
                return {
                    question: resultsTitle.concat(resultsAuthor).concat(resultsPublished),
                    asked: false
                }
            })
        })
        console.log(this.state);
        return this.state;
    }

    getQuestionsAboutPublishedDate = () => {

    }

    componentDidMount() {
        this.getQuestionsAboutAuthors();
    }

    render() {

        if (this.error) {
            return ( <p> { this.error } </p>)
        }

        return ( 
        <div>
            <form className = "form" id="play">
                <ul className = "list-group list-group-flush">
                    <label>
                        {this.state.question}
                        <br/>
                        <input 
                            type="text" 
                            name="answer"
                            value=""
                            onChange={e => this.handleInputChange(e)}
                            placeholder="Please add your answer here" required/>
                    </label> 
                    <br />
                    <button type="submit">Submit</button>
                </ul>  
                <br />
            </form>  
        </div>
        )
    }
}