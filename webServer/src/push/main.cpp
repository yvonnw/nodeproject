/**************************************************
 * DB operations
 * ************************************************/

#include <iostream>
#include "MyDB.h"
using namespace std;

int main()
{
    MyDB db;
    db.initDB("localhost", "root", "123456", "agile");
    db.exeSQL("select ttitle from task where towner='666' and tstatus='closed'");
    return 0;
}