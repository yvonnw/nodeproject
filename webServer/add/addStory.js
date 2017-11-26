/* GET addStory page. */

// module
exports.index = function(req,res){
	//get story value from post
	/*
    var addStoryTitle = req.body.addStoryTitle;
    var addStoryDes = req.body.addStoryDes;
    var addStoryP = req.body.addStoryPriority;
    var addStoryD = req.body.addStoryDeadline;
*/
	console.log(req.body);
    var po = req.session.username;
    console.log('re.session.username_add story = '+po);

    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	
	//add story to db
	
	
    var count = 0
    if (req.body.hiddenCount !=''){ //it is needed in case only one story is added
    	count = req.body.hiddenCount
    };

    while (count>=0){
    	// convert string to variable name
    	var sTitle = eval('req.body.sTitle'+count);
    	var sPriority = eval('req.body.sPriority'+count);
    	var sDeadline = eval('req.body.sDeadline'+count);
    	var sDescription = eval('req.body.sDescription'+count);
    	var sAssign2 = eval('req.body.sAssign2'+count);  	
    	    	
    	var addTSql = "insert into story(title, level, deadline, parent, description, owner, po, master) values('"+sTitle+"', '"+sPriority+"', '"+sDeadline+"', '"+sTitle+"', '"+sDescription+"', '"+sAssign2+"', '"+po+"', '"+sAssign2+"')";
	
		connection.query(addTSql, function(err, result){
		if(err){
			console.log('[story insert error] - ', err.message);
			res.send ('[story creation error] - ', err.message);
			return;
			}
		console.log('------------------------story insert');



    	});

    	//############mail#########################################################
		if (sAssign2 != ''){
			var mailSql = "select * from user where username = '"+sAssign2+"'";
			console.log('mailSql = '+mailSql);
			connection.query(mailSql, function(err, result){
			if(err){
			console.log('[find user error] - ', err.message);
			//res.send ('[story creation error] - ', err.message);
			return;
			}
			console.log('------------------------user found');
			console.log(result);
			var mailList = '';
			mailList += result[0].mailbox;
			console.log('mailList = '+mailList);

			var nodemailer = require('nodemailer');
			var transporter = nodemailer.createTransport({
				host: 'smtp.sina.com',// outlook treats node mail as junk mail, sina smtp is used here, outlook cannot receive all the mails from sina, it works well for mailbox in China (send/receive)
				secureConnection: true,
				port: 465,//587,
				auth: {					
					user: 'mail_from_node@sina.com',
					pass: '12345678',
				}
			})
			var mailOptions = {
				from: 'mail_from_node@sina.com',//'mail_from_node@sohu.com',
				to: mailList,
				subject: 'Wonderful day starts from jobs',
				text: 'You have a new job, please check.',
			};
			transporter.sendMail(mailOptions, function(err, info){
				if (err){
					console.log('send mail error'+err);
					//res.send('send mail error'+err);
					return;
				}
				console.log('send mail --------------  success');
			})

		})//mail address query
		}

		//###################################################################

    count = count-1;	

};
	connection.end();

	var direction = 'home_'+po+'.html';	
	res.redirect(direction);

};








