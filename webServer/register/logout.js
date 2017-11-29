exports.index = function(req,res){

req.session.username = '';
req.session.role = '';
console.log('username:'+req.session.username);
console.log('role:'+req.session.role);
res.redirect('/');
}