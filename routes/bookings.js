var aws         = require('aws-sdk');
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;

aws.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
aws.config.update({region: 'eu-west-1'});

exports.createNew = function (req, res, next) {

  var db = new aws.DynamoDB();

  db.putItem(
    {
      "TableName":"bookings",
      "Item":{
        "id": {"S":"1"},
        "experienceDate":{"S":"01 Jan 2012"},
        "guideName":{"S":"Podge O'Brien"},
        "guideContactNumber":{"N":"0868877056"},
        "experienceTitle":{"S":"Walk the metals"},
        "experiencePrice":{"S":"€50"},
        "experienceID":{"N":"1"}
      }
    }, function(err, data){
      if (err) {
        console.log(err); // an error occurred
      } else {
        console.log(data); // successful response
      }
    }
    );
  console.log(" Item are succesfully intest in table ..................");
};
