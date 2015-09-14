var aws         = require('aws-sdk');
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;

aws.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
aws.config.update({region: 'eu-west-1'});

exports.findAll = function (req, res, next) {
    var params = {
        TableName : "experiences"
    };
    var db = new aws.DynamoDB();

    db.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            var items = data.Items.map(unmarshalItem);
            res.send(items);
        }
    });
};

exports.findById = function (req, res, next) {
    var id = req.params.id;

    var db = new aws.DynamoDB();
    var params = {
        TableName : 'experiences',
        IndexName : 'id-index',
        KeyConditions :
        {
            "id" :
            {
                "AttributeValueList" : [
                    {
                        "N" : id
                    }
                ],
                "ComparisonOperator" : "EQ"
            }
        }
    }

    db.query(params, function(err, data) {
        if (err) {
            console.log (err)
          console.log("Sad Trombone")
        } else {
            var items = data.Items.map(unmarshalItem);
            res.send(items);
        }
    });

};