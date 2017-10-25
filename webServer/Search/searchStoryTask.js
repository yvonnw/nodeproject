exports.index = function(req,res){


var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	var keyword = req.body.searchbox;
	
	displaySql = "select * from story as s left join task t on s.parent=t.tparent";
	
	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[story display error] - ', err.message);
			return;
		}
		//console.log('------------------------story and task display');
		//console.log(result);
		//console.log(result.length);
		//console.log('------------------------story and task display');
		
		
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

                         "</tr>";    
            };

            old = result[i].parent;

		};

		listAll += "</thead></table>";

		res.write(listAll);

		});


	//res.redirect('/');

	connection.end();

	};