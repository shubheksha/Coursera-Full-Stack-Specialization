 var MongoClient = require('mongodb').MongoClient;
 var assert = require('assert');

 // Connection URL
var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db){
	assert.equal(err, null);
	console.log('Connected to server.\n');
	var collection = db.collection("dishes");

	//inserting a document
	collection.insertOne({name: "Uthapizza", description: "tesst"},
		function(err, result){
			assert.equal(err, null);
			console.log("After Insert: ");
			console.log(result.ops);

		collection.find({}).toArray(function(err, docs){
			assert.equal(err, null);
			console.log("Found!\n");
			console.log(docs);

		db.dropCollection("dishes", function(err, result){
			assert.equal(err, null);
			db.close();
         });
        });
    });
});

