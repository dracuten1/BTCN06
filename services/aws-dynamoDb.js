var AWS = require('aws-sdk');

let awsConfig = {
    'region': 'ap-southeast-1',
    'endpoint': 'https://dynamodb.ap-southeast-1.amazonaws.com',
    'accessKeyId': 'AKIAWSVVCTAK7JEVFKDC',
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
    },
    get: async (name) => {
        const params = {
            TableName: "wnc_user",
            Key: {
                userId: name,
            }
        }
        try {
            return await docClient.get(params).promise();
        } catch (err) {
            throw err;
        }
    }
}

