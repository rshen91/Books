import React, { Component } from 'react';
import { client } from '../api/elasticsearch.js';
import moment from 'moment';

export default class ViewBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titles: [],
            isLoading: false,
            error: null,
        };
    }

    async getQueryResults() {
        let now = moment().format();
        this.setState({
            isLoading: true
        });
        await client.search({
            index: 'books',
            type: 'doc',
            body: {
                query: {
                    "range": {
                        "Last_Finished": {
                            "lte": now
                        }
                    }
                },
                "size": 5,
                "sort": [{
                    "Last_Finished": {
                        "order": "desc"
                    }
                }],

            }
        }).then((body) => {
            let hits = body.hits.hits;
            let results = [];
            hits.forEach(i => {
                results.push(i._source.Title);
            })
            console.log(results);
            this.setState(() => {
                return {
                    titles: results,
                    isLoading: false
                }
            }, function (error) {
                let results = error;
                this.setState({
                    isLoading: false,
                    error: results
                })
            })
        })
        console.log(this.state.titles)
    }


    makeResultsIntoArray(props) {
        let array = [];
        for (let i = 0; i < props.length; i++) {
            array.push( <li key = {i}> {props[i]} </li>);
        }
        return array;
    }

    componentDidMount() {
        this.getQueryResults();
    }

    render() {
        const { error, isLoading, titles } = this.state;

        if (error) {
            return ( <p> { error } </p>)
        }

        if (isLoading) {
            return ( <p> Loading... </p>)
        }

        return ( 
        <div>
            <form className = "form">
                <ul className = "list-group list-group-flush"> 
                    {this.makeResultsIntoArray(titles)} 
                </ul>  
            </form>  
        </div>
        )
    }
}