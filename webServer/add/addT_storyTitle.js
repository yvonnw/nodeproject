// module
exports.index = function(req,res){
	console.log('i am in addT_storyTitle.js')
	req.session.addT_storyTitle = req.body.addT_storyTitle;
	console.log('req.session.addT_storyTitle = '+req.session.addT_storyTitle);
	if (req.session.addT_storyTitle != ''){
		res.send(200)
	}
	else {res.send(500)}
	

/* no changes on client either res.redirect or res.sendfile, node tells 'express deprecated res.sendfile: Use res.sendFile instead add/addT_storyTitle.js'
	setTimeout(function(){
			//res.redirect('addTask.html')
			res.sendfile('public/addTask.html')
		},3000);
*/
	
}