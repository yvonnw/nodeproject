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
        string preference = "";
        for(int i=0; i<row_num; ++i){     //row
            row = mysql_fetch_row(result);

            for(int j=0; j<mysql_num_fields(result); ++j){   //columns of each row
                cout << row[j] << " ";

                string ttitle = row[j];
                //ttitle = "edit record with the jquery and"; //hard code here for debug
                int size = 0;
                int index = 0;
                string target = "";
                int position = 0;
                string sub1 = "";
                string prepositions[8]={"with","of","in","at","on","for","from","to"};
                for (int index=0; index<8; index++){
                    //string target = "with "; //e.g. edit record with jquery 
                    target = prepositions[index];
                    position = ttitle.find(target);
                    size = ttitle.size();
                    if (position>=0) {
                        string sub = ttitle.substr(position,size); //get the string with 'with'
                        size = sub.size();
                        position = sub.find(" ");
                        sub1 = sub.substr(position+1,size); // cut 'with '
                        position = 0;               
                        if (!(position=sub1.find("the "))){  // cut 'the'
                            sub1 = sub1.substr(position+4,size); 
                        }
                        else if (!(position=sub1.find("a "))){  //cut 'a'
                            sub1 = sub1.substr(position+2,size);
                        }
                        else if (!(position=sub1.find("an "))){  //cut 'an'
                            sub1 = sub1.substr(position+3,size);                    
                        }
                        position = sub1.find(" "); //get preference
                        size = sub1.size();
                        sub1 = sub1.substr(0,position);
                        preference = preference+sub1+" ";                                               
                        cout << preference;
                    }// if (position)
                    if (position>-1){
                            ttitle = sub1.substr(position,size);
                        } 
                    } // for index
                } //for j

                cout << endl;
            } //for i
            mysql_free_result(result);  //release memory of result
        } // else
        return true;
    }
    

