var content ="";
var username = "yv_po"
var exec = require('child_process').exec;
exec('python ../src/statistics/pie.py'+' '+username+' ',function(error,stdout,stderr){
	if(stdout.length >0){
		console.log("i am in line6 of demojs")
		content = "<div><img src='../fetch/overview_"+username+".jpg/></div>";
	} else{
		content = "You don not have story";

	}
	if(error){
		content = console.info("stderr:"+stderr);
	}
	setTimeout(function(){
	console.log("content = "+content)
},3000);

});

