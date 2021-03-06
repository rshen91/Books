import React, { Component } from 'react';
import { client } from '../api/elasticsearch.js';

export default class GuessAuthor extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.getQuestionsData = this.getQuestionsData.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.ensureDifferentAuthors = this.ensureDifferentAuthors.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

        this.state = {
            question: {
                resultsTitle: [],
                resultsAuthor: [],
                resultsPublished: []
            },
            isLoading: false,
            error: null,
            score: 0,
        };
    }

    /**
     * Show input bar input
     * @param {Event} event 
     */
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
            this.getQuestionsData(generatedFrom);
          }); 
        };

    /**
     * Chooses five books sorted by pages starting at a random from value 
     * Flips the name to first last name where applicable 
     * Sets the new state with results from the query
     * @param {Number} from 
     */
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
            let unflippedAuthor = [];
            let resultsPublished = [];
            hits.forEach(i => {
                resultsTitle.push(i._source.Title);
                unflippedAuthor.push(i._source.Author);
                resultsPublished.push(i._source.Published);
            })
            let resultsAuthor = [];
            
            unflippedAuthor.forEach(author => {
                // check that the author has a comma in their name and isn't multiple authors
                if (author.indexOf(',') !== -1 && author.indexOf('&') === -1 && author.indexOf('and') === -1) {
                    let name = author.split(", ");
                    resultsAuthor.push(`${name[1]} ${name[0]}`);
                } else {
                    resultsAuthor.push(author);
                }
            });

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
     * Ensure that the authors are unique and randomly rendered 
     */
    ensureDifferentAuthors() {
        let distinctAuthors =  Array.from(new Set(this.state.question.resultsAuthor));

        for (let i = distinctAuthors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [distinctAuthors[i], distinctAuthors[j]] = [distinctAuthors[j], distinctAuthors[i]]; 
        }

        return distinctAuthors.map((author, index) =>
            <button type="submit" name={author} onClick={e => this.handleSelection(e)} key={index}>{author}</button>
        )   
    }

    /**
     * When a button is clicked determine if it matches
     */
    handleSelection(e) {
        e.preventDefault();
        const author = e.target.attributes.name.nodeValue;
        const confirmAuthor = this.state.question.resultsAuthor;

        // find the index in this.state.question.resultsAuthor
        const index = confirmAuthor.indexOf(author);

        if (index === 0) {
            return (
                alert("You got it!"),
                this.setState(prevScore => {
                    prevScore.score += 1
                }),
                document.location.reload()
            )
        } else {
            alert("Try again!");
        }
    }

    render() {
        if (this.error) {
            return ( <p> { this.error } </p>)
        }

        return ( 
                <div>
                    <label>
                        <p>Who is the author of {this.state.question.resultsTitle[0]}?</p>
                    </label> 
                    <br />
                        {this.ensureDifferentAuthors()}      
                </div>
                )
    }
}