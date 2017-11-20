var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
//for defult page
app.use(express.static('public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie:{
		maxAge: 1000*60*30
	}	
	
}));

//##################################################

//app.get('/', function(req,res){
//	res.sendfile('public/signin.html');
/*	
	if (req.session.username){
		console.log(req.session);
		//res.send('welcome'+req.session.username+'again');
		res.sendfile('public/home.html')
		}
	else {
		req.session.username = 'index.js';
		req.session.role = 'you';
		res.end('sign in')
		//res.sendfile('public/home.html')
		}
*/	
//});
/*
app.get('/home.html', function(req,res){
	//res.sendfile('public/home.html');
	console.log(req.session.username);
	res.send(req.session.username);
	res.end();
})

*/


//###################################################


//use module to route post


var login = require('./login/login');
app.post('/login', login.index);

var addStoryAndTask = require('./add/addStoryAndTask');
app.post('/addStoryAndTask', addStoryAndTask.index);

var searchStoryAndTask = require('./Search/searchStoryTask');
app.post('/searchStoryTask', searchStoryAndTask.index);

var saveChange = require('./save_change/saveChange');
app.post('/saveChange', saveChange.index);

var deleterecord = require('./delete/delete');
app.post('/delete', deleterecord.index);

var registerUser = require('./register/register');
app.post('/register', registerUser.index);


/*
var home = require('./home/home');
app.post('/home', home.index);
app.get('/home', home.index);
*/
var addStory = require('./add/addStory');
app.post('/addStory', addStory.index);


//use module to route get
var fetchStoryAndTask = require('./fetch/fetchStoryTask');
app.get('/fetchStoryAndTask', fetchStoryAndTask.index);

var fetchStory = require('./fetch/fetchStory');
app.get('/fetchStory', fetchStory.index);

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