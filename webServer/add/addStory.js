/* GET addStory page. */

// module
exports.index = function(req,res){
	//get story value from post
    var addStoryTitle = req.body.addStoryTitle;
    var addStoryDes = req.body.addStoryDes;
    var addStoryP = req.body.addStoryPriority;
    var addStoryD = req.body.addStoryDeadline;

	console.log(req.body);
    var po = req.session.username;
    console.log('re.session.username_add story = '+po);

    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	//add story to db
	
	
    var count = req.body.hiddenCount;

    while (count>=0){
    	// convert string to variable name
    	var sTitle = eval('req.body.sTitle'+count);
    	var sPriority = eval('req.body.sPriority'+count);
    	var sDeadline = eval('req.body.sDeadline'+count);
    	var sDescription = eval('req.body.sDescription'+count);
    	var sAssign2 = eval('req.body.sAssign2'+count);  	
    	    	
    	var addTSql = "insert into story(title, level, deadline, parent, description, owner, po, master) values('"+sTitle+"', '"+sPriority+"', '"+sDeadline+"', '"+addStoryTitle+"', '"+sDescription+"', '"+sAssign2+"', '"+po+"', '"+sAssign2+"')";
	
		connection.query(addTSql, function(err, result){
		if(err){
			console.log('[story insert error] - ', err.message);
			res.send ('[story creation error] - ', err.message);
			return;
			}
		console.log('------------------------story insert');

		

    	});

    count = count-1;	

};
	connection.end();

	var direction = 'home_'+po+'.html';	
	res.redirect(direction);

};








