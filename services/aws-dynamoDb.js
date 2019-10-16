var AWS = require('aws-sdk');
let awsConfig = {
    'region': 'ap-southeast-1',
    'endpoint': 'https://dynamodb.ap-southeast-1.amazonaws.com',
    'accessKeyId': 'AKIAWSVVCTAK2GY7VBW2',
    'secretAccessKey': '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'
}
AWS.config.update(awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-1" });

module.exports = {
    add: user => {
        //const ddb= new AWS.DynamoDB({apiVersion:"2012-10-08"});
        return new Promise((resolve, reject) => {  

            const params = {
                TableName: "wnc_user",
                Item: {
                    userId: user.name,
                    password: user.pass
                },
            }
            docClient.put(params, function (err, data) {
                console.log(data);
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}
    
