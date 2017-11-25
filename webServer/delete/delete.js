// module
exports.index = function(req,res){

	console.log('i am here in delete.js');
	console.log(req.body);
	var category = req.body.category;
	var deleteTitle = req.body.deleteTitle;
	

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();


	if (category == 'story'){
	var deleteSql_s = "delete from story where title='"+deleteTitle+"'";
	console.log('deleteSql_s = '+deleteSql_s);

			connection.query(deleteSql_s, function(err, result){
			if(err){
			console.log('[delete error_story] - ', err.message);
			return;
					};
			console.log('delete story is done');
			res.send(200);
			  });
	
		};

	if (category == 'task'){
	var deleteSql_t = "delete from task where ttitle='"+deleteTitle+"'";
	console.log('deleteSql_t = '+deleteSql_t);

			connection.query(deleteSql_t, function(err, result){
			if(err){
			console.log('[delete error_task] - ', err.message);
			return;
					};
			console.log('delete task is done');
			  });
	
		};
		
	connection.end();

}