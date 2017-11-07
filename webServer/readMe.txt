[Feature list]: 
1. create story and task via web page (public/addStoryAndTask.html)
2. display all the story and task by group (public/displayStoryAndTask.html)
3. fussy lookup
4. edit


[2017_11_7]
Feature edit is done.

I am working on delete, delete button does not seem to look at other elements in table as its siblings, I am tring to find the reason or other ways will be used.

A new network provider is subscribed, its network speed does not seem to be as fast as CMCC even though under the same bandwidth. very long hard days in the past.



[2017_10_29]
Fussy lookup is done, all the story and task are listed by group

For feature edit, user can directly edit on static page, field name, new content and story/task title can be delivered for database update.
but there are issues that 
1. jquery doesn't work if it is put into response, node gives error that 'ReferenceError: $ is not defined' and firefox tells 'the connection to the server was reset while the page was loading.' even though i can see firefox geting jquery-3.2.1.min.js. so weird.

2. save jquery as a seperated js file and apply it on webpage, it doesnot work, i am still tring to work it out.


so frustrated :-(




[2017_10_25]
Feature 'display all the story and tasks' is done tasks can be grouped to list under their story. 

I am working on the feature 'search and edit'.




[2017_10_24]
Load story and task from db to webpage is done. story can be identified from tasks.

Currently, all the stories and taskes are displayed in the order of what response gives, it will confuse user. Improvement is needed to group all the takes together and display under its story. 


[2017_10_20]
Dynamically appending fields is done. user can create story and task via web page. 

Field 'parent' is used to recognize the relationship between story and task.

I am moving onto the feature of fetching data and then display them. 





[2017_10_18]
Data can be successfully uploaded into database from webpage by adding new route, creating new module and some minor changes.

I am tring to work out dynamically appending fields to add new tasks when users want to add tasks after adding story. 

It is preferred to focus on the functions and user experience first, so the page UI may be ugly at this stage, the UI may be improved in next stage. If you cannot image how ugly it is, please hit http://localhost:3000





[2017_10_15]
This server is created for the project used to manage story and task under agile mode. 

It is base on mysql database and is supposed to be operated via webpage, such as, add story and task, review them.

Currently mysql and express are newly installed and some basic confgure is done on express, js file can be triggered to add data into database, but cannot add via web page, it always tell 'cannot post' or 'cannot get', I am working on it.


homepage: public/index.html 
connect db and add data: public/js/connect2db.js
database: agile
table: story
server: index.js