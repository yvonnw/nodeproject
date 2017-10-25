[Feature list]: 
1. create story and task via web page (public/addStoryAndTask.html)
2. display all the story and task by group (public/displayStoryAndTask.html)




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