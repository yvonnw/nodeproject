// module
exports.index = function(req,res){
	//get user value from post
	console.log('goto login.js')
    var username = req.body.username;
    var password = req.body.password;
    
    console.log('req.body------------------------------');
	console.log(req.body);
    console.log('req.body------------------------------');
    console.log('req.session------------------------------');
    console.log(req.session);
    console.log('req.session------------------------------');
    

    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	//add user to db
	var searchSql = "select * from user where username = '"+username+"' and password = '"+password+"'";
	
	console.log('searchSql ='+searchSql);
	
	connection.query(searchSql, function(err, result){	
		console.log(result);	

		if(result == ''){
			res.redirect('/signin.html'); //keep in login page
			
		} else {
			console.log('------------------------user found');
			req.session.username = username;
			console.log('req.session.username = '+req.session.username);
			req.session.role = result[0].role;
			console.log('req.session.role = '+req.session.role);


			/* 
			file login/temp.xml is used for delivering parameter username and role, 
			there is potential issue that login/temp.xml will be overwritten if there are more then 2 users.
			I tried to save parameter in cookie, but there is conflict between res.cookie and res.sendfile,
			error note 'Error: Can't set headers after they are sent.', so login/temp.xml seems to better way at present.
			I am gonna move on, hopefully, newly better solution will be found soon.
			res.cookie('user',{username: username, userrole: result[0].role}, {maxAge:600000, httpOnly:false});
			*/
			/*
			var serialize = function(name, val, opt){
				var pairs = [name + '=' + val];
				return pairs.join(';');
			}
			res.setHeader('Set-Cookie', serialize('username',username),serialize('role',result[0].role));
			res.writeHead(200);
			*/
			//res.cookie('username', username,{maxAge:600000, httpOnly:true});
			//res.cookie('userrole', result[0].role, {maxAge:600000, httpOnly:true});



			var userrole = result[0].role;
			console.log('userrole = ' +userrole);
			
			var fs_temp = require('fs');
			var content_temp = "<role><title>"+userrole+"</title><user>"+username+"</user></role>";			
			fs_temp.writeFile('login/temp.xml', content_temp, function(err){

									if (err) {
										return console.error(err);
											}
									console.log('login/temp.xml done');

						});


				var fs = require('fs');				
				var containerXml = '';
				//var htmlEnd = '</body></html>'
				//features are customized by role saved in public/container.xml
				fs.readFile('public/container.xml', function(err,data){
					if (err){
						return console.error(err);
							}

				containerXml = data.toString();
				console.log('htmlHeader--------------------------------')
				console.log(containerXml)
				console.log('htmlHeader--------------------------------')
				var xmlreader = require('xmlreader');
				xmlreader.read(containerXml, function(err, res){
						if (err) return console.log(err);
						var m='';
        				if (userrole == 'po'){m=0};
        				if (userrole == 'master'){m=1};
        				if (userrole == 'team member'){m=2};
        				console.log('m = '+m);
        				var features = ['search','list','create','edit'] 

        				for (var i in features){
                			switch (features[i]){
                				case 'search': var search = res.role.search.at(m).text();
                    			break;
                    			case 'list': var list = res.role.list.at(m).text();
                    			break;
                    			case 'create': var create = res.role.create.at(m).text();
                    			break;
                    			case 'edit': var edit = res.role.edit.at(m).text();
                    			break;
                						}

            			}
			            console.log('search = '+search);
			            console.log('list = '+list);
			            console.log('create = '+create);
			            console.log('edit = '+edit);     

			            var content = "<!DOCTYPE html><html><head><meta charset='UTF-8'/><title>Home</title>"+
    			  					  "<script src='https://cdn.bootcss.com/react/15.4.2/react.min.js'></script>"+
    			  					  "<script src='https://cdn.bootcss.com/react/15.4.2/react-dom.min.js'></script>"+
					    			  "<script src='https://cdn.bootcss.com/babel-standalone/6.22.1/babel.min.js'></script>"+
					  				  "<script type='text/javascript' src='jquery-3.2.1.min.js'></script>"+
										"<script>"+
										"$(document).ready(function(){"+
										"document.cookie='username='+document.getElementById('hiddenUsername').value"+
										"document.cookie='userrole='+document.getElementById('hiddenrole').value"+
										"</script>"+
					  				  "</head><body>";
						var htmlEnd = '</body></html>';
						if (search == 'search bar'){
							content+="<div id='searchBar'></div><script type='text/babel' src='searchbar.js'></script>" 
						};
						if (list == 'story'){
							content+="<div id='listStory'></div><script type='text/babel' src='liststory.js'></script>"
				           }//if story
				        if (create == 'story'){
							content+="<div id='createStory'></div><script type='text/babel' src='createstory.js'></script>"
				           }

				        content+="<input id='hiddenUsername' type='hidden' name='hiddenUsername' value='"+username+"'/>";
				        content+="<input id='hiddenrole' type='hidden' name='hiddenrole value='"+userrole+"'/>";
						content+= htmlEnd;	

						var fs_body = require('fs');
						fs_body.writeFile('public/home.html', content, function(err){

									if (err) {
										return console.error(err);
											}
									console.log('public/home.html done');

						});


				
		});//containxml

			//res.sendfile('public/home.html');
				
		}); //container

	};//else
}); //check user
connection.end();
res.sendfile('public/home.html');


} //module