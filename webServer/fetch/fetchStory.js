exports.index = function(req,res){

//read user role and name from xml which are generated in login.js
/*
var fs = require('fs');				
				var containerXml = '';
				
				fs.readFile('login/temp.xml', function(err,data){
					if (err){
						return console.error(err);
							}

				containerXml = data.toString();
				console.log('login/temp.xml--------------------------------')
				console.log(containerXml)
				console.log('login/temp.xml--------------------------------')
				var xmlreader = require('xmlreader');
				xmlreader.read(containerXml, function(err, res){
						if (err) return console.log(err);
					var userrole = res.role.title.at(0).text();
					var username = res.role.user.at(0).text();
*/
//########################################################################################################################
				
				console.log(req.session);
				var userrole = req.session.role;
				var username = req.session.username;
				var direction = 'public/story_'+username+'.html'
				console.log('username_fetch = '+username);
				console.log('userrole_fetch = '+userrole);

//##################################################################################################################
var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	displaySql = "select * from story where "+userrole+"='"+username+"' and status != 'closed'";
	
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
							var listAll = "<table align='left' border='10' cellpadding='10'><caption>Story List</caption><thead><tr><th><div align='left'>Title</div></th><th><div align='left'>Status</div></th><th><div align='left'>Priority</div></th>"+

					                           "<th><div align='left'>Owner</div></th><th>Deadline</div></th><th><div align='left'>Description</div></th></tr>";
		
		
							for (var i = 0; i < result.length; i++){
					            listAll +="<tr><td bgcolor='#BEBEBE'>" + result[i].title + "</td>" +   

					            			 "<td bgcolor='#BEBEBE'>" + result[i].status + "</td>"+                      

					                         "<td bgcolor='#BEBEBE'>" + result[i].level + "</td>"+

					                         "<td bgcolor='#BEBEBE'>" + result[i].owner + "</td>"+

					                         "<td bgcolor='#BEBEBE'>" + result[i].deadline + "</td>"+

					                         "<td bgcolor='#BEBEBE'>" + result[i].description + "</td>" +
					                         "</tr>"

						        									};	        

							

							listAll += "</thead></table>";						
								
				
							

				            var fs_body = require('fs');   
				            fs_body.writeFile(direction, listAll, function(err){

									if (err) {
									return console.error(err);
											}
								console.log('story done');

								});  

							}); 

	connection.end();

//	});//read role and username
//	});//read temp xml
// setTimeout is needed here to make we have adequate time to generate story page
//res.sendfile(direction);
setTimeout(function(){
	res.sendfile(direction)
},5000);
};