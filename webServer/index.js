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
/*
var nodemailer = require('nodemailer');
			var transporter = nodemailer.createTransport({
				host: 'smtp.sina.com',//'smtp-mail.outlook.com',
				secureConnection: true,
				port: 465,//587,
				auth: {					
					user: 'mail_from_node@sina.com',
					pass: '12345678',
				}
			})

app.get('/send', function(req,res){
	var mailOptions = {
				from: 'mail_from_node@sina.com',//'mail_from_node@sohu.com',
				to: 'shadowying_1107@sina.com, mail_from_node@sina.com',
				subject: 'Wonderful day starts from jobs',
				text: 'You have a job, please check.',
			};
			transporter.sendMail(mailOptions, function(err, info){
				if (err){
					console.log('send mail error'+err);
					//res.send('send mail error'+err);
					return;
				}
				console.log('send mail --------------  success');
			})
	
});

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

var addStory = require('./add/addStory');
app.post('/addStory', addStory.index);

var addTask = require('./add/addTask');
app.post('/addTask', addTask.index);

var addT_storyTitle = require('./add/addT_storyTitle');
app.post('/addT_storyTitle', addT_storyTitle.index);


//use module to route get
var fetchStoryAndTask = require('./fetch/fetchStoryTask');
app.get('/fetchStoryAndTask', fetchStoryAndTask.index);

var createTask = require('./add/fetchStoryTask');
app.get('/createTask', createTask.index);

var fetchStory = require('./fetch/fetchStory');
app.get('/fetchStory', fetchStory.index);

var editStory = require('./Search/editStory');
app.get('/editStory', editStory.index);

var editTask = require('./Search/editTask');
app.get('/editTask', editTask.index);

var delStory = require('./Search/delStory');
app.get('/delStory', delStory.index);

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