exports.index = function(req,res){

var username = req.session.username;
var role = req.session.role;
var direction_home = 'home_'+username+'.html';
var direction = 'public/storytask_'+username+'.html'

var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	/*fetch task from db
	
	var displaySql = "select * from task";
	
	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[task display error] - ', err.message);
			return;
		}
		console.log('------------------------task display');
		//console.log(result);
		console.log(result.length);
		console.log('------------------------task display');
		var tArrTitle = new Array();
		var tArrDeadline = new Array();
		var tArrLevel = new Array();
		var tArrOwner = new Array();
		for (var i = 0; i < result.length; i++){
			tArrTitle[i] = result[i].ttitle;
			tArrDeadline[i] = result[i].tdeadline;
			tArrLevel[i] = result[i].tlevel;
			tArrOwner[i] = result[i].towner;
		}

		


	});
*/

	//fetch story and task from db		
	
	var displaySql = "select * from story as s left join task t on s.parent=t.tparent where s.owner='"+username+"' and s.status != 'closed'";
	//#############################################################################################################
	console.log('role = '+role);
	if (role == 'team member'){
		console.log('i am in if of role');
		var userSql = "select * from user where username ='"+username+"'";
		connection.query(userSql, function(err, result){
			if(err){
			console.log('[story display error] - ', err.message);
			return;
					}
			console.log('######master of team member');
			console.log(result);
			console.log('######master of team member');
			if (result[0].master !=''){ //it is must
				req.session.teammember_master = result[0].master
			}
			
		})
		console.log('req.session.teammember_master = '+req.session.teammember_master);
		displaySql = "select * from story as s left join task t on s.parent=t.tparent where s.owner='"+req.session.teammember_master+"' and s.status != 'closed' and t.towner ='"+username+"'";
	}

	//#############################################################################################################
	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[story display error] - ', err.message);
			return;
		}
		//console.log('------------------------story and task display');
		//console.log(result);
		//console.log(result.length);
		//console.log('------------------------story and task display');
		
		var old = '';
		var listAll = "<table align='left' border='10' cellpadding='10'><caption>Story And Task List</caption><thead><tr><th><div align='left'>Title</div></th><th><div align='left'>Status</div></th><th><div align='left'>Priority</div></th>"+

                           "<th><div align='left'>Owner</div></th><th>Deadline</div></th><th><div align='left'>Description</div></th></tr>";
		//var listAll = "<table align='left' border='10'><thead><tr><th><div align='left'>Title</div></th><th><div align='left'>Priority</div></th>"+

         //                  "<th><div align='left'>Owner</div></th><th>Deadline</div></th><th><div align='left'>Description</div></th></tr>";

		
		for (var i = 0; i < result.length; i++){			   

			// !=null is added for the cast that either story or task is successfully saved in db but story or task not
			if (result[i].parent != old && result[i].parent != null){

            listAll +="<tr><td bgcolor='#BEBEBE'>" + result[i].title + "</td>" +   

            			 "<td bgcolor='#BEBEBE'>" + result[i].status + "</td>"+                      

                         "<td bgcolor='#BEBEBE'>" + result[i].level + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].owner + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].deadline + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].description + "</td>" +
                         "</tr>"

	        };

	        if (result[i].tparent != null){
	        	
            listAll +="<tr><td>" + result[i].ttitle + "</td>" +  

            			"<td>" + result[i].tstatus + "</td>"+                        

                         "<td>" + result[i].tlevel + "</td>"+

                         "<td>" + result[i].towner + "</td>"+

                         "<td>" + result[i].tdeadline + "</td>"+

                         "<td>" + result[i].tdescription + "</td>"+

                         "</tr>";    
            };

            old = result[i].parent;

		};

		listAll += "</thead>"+
					"<p><a href='"+direction_home+"'>Back to my home</a></p>"+
				    "</table>";

		var fs_body = require('fs');   
		fs_body.writeFile(direction, listAll, function(err){

				if (err) {
					return console.error(err);
											}
				console.log('story and task done');

								});  


		setTimeout(function(){
			res.sendfile(direction)
		},5000);

		});


	//res.redirect('/');

	connection.end();

	};