<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
//<script type="text/javascript" src="connect2db.js"></script>
<title>Add Story and Task</title>
</head>

<body>
<p><strong>AddStory and Tasks:</strong></p>
<p>&nbsp;</p>
<form action="addStoryAndTask()" method="post" enctype="multipart/form-data" name="form2" id="form2">
  <label>storyTitle
  <input id="addStoryTitle" type="text" name="textfield" />
  </label>
  <p>
    <label>Description
    <textarea id="addStoryDes" name="textarea"></textarea>
    </label>
  </p>
  <p>
    <label>Priority
    <select id="addStoryPriority" name="sPriority">
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
</select>
    </label>
  </p>
  <p>
    <label>Deadline
    <input id="addStoryDeadline" type="text" name="textfield2" />
    </label>
  </p>
  <p>&nbsp;</p>
  <p>
    <label>taskTitle 
    <input id="addTaskTitle" type="text" name="textfield3" />
    </label>
  </p>
  <p>
    <label>Priority
    <select id="addTaskPriority" name="tPriority">
	<option value="high">High</option>
	<option value="medium">Medium</option>
	<option value="low">Low</option>
    </select>
    </label>
  </p>
  <p>
    <label>Deadline
    <input id="addTaskDeadline" type="text" name="textfield4" />
    </label>
  </p>
  <p>&nbsp;</p>
  <p>
    <label>
    <input type="submit" value="Submit"/>
    </label>
  </p>
</form>
</body>
</html>

function addStoryAndTask(){
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'agile'
});

connection.connect();

console.log('i am in line 12 of js file');

//get data from page
var storyTitle = document.getElementById("addStoryTitle");
console.log(storyTitle);


var addSql = 'insert into story(title) values(storyTitle)';

//var addSql = 'insert into story(owner, title) values("yv", "insert record from node")';
connection.query(addSql, function(err, result){
  if(err){
    console.log('[insert error] - ', err.message);
    return;
  }
  console.log('------------------------insert');

});
};

