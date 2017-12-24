/**********************************************
 * Header for db operations
 * ********************************************/


#include <iostream>
#include <string>
#include <mysql/mysql.h>
using namespace std;

class MyDB {    
    public:
    struct items{
            string item;
            struct items *next;
        }*p,*q,*head,*pt;
    MyDB();
    ~MyDB();
    bool initDB(string host, string user, string pwd, string db_name);
    string exeSQL_getPreference(string sql);
    string exeSQL_queryMaster(string sql);
    const char * exeSQL_query(string sql);
    const char *rec;

    private:
    MYSQL *connection;
    MYSQL_RES *result;
    MYSQL_ROW row;
    
};

