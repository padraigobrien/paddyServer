var aws         = require('aws-sdk');
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;

aws.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
aws.config.update({region: 'eu-west-1'});

exports.createNew = function (req, res, next) {
  var myUserId = req.body.myUserId;
  var guideName = req.body.guideName;
  var experienceDate = req.body.experienceDate;
  var guideContactNumber = req.body.guideContactNumber;
  var experienceTitle = req.body.experienceTitle;
  var experiencePrice = req.body.experiencePrice;
  var experienceID = req.body.experienceID;


  var db = new aws.DynamoDB();

  db.putItem(
    {
      "TableName":"bookings",
      "Item":{
        "id": {"S":"7"},
        "UserID" : { "S":myUserId},
        "experienceDate":{"S":experienceDate},
        "guideName":{"S": guideName },
        "guideContactNumber":{"N":guideContactNumber},
        "experienceTitle":{"S":experienceTitle},
        "experiencePrice":{"S":experiencePrice},
        "experienceID":{"N":experienceID}
      }
    }, function(err, data){
      if (err) {
        console.log(err); // an error occurred
      } else {
        console.log(data); // successful response
      }
    }
    );
  //console.log(" Item are succesfully intest in table ..................");
};
