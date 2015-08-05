var fs = require('fs');
var config = require('./config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(orderBy,resultData,success,path){
  var url = 'mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.db;

  var writeMongo = function(db,callback){
      db.collection('payment').insertOne({"creditCard":orderBy.creditCard
       ,"order":orderBy
       ,"result":resultData
      }, function(err, result) {
       assert.equal(err, null);
       console.log("Inserted a document into the payment collection.");
       callback(result);
     });
};

var writeText = function(){
  console.log('Inserted a document into the text file.');
  if(success){
    var saveText = {order:orderBy,result:resultData};
    fs.exists(path,function(response){
      if(!response){
        fs.writeFile(path, JSON.stringify(saveText), function (err) {
          if (err) throw err;
        });
      }else {
        fs.appendFile(path, '\n'+JSON.stringify(saveText), function (err) {
          if (err) throw err;
        });
      }
    });
  }else {
    var saveText = resultData;
    var errorPath = 'errorlog.txt'
    fs.exists(errorPath,function(response){
      if(!response){
        fs.writeFile(errorPath, JSON.stringify(saveText), function (err) {
          if (err) throw err;
        });
      }else {
        fs.appendFile(errorPath, '\n'+JSON.stringify(saveText), function (err) {
          if (err) throw err;
        });
      }
    });
  }
}

MongoClient.connect(url, function(err, db) {
  if(db){
      writeMongo(db,function() {
         db.close();
     });
  }else {
    writeText();
  }
});
}
