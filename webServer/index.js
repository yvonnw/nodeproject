var express = require('express');
var path = require('path');

var app = express();

app.set('port',process.env.PORT || 3000);


app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port'));
});

app.use(express.static('public'));

app.get('/',function(req,res){
	res.type('text/plain');
	res.send('nodejs is working');
});
/*
app.use(function(req,res,next){
	var err = new Error('Not Found');
	next(err);
});

app.use(function(err,req,res,next){
	res.type('text/plain');
	res.send('Something is wrong');
});

*/