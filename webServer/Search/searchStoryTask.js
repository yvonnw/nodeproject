exports.index = function(req,res){


var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'agile'
	});

	connection.connect();

	var keyword = req.body.searchbox;
	displaySql = "select * from story as s left join task t on s.parent=t.tparent where (title like '%"+keyword+"%' or ttitle like '%"+keyword+"%' or description like '%"+keyword+"%')";

	connection.query(displaySql, function(err, result){
		if(err){
			console.log('[search error] - ', err.message);
			return;
		}
		console.log('------------------------search result');
		console.log(result);
		console.log(keyword);
		console.log(req.body);
		console.log('------------------------search result');


		if (result==''){
			res.write('no records match');

		}
		
		
		var listAll = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
					"<html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=gb2312' />"+
					"<script type='text/javascript' src='edit.js'></script>"+
					/*
					//[firefox]get jquery.js 
					//ReferenceError: $ is not defined [firefox]The connection to the server was reset while the page was loading.
					"<script src='jquery-3.2.1.min.js'></script>"+					
					"<script>"+
					"$(document).ready(function(){"+
					"$('table td').click(function(){"+
					"oldV=$(this).text();"+
					"//get the title of the recored that is about to change"+
					"console.log($(this).siblings('th:eq(0)').text());"+
					"var changedTtile = $(this).siblings('th:eq(0)').text();"+
					"document.getElementById('hiddenTitle').value = changedTtile;"+

					"//get the field that is about to changed"+
					"//console.log($(this).siblings());"+
					"//console.log($(this).prevUntil('th:eq(0)'));"+
					"//console.log($(this).prevUntil('th:eq(0)').length);"+
					"var prevLength = $(this).prevUntil('th:eq(0)').length;"+
					"var field = '';"+
					"switch(prevLength){"+
					"case 3:"+
					"field = 'owner';"+
					"break;"+
					"case 2:"+
					"field = 'priority';"+
					"break;"+
					"case 1:"+
					"field = 'status';"+
					"break;"+
					"case 4:"+
					"field = 'deadline';"+
					"break;"+
					"case 5:"+
					"field = 'description';"+
					"break;"+
					"};"+
					"console.log(field);"+
					"document.getElementById('hiddenField').value = field;"+

	  				"$(this).addClass('input').html('<input name='changed' value='"+$(this).text()+"'/>').find('input').focus().blur(function(){"+	  
	 				"var newV=$(this).val();"+

	  				"});"+

					"}"+
					")"+
					"});"+
					"</script>"
*/

					"<title>Search Result</title></head><body>";


		listAll += "<table align='left' border='10' cellpadding='10'><caption>Search Result</caption><thead><tr><th><div align='left'>Title</div></th><th><div align='left'>Status</div></th><th><div align='left'>Priority</div></th>"+

                           "<th><div align='left'>Owner</div></th><th>Deadline</div></th><th><div align='left'>Description</div></th><th><div align='left'>Edit&Save</div></th></tr>";
		
		var old = '';
		for (var i = 0; i < result.length; i++){			   

			// !=null is added for the case that either story/task is successfully saved in db but its story or task not
			// input cannot be used to show records, all the stings after space cannot be shown (whole record is picked up from db)
			if (result[i].parent != old && result[i].parent != null){

            listAll +="<tr><form method='post' action='/saveChange'>"+
            			"<th bgcolor='#BEBEBE'>" + result[i].title + "</th>" +   

            			 "<td bgcolor='#BEBEBE'>" + result[i].status + "</td>"+                      

                         "<td bgcolor='#BEBEBE'>" + result[i].level + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].owner + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].deadline + "</td>"+

                         "<td bgcolor='#BEBEBE'>" + result[i].description + "</td>" +

                         "<input id='hiddenTitle' type='hidden' name='hiddenTitle'/>"+
   						 "<input id='hiddenField' type='hidden' name='hiddenField'/>"+
                         
                         "<td contentEditable='true'><input id='saveChange' type='submit' value='Save'/></td>"+
                         "</tr>"

	        };

	        if (result[i].tparent != null){

            listAll +="<tr><form method='post' action='/saveChange'>"+
            			"<th>" + result[i].ttitle + "</th>" +  

            			"<td>" + result[i].tstatus + "</td>"+                        

                         "<td>" + result[i].tlevel + "</td>"+

                         "<td>" + result[i].towner + "</td>"+

                         "<td>" + result[i].tdeadline + "</td>"+
                         
                         "<th></th>" +

                         "<input id='hiddenTitle' type='hidden' name='hiddenTitle'/>"+
   						 "<input id='hiddenField' type='hidden' name='hiddenField'/>"+
                         
                         "<td contentEditable='true'><input id='saveChange' type='submit' value='Save'/></td>"+

                         "</tr>";    
            };

            old = result[i].parent;

		};

		listAll += "</thead>"+
					//"</table><br><input id='saveChange' type='submit' value='Save', onclick='save()'/>"+
					//"<input id='keyword' type='hidden' name='keyword'/>"+
					"</form>"+
					"</body></html>";
					

		res.write(listAll);


		});


	//res.redirect('/');

	connection.end();

	};