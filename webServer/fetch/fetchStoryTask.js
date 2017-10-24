exports.index = function(req,res){


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

		//res.send(tArrTitle, tArrDeadline, tArrLevel, tArrOwner);


	});
*/

	//fetch story from db
	
	//displaySql = "select * from story";
	displaySql = "select * from story as s left join task t on s.parent=t.tparent";
	
	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[story display error] - ', err.message);
			return;
		}
		console.log('------------------------story display');
		console.log(result);
		console.log(result.length);
		console.log('------------------------story display');

		var sArrTitle = new Array();
		var sArrDescription = new Array();
		var sArrDeadline = new Array();
		var sArrLevel = new Array();
		var sArrOwner = new Array();
		var storyList = "<table align='left'><thead><tr><th><div align='left'>Title</div></th><th><div align='left'>Description</div></th><th><div align='left'>Priority</div></th>"+

                           "<th><div align='left'>Owner</div></th><th>Deadline</div></th></tr>";

		for (var i = 0; i < result.length; i++){
			//sArrTitle[i] = result[i].title;
			//sArrDescription[i] = result[i].description;
			//sArrDeadline[i] = result[i].deadline;
			//sArrLevel[i] = result[i].level;
			//sArrOwner[i] = result[i].owner;
			//res.write(sArrTitle[i]);        

            storyList +="<tr><td bgcolor='#BEBEBE'>" + result[i].title + "</td>" +

                         "<td bgcolor='#BEBEBE'>" + result[i].description + "</td>" +

                         "<td bgcolor='#BEBEBE'>" + result[i].level + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].owner + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].deadline + "</td>"+
                         "</tr>"+

                         "<tr><td>" + result[i].ttitle + "</td>" +                         

                         "<td>" + result[i].tlevel + "</td>"+

                         "<td>" + result[i].towner + "</td>"+

                         "<td>" + result[i].tdeadline + "</td>"+

                         "</tr>";         
		}
		storyList += "</thead></table>";
		res.write(storyList);

		});

		//res.send(sArrTitle, sArrDescription, sArrDeadline, sArrLevel, sArrOwner);
		

		




	//res.redirect('/');

	connection.end();

	};