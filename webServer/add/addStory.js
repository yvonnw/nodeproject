/* GET addStory page. */

// module
exports.index = function(req,res){
	//get the value from post
    var addStoryTitle = req.body.addStoryTitle;
    var addStoryDes = req.body.addStoryDes;
    var addStoryP = req.body.addStoryPriority;
    var addStoryD = req.body.addStoryDeadline;

	//console.log(addStoryTitle);
	//console.log(addStoryDes);
    console.log(req.body);

    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();
	
	//get data from page
	//var storyTitle = document.getElementById("addStoryTitle");
	


	var addSql = "insert into story(title, description, level, deadline) values('"+addStoryTitle+"', '"+addStoryDes+"', '"+addStoryP+"', '"+addStoryD+"')";

	//var addSql = 'insert into story(owner, title) values("yv", "insert record from node")';
	connection.query(addSql, function(err, result){
		if(err){
			console.log('[insert error] - ', err.message);
			return;
		}
		console.log('------------------------insert');

	});

};








