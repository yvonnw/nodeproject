exports.index = function(req,res){

var username = req.session.username;
var role = req.session.role;
var direction_home = 'home_'+username+'.html';
var direction = 'public/overview_'+username+'.html';
var content ="";

var exec = require('child_process').exec;
exec('python ./src/statistics/pie.py'+' '+username+' ',function(error,stdout,stderr){
	if(stdout.length >0){
		content += "<div><img src='overview_"+username+".jpg'/></div>";
	} else{
		content += 'You don not have story';

	}
	if(error){
		content += console.info('stderr_pie:'+stderr);
	}

	var exec_cp = require('child_process').exec; //change save path in plt.savefig of pie.py doesn't work
		exec_cp("cp overview_"+username+".jpg public/",function(error,stdout,stderr){
		if(error){
			console.log("copy error: "+stderr);
		}


	}) //exec_cp
	
})//exec


		///////////////////////////////////////////////////////////////////
var exec_bar = require('child_process').exec;
exec_bar('python ./src/statistics/bar.py'+' '+username+' ',function(error,stdout,stderr){
	if(stdout.length >0){
		content += "<div><img src='progerss_"+username+".jpg'/></div>";
	} else{
		content += 'You don not have story';

	}
	if(error){
		content += console.info('stderr_bar:'+stderr);
	}

	var exec_cp_bar = require('child_process').exec; //change save path in plt.savefig of bar.py doesn't work
		exec_cp_bar("cp progerss_"+username+".jpg public/",function(error,stdout,stderr){
		if(error){
			console.log("bar copy error: "+stderr);
		}

		var fs_body = require('fs');   
		fs_body.writeFile(direction, content, function(err){

				if (err) {
					return console.error(err);
											}
				console.log('overview done');

				setTimeout(function(){
				res.sendfile(direction)
			},3000);

		});  //writeFile
	}) //exec_cp_bar
	
})//exec_bar

///////////////////////////////////////////////////////////////////////////////////////////////////////




}

