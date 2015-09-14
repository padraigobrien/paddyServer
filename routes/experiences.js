var aws         = require('aws-sdk');

aws.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
aws.config.update({region: 'eu-west-1'});

exports.findAll = function (req, res, next) {
    var experienceData;
    var params = {
        TableName : "experiences"
    };

    var db = new aws.DynamoDB();
    db.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            experienceData = JSON.stringify(data);
            res.send(experienceData);
        }
    });
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(experiences[id]);
};