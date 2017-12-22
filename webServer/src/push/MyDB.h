/**********************************************
 * Header for db operations
 * ********************************************/


#include <iostream>
#include <string>
#include <mysql/mysql.h>
using namespace std;

class MyDB {
    public:
    MyDB();
    ~MyDB();
    bool initDB(string host, string user, string pwd, string db_name);
    string exeSQL_getPreference(string sql);
    string exeSQL_queryMaster(string sql);
    string** exeSQL_query(string sql);
    private:
    MYSQL *connection;
    MYSQL_RES *result;
    MYSQL_ROW row;
};

