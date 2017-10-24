/* GET addStory page. */

// module
exports.index = function(req,res){
	//get story value from post
    var addStoryTitle = req.body.addStoryTitle;
    var addStoryDes = req.body.addStoryDes;
    var addStoryP = req.body.addStoryPriority;
    var addStoryD = req.body.addStoryDeadline;

	console.log(req.body);
    

    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	//add story to db
	
	var addSSql = "insert into story(title, description, level, deadline, parent) values('"+addStoryTitle+"', '"+addStoryDes+"', '"+addStoryP+"', '"+addStoryD+"', '"+addStoryTitle+"')";

	//var addSql = 'insert into story(owner, title) values("yv", "insert record from node")';
	connection.query(addSSql, function(err, result){
		if(err){
			console.log('[story insert error] - ', err.message);
			return;
		}
		console.log('------------------------story insert');

	});



	//add task to db

	//get task value from post
    var count = req.body.hiddenCount;

    while (count>0){
    	// convert string to variable name
    	var addTaskTitle = eval('req.body.tTitle'+count);
    	var addTaskP = eval('req.body.tPriority'+count);
    	var addTaskD = eval('req.body.tdeadline'+count);
    	
    	//console.log(count);    	      	    	
    	
    	var addTSql = "insert into task(ttitle, tlevel, tdeadline, tparent) values('"+addTaskTitle+"', '"+addTaskP+"', '"+addTaskD+"', '"+addStoryTitle+"')";

		//var addSql = 'insert into story(owner, title) values("yv", "insert record from node")';
		connection.query(addTSql, function(err, result){
		if(err){
			console.log('[task insert error] - ', err.message);
			return;
			}
		console.log('------------------------task insert');

		

    	});

    count = count-1;	

};
	connection.end();

	res.redirect('/addStoryAndTask.html');

};








