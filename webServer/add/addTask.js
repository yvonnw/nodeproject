/* GET addStory page. */

// module
exports.index = function(req,res){
	
    var username = req.session.username;
    var addT_storyTitle = req.session.addT_storyTitle;

	console.log(req.body);
    

    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();



	//add task to db

	//get task value from post
    var count = 0;
    var addT_storyTitle = req.session.addT_storyTitle;
    if (req.body.hiddenCount != ''){
    	count = req.body.hiddenCount;
    }

    while (count>=0){
    	// convert string to variable name
    	var addTaskTitle = eval('req.body.tTitle'+count);
    	var addTaskP = eval('req.body.tPriority'+count);
    	var addTaskD = eval('req.body.tDeadline'+count);
    	var addTaskDes = eval('req.body.tDescription'+count);
    	
    	
    	
    	//console.log(count);    	      	    	
    	
    	var addTSql = "insert into task(ttitle, tlevel, tdeadline, tparent, master, tdescription) values('"+addTaskTitle+"', '"+addTaskP+"', '"+addTaskD+"', '"+addT_storyTitle+"', '"+username+"', '"+addTaskDes+"')";

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

	var direction = 'home_'+username+'.html';	
	res.redirect(direction);
	//res.redirect('/addStoryAndTask.html');

};








