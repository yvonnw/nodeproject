// module
exports.index = function(req,res){

	console.log('i am here!!!!!!!!!!!!!!');
	console.log(req.body);
	/*
	//  extra string from hidden fields varies, cannot find a way to get the valid value by cutting, so this way is given up. since spending 
	// a lot of time to study it, this part of code is reserved.
	console.log(' type of hiddenTitle = ');
	console.log(typeof req.body.hiddenTitle);
	// switch from object to string
	var changedTitle = JSON.stringify(req.body.hiddenTitle);
	var changedField = JSON.stringify(req.body.hiddenField);
	var changedValue = JSON.stringify(req.body.hiddenvalue);
	console.log(' type of changedTitle = ');
	console.log(typeof changedTitle);
	console.log('changedTitle = ');
	console.log(changedTitle);

	// ["__html story ",""] some extra string is attached in request
	var insertStr = '^^^^'
	changedTitle = changedTitle.replace('["',"^^^^");
	changedTitle = changedTitle.replace('","","","","","","","","","","","","","","","","","",""]',"^^^^");	    
	var	ary = changedTitle.split("^^^^");
		changedTitle = ary[1];
    console.log('changed title after cut');
    console.log(changedTitle);
   
	changedField = changedField.replace('["',"^^^^");
	changedField = changedField.replace('","","","","","","","","","","","","","","","","","",""]',"^^^^");	    
		ary = changedField.split("^^^^");
		changedField = ary[1];
    console.log('changed field after cut');
    console.log(changedField);

    changedValue = changedValue.replace('["',"^^^^");
	changedValue = changedValue.replace('","","","","","","","","","","","","","","","","","",""]',"^^^^");	    
	var	ary = changedValue.split("^^^^");
		changedValue = ary[1];
    console.log('changed Value after cut');
    console.log(changedValue);
    */
    var updateSql_s = '';
    var changedTitle = req.body.changedTitle;
    var changedField = req.body.changedField;
    var changedValue = req.body.changedValue;
    var category = req.body.category
    console.log(' type of changedTitle = ');
	//console.log(typeof req.body.changedTitle);
	console.log('changedTitle = '+changedTitle);
	console.log('changedField = '+changedField);
	console.log('changedValue = '+changedValue);
	console.log('category = '+category);

    switch(changedField)
		{

		case 'owner':
			updateSql_s = "update story set owner='"+changedValue+"' where title='"+changedTitle+"'";			
			break;
		case 'priority':
			updateSql_s = "update story set level='"+changedValue+"' where title='"+changedTitle+"'";	
			break;
		case 'status':
			updateSql_s = "update story set status='"+changedValue+"' where title='"+changedTitle+"'";				
			break;
		case 'deadline':
			updateSql_s = "update story set deadline='"+changedValue+"' where title='"+changedTitle+"'";				
			break;
		case 'description':
			updateSql_s = "update story set description='"+changedValue+"' where title='"+changedTitle+"'";				
			break;
		};


	var updateSql_t = '';
    

    switch(changedField)
		{

		case 'owner':
			updateSql_t = "update task set towner='"+changedValue+"' where ttitle='"+changedTitle+"'";			
			break;
		case 'priority':
			updateSql_t = "update task set tlevel='"+changedValue+"' where ttitle='"+changedTitle+"'";	
			break;
		case 'status':
			updateSql_t = "update task set tstatus='"+changedValue+"' where ttitle='"+changedTitle+"'";				
			break;
		case 'deadline':
			updateSql_t = "update task set tdeadline='"+changedValue+"' where ttitle='"+changedTitle+"'";				
			break;
		case 'description':
			updateSql_t = "update task set tdescription='"+changedValue+"' where ttitle='"+changedTitle+"'";				
			break;
		
		};

		console.log('updateSql_s = ');
		console.log(updateSql_s);
		console.log('updateSql_t = ');
		console.log(updateSql_t)



    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	if (category == 'story'){
			connection.query(updateSql_s, function(err, result){
			if(err){
			console.log('[update error_story] - ', err.message);
			return;
					};
			console.log('update story is done');
			  });
	};

	if (category == 'task'){
			connection.query(updateSql_t, function(err, result){
			if(err){
			console.log('[update error_task] - ', err.message);
			return;
					};
			console.log('update task is done');
			  });

	}		
			
	

	connection.end();
};








