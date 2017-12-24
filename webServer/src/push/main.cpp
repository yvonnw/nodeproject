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
    //string preference = db.exeSQL_getPreference("select ttitle from task where towner='666' and tstatus='closed'");
    //string preference = db.exeSQL_getPreference("select ttitle from task where towner='666' and tstatus='closed' and ttitle='put search bar on the top of page'");
    //cout << "preference = " << preference;
    //string username = "666";
    //string master = db.exeSQL_queryMaster("select master from user where username='"+username+"'");
    //cout << "master = " << master;
    //string master = "yv_master";
    /*
    db.pt = db.exeSQL_query("select ttitle from task where tstatus='open' and master='yv_master'");
    
    string record = "";
    while(db.pt != NULL){
        record = db.pt->item;
        db.pt=db.pt->next;
    }
*/

    
    db.rec = db.exeSQL_query("select ttitle from task where tstatus='open' and master='yv_master'");
    string a = db.rec;


        
    return 0;
}