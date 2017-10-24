var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	//fetch task from db
	
	var displaySql = "select * from task";
	
	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[task display error] - ', err.message);
			return;
		}
		console.log('------------------------task display');
		console.log(result);
		console.log(result.length);
		console.log('------------------------task display');

		for (var i = 0; i < result.length; i++){
			tArrTitle[i] = result[i].title;
			tArrDeadline[i] = result[i].deadline;
			tArrLevel[i] = result[i].level;
			tArrOwner[i] = result[i].owner;
		}

		res.send(tArrTitle, tArrDeadline, tArrLevel, tArrOwner);


	});


	//fetch story from db
	
	displaySql = "select * from story";
	
	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[story display error] - ', err.message);
			return;
		}
		console.log('------------------------story display');
		console.log(result);
		console.log(result.length);
		console.log('------------------------story display');

		for (var i = 0; i < result.length; i++){
			sArrTitle[i] = result[i].title;
			sArrDescription[i] = result[i].description;
			sArrDeadline[i] = result[i].deadline;
			sArrLevel[i] = result[i].level;
			sArrOwner[i] = result[i].owner;
		}

		res.send(sArrTitle, sArrDescription, sArrDeadline, sArrLevel, sArrOwner);


	});

	connection.end();