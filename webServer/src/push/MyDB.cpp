/*****************************************************
 * Functions declared in header file_MyDB.h
 * ***************************************************/

#include <iostream>
#include <cstdlib>
#include <mysql/mysql.h>
#include "MyDB.h"
#include <string>
using namespace std;

MyDB::MyDB() {
    connection = mysql_init(NULL);
    if(connection == NULL){
        cout << "Error:" << mysql_error(connection);
        exit(1);
    }
}

MyDB::~MyDB(){
    if(connection != NULL){
        mysql_close(connection);
    }
}

bool MyDB::initDB(string host, string user, string pwd, string db_name){
    connection = mysql_real_connect(connection, host.c_str(), user.c_str(), pwd.c_str(), db_name.c_str(), 0, NULL, 0);
    if(connection == NULL){
        cout << "Error:" << mysql_error(connection);
        exit(1);
    }
    return true;
}

bool MyDB::exeSQL(string sql){
    if(mysql_query(connection, sql.c_str())){
        cout << "query error:" << mysql_error(connection);
        exit(1);
    }
    else {
        //result = mysql_use_result(connection); //not all the records are found if use mysql_use_result
        result = mysql_store_result(connection); // according to mysql menual, mysql_store_result reads the result set into client, not sure its performance
        int row_num = mysql_num_rows(result);
        for(int i=0; i<row_num; ++i){     //row
            row = mysql_fetch_row(result);

            for(int j=0; j<mysql_num_fields(result); ++j){   //columns of each row
                cout << row[j] << " ";
                string ttitle = row[j];
                int size = ttitle.size();
                string target = "with"; //e.g. edit record with jquery 
                int position = ttitle.find(target);
                string sub = ttitle.substr(position+1,size); //get the string after with
                size = sub.size();
                position = sub.find(" ");
                string sub1 = sub.substr(0,position);                
                if (sub1.find("the")){  
                    string sub = sub.substr(position+4,size);
                    position = sub.find(" ");
                    string sub1 = sub.substr(0,position); 
                }
                else if (sub1.find("a")){  
                    string sub = sub.substr(position+2,size);
                    position = sub.find(" ");
                    string sub1 = sub.substr(0,position); 
                }
                else if (sub1.find("an")){  
                    string sub = sub.substr(position+3,size);
                    position = sub.find(" ");
                    string sub1 = sub.substr(0,position); 
                }
                string preference = sub1+" ";

                } //for j


            }
            cout << endl;
        }
        mysql_free_result(result);  //release memory of result
    }
    return true;
}
