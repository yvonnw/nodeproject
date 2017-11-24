// module
exports.index = function(req,res){
	//get user value from post
	console.log('goto login.js')
    var username = req.body.username;
    var password = req.body.password;
    var direction = 'public/home_'+username+'.html';
    
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
//####################################################################################################################
			//console.log('req.session = '+req.session);
			console.log('req.headers.cookie = '+req.headers.cookie);
			req.session.username = username; //////it needs to remove after log out req.session.username =  null
			req.session.save();
			console.log('req.session.username = '+req.session.username);
			req.session.role = result[0].role; // req.session.role = null
			req.session.save(); /////following pages cannot get username and role without saving, it is so that i spent so many hours to figure out why data always lose
			console.log('req.session.role = '+req.session.role);
			console.log(req.session);

			

//####################################################################################################################

			var userrole = result[0].role;
			console.log('userrole = ' +userrole);
			/* there is risk to transit parameter by file, because it will be overwritten if more users login
			var fs_temp = require('fs');
			var content_temp = "<role><title>"+userrole+"</title><user>"+username+"</user></role>";			
			fs_temp.writeFile('login/temp.xml', content_temp, function(err){

									if (err) {
										return console.error(err);
											}
									console.log('login/temp.xml done');

						});
			*/

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
        				var features = ['search','list','create','edit','del'] 

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
                    			case 'del': var del = res.role.del.at(m).text();
                    			break;
                						}

            			}
			            console.log('search = '+search);
			            console.log('list = '+list);
			            console.log('create = '+create);
			            console.log('edit = '+edit);  
			            console.log('del = '+del);   

			            var content = "<!DOCTYPE html><html><head><meta charset='UTF-8'/><title>Home</title>"+
    			  					  "<script src='https://cdn.bootcss.com/react/15.4.2/react.min.js'></script>"+
    			  					  "<script src='https://cdn.bootcss.com/react/15.4.2/react-dom.min.js'></script>"+
					    			  "<script src='https://cdn.bootcss.com/babel-standalone/6.22.1/babel.min.js'></script>"+
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

				        if (edit == 'story'){
							content+="<div id='editStory'></div><script type='text/babel' src='editstory.js'></script>"
				           }
				        if (del == 'story'){
							content+="<div id='delStory'></div><script type='text/babel' src='delstory.js'></script>"
				           }
				        
				        //content+="<input id='hiddenUsername' type='hidden' name='hiddenUsername' value='"+username+"'/>";
				        //content+="<input id='hiddenrole' type='hidden' name='hiddenrole' value='"+userrole+"'/>";
						content+= htmlEnd;	

						var fs_body = require('fs');
						fs_body.writeFile(direction, content, function(err){

									if (err) {
										return console.error(err);
											}
									console.log('home done');

						});


				
		});//containxml
				
		}); //container
// setTimeout is needed here to make sure we have adequate time to generate home page, TypeError: res.redirect/sendfile is not a function if move redirect/sendfile into writefile.

		setTimeout(function(){
			res.sendfile(direction)
		},3000);

	};//else
}); //check user
connection.end();


} //module