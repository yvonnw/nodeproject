TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` trigger user_trigger after insert on user for each row begin insert into user_query(username) values(new.username); end'
sql_modes=1436549152
definers='root@localhost'
client_cs_names='utf8'
connection_cl_names='utf8_general_ci'
db_cl_names='latin1_swedish_ci'
created=151142032678
