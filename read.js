const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')


const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}
var li=[]
for(var i=0;i<35;i++){
	li.push(i.toString()+".json");
}
console.log(li)
var resjson=[]
for(var i=0,len=li.length;i<len;i++){
	var tempjson=eval(loadData(li[i]));
	for(var j=0, lenj=tempjson.length;j<lenj;j++){
		resjson.push(tempjson[j]);
	}
}
console.log(resjson)
var jsonArray2 = eval(loadData("0.json"))

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/runoob';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('dbcreated');
    var dbase = db.db("indeed_data_try");
    //dbase.createCollection('site', function (err, res) {
    //    if (err) throw err;
    //    console.log("created");

    //});
        dbase.collection("site").insertMany(resjson, function(err, res) {
        if (err) throw err;
        console.log("total document: " + res.insertedCount);
        db.close();
    });
});