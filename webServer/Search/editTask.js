exports.index = function(req,res){

var username = req.session.username;
var role = req.session.role;
var direction_home = 'home_'+username+'.html';
var direction = 'public/taskResult_final_'+username+'.html'

var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	

	//fetch story and task from db	
	
	displaySql = "select * from story as s left join task t on s.parent=t.tparent where s.owner='"+username+"' and s.status != 'closed'";
	
	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[story display error] - ', err.message);
			return;
		}
		//console.log('------------------------story and task display');
		//console.log(result);
		//console.log(result.length);
		//console.log('------------------------story and task display');
		if (result==''){
			res.write('no stories are under your name');

		}
		
		var fs = require('fs');
		var content = '';
		var htmlHeader = '';
		
		fs.readFile('Search/editResult.html', function(err,data){
		if (err){
		return console.error(err);
				}


		htmlHeader = data.toString();
		content = htmlHeader+content;

		
		var old = '';
		var listAll =''; //"<table align='left' border='10' cellpadding='10'><caption>Story And Task List</caption><thead><tr><th><div align='left'>Title</div></th><th><div align='left'>Status</div></th><th><div align='left'>Priority</div></th>"+

                           //"<th><div align='left'>Owner</div></th><th>Deadline</div></th><th><div align='left'>Description</div></th></tr>";
		//var listAll = "<table align='left' border='10'><thead><tr><th><div align='left'>Title</div></th><th><div align='left'>Priority</div></th>"+

         //                  "<th><div align='left'>Owner</div></th><th>Deadline</div></th><th><div align='left'>Description</div></th></tr>";

		
		for (var i = 0; i < result.length; i++){			   

			// !=null is added for the cast that either story or task is successfully saved in db but story or task not
			if (result[i].parent != old && result[i].parent != null){

            listAll +="<tr><th bgcolor='#BEBEBE'>" + result[i].title + "</th>" +   

            			 "<th bgcolor='#BEBEBE'>" + result[i].status + "</th>"+                      

                         "<th bgcolor='#BEBEBE'>" + result[i].level + "</th>"+

                         "<th bgcolor='#BEBEBE'>" + result[i].owner + "</th>"+

                         "<th bgcolor='#BEBEBE'>" + result[i].deadline + "</th>"+

                         "<th bgcolor='#BEBEBE'>" + result[i].description + "</th>" +
                         "</tr>"

	        };

	        if (result[i].tparent != null){
	        	
            listAll +="<tr><th>" + result[i].ttitle + "</th>" +  

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
				    "</table>"+"</body></html>";
		content = content + listAll;

		var fs_body = require('fs');   
		fs_body.writeFile(direction, content, function(err){

				if (err) {
					return console.error(err);
											}
				console.log('story and task done');

								});  


		setTimeout(function(){
			res.sendfile(direction)
		},5000);

		});
  });

	//res.redirect('/');

	connection.end();

	};