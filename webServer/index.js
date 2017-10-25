var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//for defult page
app.use(express.static('public'));

//use module to route post
var addStoryAndTask = require('./add/addStoryAndTask');
app.post('/addStoryAndTask', addStoryAndTask.index);

var searchStoryAndTask = require('./Search/searchStoryTask');
app.post('/searchStoryTask', searchStoryAndTask.index);




//use module to route get
var fetchStoryAndTask = require('./fetch/fetchStoryTask');
app.get('/fetchStoryAndTask', fetchStoryAndTask.index);


/*
app.post("/addStory", function(req,res){
	console.log(req.body);
	
})
*/

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port'));
});



/*
app.get('/',function(req,res){
	res.type('text/plain');
	res.send('nodejs is working');
});

app.use(function(req,res,next){
	var err = new Error('Not Found');
	next(err);
});

app.use(function(err,req,res,next){
	res.type('text/plain');
	res.send('Something is wrong');
});

*/