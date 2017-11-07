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
	displaySql = "select * from story as s left join task t on s.parent=t.tparent where (title like '%"+keyword+"%' or ttitle like '%"+keyword+"%' or description like '%"+keyword+"%')";

	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[search error] - ', err.message);
			return;
		}
		console.log('------------------------search result');
		console.log(result);
		console.log(keyword);
		console.log(req.body);
		console.log('------------------------search result');


		if (result==''){
			res.write('no records match');

		}
		
		var fs = require('fs');
		var fs_body = require('fs');
		var content = '';
		var htmlHeader = '';
		
		fs.readFile('Search/searchResult.html', function(err,data){
		if (err){
		return console.error(err);
				}

		htmlHeader = data.toString();
		content = htmlHeader+content;

		
		var listAll='';
		var old = '';
		for (var i = 0; i < result.length; i++){	
			console.log('i=');		 
			console.log(i);  

			// !=null is added for the case that either story/task is successfully saved in db but its story or task not
			// input cannot be used to show records, all the stings after space cannot be shown (whole record is picked up from db)
			if (result[i].parent != old && result[i].parent != null){

            listAll +="<tr>"+
            			
            			"<th bgcolor='#BEBEBE'>" + result[i].title + "</th>" +   

            			 "<td bgcolor='#BEBEBE'>" + result[i].status + "</td>"+                      

                         "<td bgcolor='#BEBEBE'>" + result[i].level + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].owner + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].deadline + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].description + "</td>" +
                         
                         "<th bgcolor='#BEBEBE'><button bgcolor='#BEBEBE'type='button' id='delete'>Delete</button></th>"+
                         //"<th bgcolor='#BEBEBE'><input id='delete' value='Delete'/></th>"+
                         
                         "</tr>";
                         
                         

	        };

	        if (result[i].tparent != null){

            listAll +="<tr>"+
            			
            			"<th>" + result[i].ttitle + "</th>" +  

            			"<td>" + result[i].tstatus + "</td>"+                        

                         "<td>" + result[i].tlevel + "</td>"+

                         "<td>" + result[i].towner + "</td>"+

                         "<td>" + result[i].tdeadline + "</td>"+
                         
                         "<th></th>" +

                         "<th><button type='button' id='delete'>Delete</button></th>"+
                         //"<th><input id='delete' value='Delete'/></th>"+
                         
                         "</tr>";
                         
            };

            old = result[i].parent;
            
		};

		listAll += "</thead>"+
					
					"</body></html>";

		 content = content + listAll;		

		fs_body.writeFile('public/searchResult_final.html', content, function(err){

			if (err) {
			return console.error(err);
					}
		console.log('searchResult_final done');

		});

		});
		//res.write(listAll);
		res.sendfile('public/searchResult_final.html');


		});


	//res.redirect('/');

	connection.end();

	};