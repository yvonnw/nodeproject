// module
exports.index = function(req,res){
	//get user value from post
	console.log('goto register.js')
    var username = req.body.username;
    var password = req.body.password;
    var mailbox = req.body.mailbox;
    var role = req.body.role;

	console.log(req.body);
    

    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	var goahead = '';
	//add user to db
	var userQuery = "select * from user_query where username = '"+username+"'";
	connection.query(userQuery, function(err, result){
		if(err){
			console.log('[user query error] - ', err.message);
			return;
		}
		if (result != ''){
			res.redirect('signUp_again.html')
			return;
		}
		if (result == ''){
		goahead = 'yes';
		console.log('goahead1 ='+goahead);		
		}
	//}); //user query

	if (goahead == 'yes'){
		console.log('goahead2 ='+goahead);

		var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();
	
	var addUSql = "insert into user(username, password, mailbox, role) values('"+username+"', '"+password+"', '"+mailbox+"', '"+role+"')";
			console.log('addUSql ='+addUSql);
			
			connection.query(addUSql, function(err, result){
			if(err){
				console.log('[user insert error] - ', err.message);
				return;
			}
			console.log('------------------------user insert');
			res.redirect('signin.html');
			return;

		});		

	};	//if goahead

	//}); //query
	

connection.end();
}