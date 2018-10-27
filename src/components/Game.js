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

    /**
     * This function needs to run before generating the questions to 
     * randomly generate five entries that are within the total amount 
     * of book entries
     */
    getRandomNumber() {
        client.search({
            index: 'books',
            type: 'doc',
            body: {
                query: {
                    "match_all" : {}
                }
            }
        }).then((body) => {
            let generatedFrom = Math.floor(Math.random() * Math.floor(body.hits.total - 5));
            this.getQuestionsData(generatedFrom)
          }); 
        };

    async getQuestionsData(from) {
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
                "from": from
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
            return this.state;
            }
    /**
     * This will call getRandomNumber() which then calls getQuestionsData()
     */
    componentWillMount() {
        this.getRandomNumber();
    }

    /**
     * Ensure that the authors are unique
     */
    ensureDifferentAuthors() {
        let distinctAuthors =  Array.from(new Set(this.state.question.resultsAuthor));

        for (let i = distinctAuthors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [distinctAuthors[i], distinctAuthors[j]] = [distinctAuthors[j], distinctAuthors[i]]; 
        }

        return distinctAuthors.map((author, index) =>
            <button type="submit" selection={this.handleSelection()} key={index}>{author}</button>
        )
        
    }

    /**
     * When a button is clicked determine if it matches
     */
    handleSelection() {

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
                        <p>Who is the author of {this.state.question.resultsTitle[0]}?</p>
                    </label> 
                    <br />
                    {this.ensureDifferentAuthors()}      
                </ul>  
                <br />
            </form>  
        </div>
        )
    }
}