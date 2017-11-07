var fs = require('fs');
var fs_body = require('fs');
var content = 'i am the 1st in body';
var htmlHeader = '';

fs.readFile('searchResult.html', function(err,data){
	if (err){
		return console.error(err);
	}

	htmlHeader = data.toString();
	content = htmlHeader+content;

	fs_body.writeFile('searchResult_final.html', content, function(err){

	if (err) {
		return console.error(err);
	}
	console.log('searchResult_final done');
})



})



/*
content = htmlHeader;

fs.writeFile('searchResult_final.html', content, function(err){

	if (err) {
		return console.error(err);
	}
	console.log('done');
})
*/