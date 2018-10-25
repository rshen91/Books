import { Component } from 'react';
import elasticsearch from 'elasticsearch';

export const client = new elasticsearch.Client({
    host: 'localhost:9200',
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