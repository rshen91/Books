import { Component } from 'react';
import elasticsearch from 'elasticsearch';

// 'https://booktracker-elastic.herokuapp.com/'

export const client = new elasticsearch.Client({
    host: ['https://localhost:9200/', 'http://localhost:9200/'],
    ssl: {
        ca: process.env.CERTIFICATE,
        cert: process.env.CERTIFICATE,
        key: process.env.KEY,
        rejectUnauthorized: false
      },
    apiVersion: '6.3'
});

function checkConnectivity() {
    client.ping({
        requestTimeout: 1000
    }, function (e) {
        if (e) {
            return e.data;
        } else {
            console.log('Elasticsearch is connected')
            return 'Elasticsearch is connected';
        }
    })
}
    
class Elasticsearch extends Component{
    render() {
            return (
                console.log(checkConnectivity())
            )
        }     
    }


export default Elasticsearch;