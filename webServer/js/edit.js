var script=document.createElement('script');
script.type='text/javascript';
script.src='jquery-3.2.1.min.js'
document.getElementByTagName('head')[0].appendChild(script);

$(document).ready(function(){
	//$("#editS").click(function(){
	$("table td").click(function(){
		oldV=$(this).text();
		console.log('parent!!!!!!!!!!!!!!');
		//get the title of the recored that is about to change
		console.log($(this).siblings('th:eq(0)').text());
		var changedTtile = $(this).siblings('th:eq(0)').text();
		document.getElementById('hiddenTitle').value = changedTtile;

		//get the field that is about to changed
		//console.log($(this).siblings());
		//console.log($(this).prevUntil('th:eq(0)'));
		//console.log($(this).prevUntil('th:eq(0)').length);
		var prevLength = $(this).prevUntil('th:eq(0)').length;
		var field = '';
		switch(prevLength)
		{

		case 3:
			field = 'owner';
			break;
		case 2:
			field = 'priority';
			break;
		case 1:
			field = 'status';
			break;
		case 4:
			field = 'deadline';
			break;
		case 5:
			field = 'description';
			break;
		};
		console.log(field);
		document.getElementById('hiddenField').value = field;

	  $(this).addClass('input').html('<input name="changed" value="'+$(this).text()+'"/>').find('input').focus().blur(function(){	  
	 	var newV=$(this).val();
	 	

	  });

	}


	)
});








