import React, {Component} from 'react';
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
checkConnectivity();
    
class Elasticsearch extends Component{
    render() {
            return (
                <div id="elasticsearch">
                    <p>{checkConnectivity()}</p>
                </div>
            )
        }     
    }


export default Elasticsearch;