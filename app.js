var Hapi = require('hapi');
var paypal = require('paypal-rest-sdk');
var braintree = require('braintree');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var config = require('./config');
var testData = require('./data');
var paypalModule = require('./paypalModule');
var braintreeModule = require('./braintreeModule');
var saveFile = require('./saveFileModule');
// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: config.server.host,
    port: config.server.port
});

// Config zone
server.views({
    engines: {
        //html: require('handlebars')
        ejs: require('ejs')
    },
    relativeTo: __dirname
});
 paypal.configure({
    'mode': config.paypal.mode,
     //'client_id': 'AUJW46zCFgHw29crdXHlCpdm3285KaVibddTSanu9FKraU8lWfCinASD3Ee8yoRvPArVteI9-4Lk6yQO',
     //'client_secret': 'EPnkz2ixrQSaDqhNyPTDIVmWX819J-t_Fwmd45Ular_FVNS9txkzZ3INGZLdbawnHp-8HHPj4gPmvZTo'
    'client_id': config.paypal.client_id,
    'client_secret': config.paypal.client_secret
});

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.braintree.merchantId,
  publicKey: config.braintree.publicKey,
  privateKey: config.braintree.privateKey
});

var viewFile={rootPath:'index',testPath:'test'}




var rootHandler = function (req,res) {
  var params=req.payload;
  var currency = ['usd','eur','aud'];
  if(params.creditCard.toString().indexOf('-') >= 0){
    params.creditCard = params.creditCard.toString().replace('-','');
  }
  if(params.currency.toLowerCase()!='usd'&&params.cardType.toLowerCase()=='amex'){
    res.view(viewFile.rootPath,{success:false,result:{result:false,message:'AMEX is possible to use only for USD'},payment:'error',data:testData.data});
  }else {
    if(params.cardType.toLowerCase() == 'amex'||currency.indexOf(params.currency.toLowerCase())>=0){
      //// Paypal
        paypalModule(paypal,params,function(result,success){
          console.log(result);
          res.view(viewFile.rootPath,{success:success,result:result,payment:'Paypal',data:testData.data});
          saveFile(params,result,success,config.datatable.path);
       });
    }else {
      //// Braintree
      braintreeModule(gateway,params,function(result,success){
        console.log(result);
        res.view(viewFile.rootPath,{success:success,result:result,payment:'Braintree',data:testData.data});
        saveFile(params,result,success,config.datatable.path);
      });
    }
  }
}

  var testHandler = function (req, res) {
        var data = testData.data[req.params.testData];
        if(data.length == 0){
          res('No data');
        }else {
          var params = data.payment;
          var currency = ['usd','eur','aud'];
          if(params.creditCard.toString().indexOf('-') >= 0){
            params.creditCard = params.creditCard.toString().replace('-','');
          }
          if(params.currency.toLowerCase()!='usd'&&params.cardType.toLowerCase()=='amex'){
            res.view(viewFile.testPath,{success:false,result:{result:false,message:'AMEX is possible to use only for USD'},payment:'error',data:testData.data});
          }else {
            if(params.cardType.toLowerCase() == 'amex'||currency.indexOf(params.currency.toLowerCase())>=0){
              //// Paypal
                paypalModule(paypal,params,function(result,success){
                  console.log(result);
                  res.view(viewFile.testPath,{success:success,result:result,payment:'Paypal',data:testData.data});
                  saveFile(params,result,success,config.datatable.pathTest);
               });
            }else {
              //// Braintree
              braintreeModule(gateway,params,function(result,success){
                console.log(result);
                res.view(viewFile.testPath,{success:success,result:result,payment:'Braintree',data:testData.data});
                saveFile(params,result,success,config.datatable.pathTest);
              });
            }
          }
    }
  }

var selectData = function(callback){
  var url = 'mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.db;
  var findRestaurants = function(db, callback) {
     var cursor =db.collection('payment').find( );
     cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
           console.dir(doc);
        } else {
           callback();
        }
     });
  };

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function() {
        db.close();
        callback('finish');
    });
  });
}

  // Add the route
  server.route({
      method: 'GET',
      path:'/',
      handler: function (req, res) {
        res.view('index');
      }
  });
  server.route({
      method: 'POST',
      path:'/',
      handler: rootHandler
  });

  server.route({
      method: 'GET',
      path:'/test',
      handler: function (req, res) {
         res.view('test',testData);
      }
  });
  server.route({
      method: 'POST',
      path:'/test{testData}',
      handler: testHandler
  });

// Start the server
server.start();
