exports.index = function(req,res){

var username = req.session.username;
var role = req.session.role;
var direction = 'public/storyResult_final_'+username+'.html';

var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	var keyword = req.body.searchbox;
	displaySql = "select * from story where "+role+"='"+username+"'";
	console.log('displaySql = '+displaySql);

	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[search error] - ', err.message);
			return;
		}
		

		if (result==''){
			res.write('no stories are under your name');

		}
		
		var fs = require('fs');
		var fs_body = require('fs');
		var content = '';
		var htmlHeader = '';
		
		fs.readFile('Search/editResult.html', function(err,data){
		if (err){
		return console.error(err);
				}

		htmlHeader = data.toString();
		content = htmlHeader+content;

		
		var listAll='';
		//var old = '';
		for (var i = 0; i < result.length; i++){ 

			// !=null is added for the case that either story/task is successfully saved in db but its story or task not
			// input cannot be used to show records, all the stings after space cannot be shown (whole record is picked up from db)
			//if (result[i].parent != old && result[i].parent != null){

            listAll +="<tr>"+
            			
            			"<th bgcolor='#BEBEBE'>" + result[i].title + "</th>" +   

            			 "<td bgcolor='#BEBEBE'>" + result[i].status + "</td>"+                      

                         "<td bgcolor='#BEBEBE'>" + result[i].level + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].owner + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].deadline + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].description + "</td>" +
                         
                         //"<th bgcolor='#BEBEBE'><button bgcolor='#BEBEBE'type='button' id='delete'>Delete</button></th>"+
                         
                         
                         "</tr>";
                         
                         

	        //};

	       
            //old = result[i].parent;
            
		};

		listAll += "</thead>"+
					
					"</body></html>";

		 content = content + listAll;	

		
		fs_body.writeFile(direction, content, function(err){

			if (err) {
			return console.error(err);
					}
		console.log('searchResult_final done');

		});

		});
		//res.write(listAll);
		setTimeout(function(){
			res.sendfile(direction)
		},8000);
		


		});


	//res.redirect('/');

	connection.end();

	};