import React, { Component } from 'react';
import { client } from '../api/elasticsearch.js';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

export default class SortDate extends Component {
    constructor(props) {
        super(props);
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.getQuestionsData = this.getQuestionsData.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.ensureDifferentAuthors = this.ensureDifferentAuthors.bind(this);

        this.state = {
            items: [
                {
                    resultsTitle: [],
                    resultsAuthor: [],
                    resultsPublished: []
                }
            ],
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
            console.log(body);
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
            let unflippedAuthor = [];
            let resultsPublished = [];
            hits.forEach(i => {
                resultsTitle.push(i._source.Title);
                unflippedAuthor.push(i._source.Author);
                resultsPublished.push(i._source.Published);
            })
            let resultsAuthor = [];
            unflippedAuthor.forEach(author => {
                let name = author.split(", ");
                resultsAuthor.push(`${name[1]} ${name[0]}`);
            });

            this.setState(() => {
                return {
                    items: {
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
        let distinctAuthors =  Array.from(new Set(this.state.items.resultsAuthor));

        for (let i = distinctAuthors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [distinctAuthors[i], distinctAuthors[j]] = [distinctAuthors[j], distinctAuthors[i]]; 
        }

        return distinctAuthors.map((author, index) =>
            <button type="submit" name={author} onClick={e => this.handleSelection(e)} key={index}>{author}</button>
        )   
    }

    SortableItem = SortableElement(({value}) =>
        <li>{value}</li>
    );

    SortableList = SortableContainer(({items}) => {
        return (
            <ul>
            {items.map((value, index) => (
                <SortDate key={`item-${index}`} index={index} value={value} />
            ))}
            </ul>
        );
    });

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
                    <label>
                        <p>Order the books in order of first published to last published</p>
                    </label> 
                    <br />
                    {this.ensureDifferentAuthors()}      
                    <SortDate items={this.state.items} onSortEnd={this.onSortEnd} />;
                </div>
        )
    }
}