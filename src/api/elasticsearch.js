import { Component } from 'react';
import elasticsearch from 'elasticsearch';

//'https://booktracker-elastic.herokuapp.com/'

export const client = new elasticsearch.Client({
    host: [
            {
                protocol: 'https',
                host:'5c9e2ac52bc546d8b58a1b0b5752a0a1.us-west1.gcp.cloud.es.io',
                port: 9243,
                auth: process.env.REACT_APP_LOGIN,
            }
        ], 
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