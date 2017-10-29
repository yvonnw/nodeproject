// module
exports.index = function(req,res){

	console.log('i am here!!!!!!!!!!!!!!');
	console.log(req.body);
	console.log('hiddenTitle = '); // [ '__html story ', '' ]
	console.log(req.body.hiddenTitle);
	console.log('hiddenField = ');
	console.log(req.body.hiddenField);
	console.log(' type of hiddenTitle = ');
	console.log(typeof req.body.hiddenTitle);
	// switch from object to string
	var changedTitle = JSON.stringify(req.body.hiddenTitle);
	console.log(' type of changedTitle = ');
	console.log(typeof changedTitle);
	console.log('changedTitle = ');
	console.log(changedTitle);

	// ["__html story ",""] some extra string is attached in request
	var insertStr = '^^^^'
	changedTitle = changedTitle.replace('["',"^^^^");
	changedTitle = changedTitle.replace(' ",""]',"^^^^");	    
	var	ary = changedTitle.split("^^^^");
		changedTitle = ary[1];
    console.log('changed title after cut');
    console.log(changedTitle);
   





    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	//update story 
	var updateSql = "update story set '%"+hiddenField+"%'='%"+changed+"%' where title='%"+changedTitle+"%')";
	
	connection.query(updateSql, function(err, result){
		if(err){
			//console.log('[update error] - ', err.message);

			//update task
			updateSql = "update task set '%"+hiddenField+"%'='%"+changed+"%' where ttitle='%"+changedTitle+"%')";

			connection.query(addTSql, function(err, result){
			if(err){
				console.log('[update error] - ', err.message);
				//return;
				}
			//console.log('------------------------update eror');

		

    		});

			return;
		}
		//console.log('------------------------story update');

	});
	

	connection.end();
	
	

};








