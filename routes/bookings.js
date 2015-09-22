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
  var image = req.body.image;

  var db = new aws.DynamoDB();

  db.putItem(
    {
      "TableName":"bookings",
      "Item":{
        "id": {"S":experienceID.toString()},
        "UserID" : { "S":myUserId.toString()},
        "experienceDate":{"S":experienceDate},
        "guideName":{"S": guideName },
        "guideContactNumber":{"N":guideContactNumber},
        "experienceTitle":{"S":experienceTitle},
        "experiencePrice":{"S":experiencePrice},
        "experienceID":{"N":experienceID.toString()},
        "image":{"S":image}
      }
    }, function(err, data){
      if (err) {
        console.log(err); // an error occurred
      } else {
        console.log("successful post");
        console.log(data); // successful response
      }
    }
    );
  //console.log(" Item are succesfully intest in table ..................");
};

exports.findAll = function (req, res, next) {
  var params = {
    TableName : "bookings"
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
  var UserID = req.params.userID;
console.log(UserID);
  var db = new aws.DynamoDB();
  var params = {
    TableName : 'bookings',
    IndexName : 'UserID-index',
    KeyConditions :
    {
      "UserID" :
      {
        "AttributeValueList" : [
          {
            "S" : UserID
          }
        ],
        "ComparisonOperator" : "EQ"
      }
    }
  }

  db.query(params, function(err, data) {
    if (err) {
      console.log (err);
    } else {
      var items = data.Items.map(unmarshalItem);
      res.send(items);
    }
  });

};
