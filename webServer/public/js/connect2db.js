function addStoryAndTask(){
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'agile'
});

connection.connect();

console.log('i am in line 12 of js file');

//get data from page
var storyTitle = document.getElementById("addStoryTitle");
console.log(storyTitle);


var addSql = 'insert into story(title) values(storyTitle)';

//var addSql = 'insert into story(owner, title) values("yv", "insert record from node")';
connection.query(addSql, function(err, result){
	if(err){
		console.log('[insert error] - ', err.message);
		return;
	}
	console.log('------------------------insert');

});
};

