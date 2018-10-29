import { Component } from 'react';
import elasticsearch from 'elasticsearch';
import fs from 'file-system';

export const client = new elasticsearch.Client({
    host: ['localhost:9200', 'https://booktracker-elastic.herokuapp.com'],
    ssl: {
        ca: fs.readFileSync('/Users/Rachel/src/booktracker/elasticsearch-6.3.2/config/certs/*'),
        rejectUnauthorized: true
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