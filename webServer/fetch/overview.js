exports.index = function(req,res){

var username = req.session.username;
var role = req.session.role;
var direction_home = 'home_'+username+'.html';
var direction = 'public/overview_'+username+'.html';
var content ="";

var exec = require('child_process').exec;
exec('python ./src/statistics/pie.py'+' '+username+' ',function(error,stdout,stderr){
	if(stdout.length >0){
		content += "<div><img src='../fetch/overview_"+username+".jpg'/></div>";
	} else{
		content += 'You don not have story';

	}
	if(error){
		content += console.info('stderr:'+stderr);
	}
	setTimeout(function(){
	console.log("content = "+content)
},3000);
	var fs_body = require('fs');   
	fs_body.writeFile(direction, content, function(err){

				if (err) {
					return console.error(err);
											}
				console.log('overview done');

				setTimeout(function(){
				res.sendfile(direction)
			},3000);

								});  

})







}

