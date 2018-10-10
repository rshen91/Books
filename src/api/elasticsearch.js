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
    // createBookDocument: await client.create({
    //     index: 'books',
    //     type: 'doc',
    //     id: '400',
    //     body: {
    //         Title: 'test Title',
    //         '@version': 1,
    //         Author: 'test Author',
    //         Last_Finished: 'test date',
    //         Nationality: 'test Nationality',
    //         Pages: 'test pages',
    //         Published: 'test',
    //         Tally: 'test',
    //         Host: 'test',
    //         Message: 'test',
    //         Tag: 'test'
    //     }
    // })


    
    
//     function(location) {
//       var encodedLocation = encodeURIComponent(location);
//       var requestURL = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
  
//       return axios.get(requestURL).then(function(response){
//         if (response.data.cod && response.data.message){
//           throw new Error(response.data.message);
//         } else {
//           return response.data.main.temp;
//         }
//       }, function(response){
//         throw new Error(response.data.message);
//       });
//     }
//   }