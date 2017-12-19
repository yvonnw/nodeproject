/*****************************************************
 * Functions defined in header file_MyDB.h
 * ***************************************************/

#include <iostream>
#include <cstdlib>
#include <mysql/mysql.h>
#include "MyDB.h"
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
        result = mysql_use_result(connection);
        for(int i=0; i < mysql_field_count(connection); ++i){      //row
            row = mysql_fetch_row(result);
            if(row <= 0){
                break;
            }
            for(int j=0; j<mysql_num_fields(result); ++j){   //columns of each row
                cout << row[j] << " ";
            }
            cout << endl;
        }
        mysql_free_result(result);  //release memory of result
    }
    return true;
}
