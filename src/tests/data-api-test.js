/**
 * not an active test, ignore this
 */

const dotenv = require('dotenv');

var axios = require('axios');
var data = JSON.stringify({
    "collection": "<COLLECTION_NAME>",
    "database": "<DATABASE_NAME>",
    "dataSource": "PlutusCluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-befaw/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'M9a8eLr2F0blkpw6NE0005nOWQoucCn4xao16yxpTZaIjzZZRQ2RL5Edy3wBdy1Q',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
