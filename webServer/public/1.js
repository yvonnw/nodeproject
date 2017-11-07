var scriptSrc=document.createElement("script"); 
scriptSrc.type="text/javascript";  
scriptSrc.src="jquery-3.2.1.min.js";


var script=document.createElement("script");  
  

var textNode = document.createTextNode(
"$(document).ready(function(){"+  
    "$('#bt').click(function(){"+  
        "alert('Hello');"+  
    "});  });"
)

script.appendChild(textNode);



document.getElementsByTagName('head')[0].appendChild(scriptSrc);
document.getElementsByTagName('head')[0].appendChild(script); 

