import React, { Component } from 'react';
import { client } from '../api/elasticsearch.js';

export default class Game extends Component {
    constructor() {
        super();

        this.state = {
            question: {
                resultsTitle: [],
                resultsAuthor: [],
                resultsPublished: []
            },
            isLoading: false,
            error: null,
        };
    }

    handleInputChange(event) {
  
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    async getQuestionsData() {
        await client.search({
            index: 'books',
            type: 'doc',
            body: {
                "sort": [
                    {
                      "Pages": {
                        "order": "desc"
                      }
                    }
                  ],
                query: {
                    "match_all" : {}
                },
                "size": 5,
                "from": 20
            }
        }).then((body) => {
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
                    question: {
                    resultsTitle: resultsTitle,
                    resultsAuthor: resultsAuthor,
                    resultsPublished: resultsPublished
                },
                    asked: false
                }
            })
            
            })
            console.log(this.state);
            return this.state;
            }

    componentWillMount() {
        this.getQuestionsData();
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
                        
                        <p>Who is the author of {this.state.question.resultsTitle[0]} ?</p>
                        
                    </label> 
                    <br />
                    <button type="submit">{this.state.question.resultsAuthor[3]}</button>
                    <button type="submit">{this.state.question.resultsAuthor[2]}</button>
                    <button type="submit">{this.state.question.resultsAuthor[4]}</button>
                    <button type="submit">{this.state.question.resultsAuthor[0]}</button>
                    <button type="submit">{this.state.question.resultsAuthor[1]}</button>
                </ul>  
                <br />
            </form>  
        </div>
        )
    }
}