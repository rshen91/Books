import React, { Component } from 'react';
import { client } from '../api/elasticsearch.js';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => 
    <li lockAxis="y">{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
        {items.map((value, index) => (
            <SortableItem lockAxis="y" key={`item-${index}`} index={index} value={value} />
        ))}
        </ul>
    );
    });


export default class SortDate extends Component {
    constructor(props) {
        super(props)
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.getQuestionsData = this.getQuestionsData.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.splitFormatTitlesProperly = this.splitFormatTitlesProperly.bind(this);

        this.state = {
            items: [],
            isLoading: false,
            error: null,
        };
    }

    /**
     * This function needs to run before generating the questions to 
     * randomly generate five entries that are within the total amount 
     * of book entries
     */
    async getRandomNumber() {
        await client.search({
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
            let resultsPublished = [];
            hits.forEach(i => {
                resultsTitle.push(i._source.Title);
                resultsPublished.push(i._source.Published);
            })
            
            this.setState(() => {
                return {
                    items: resultsTitle,
                    published: resultsPublished,
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

    splitFormatTitlesProperly() {
        let titles = this.state.items[0];
        return titles
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
          items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render() {
        if (this.error) {
            return ( <p> { this.error } </p>)
        }

        return ( 
                <div>
                    <label>Drag and drop the books in order of Published Date</label>

                    <div lockAxis="y"> 
                        <SortableList lockAxis="y" items={this.state.items} onSortEnd={this.onSortEnd}>
                            {this.splitFormatTitlesProperly()}      
                        </SortableList>
                    </div>
                </div>
            )
        }
    }
    
