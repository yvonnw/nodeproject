exports.index = function(req,res){

var username = req.session.username;
var role = req.session.role;
var direction_home = 'home_'+username+'.html';
var direction = 'public/pushpool_'+username+'.html'

var addon = require('../src/push/build/Release/addon.node');
var content = addon.push(username);
var fs_body = require('fs');   
fs_body.writeFile(direction, content, function(err){

				if (err) {
					return console.error(err);
											}
				console.log('push pool done');

								});  


setTimeout(function(){
	res.sendfile(direction)
},3000);

}

