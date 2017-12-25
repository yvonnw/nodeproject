/**************************************************
 * DB operations
 * ************************************************/

#include <iostream>
#include <cstdlib>
#include <mysql/mysql.h>
#include "MyDB.h"
#include <string>
#include <cstring>
using namespace std;

int main()
{

/*
string keys[3];
keys[0]="jquery";
keys[1]= "xml file";
keys[2]= "close story";
//string a=keys[0];
//int key_size=keys[0].size();
//char *key = new char[key_size];
//strcpy(key, keys[0].c_str());
string record[1];
record[0]="use jquery to update";
int position = record[0].find(keys[0]);
cout << position;

}
*/
//**************************************************

    MyDB db;
    db.initDB("localhost", "root", "123456", "agile");
    //string preference = db.exeSQL_getPreference("select ttitle from task where towner='666' and tstatus='closed'");
    string preference = db.exeSQL_getPreference("select ttitle from task where towner='666' and tstatus='closed'");
    cout << "preference = " << preference;
    //string username = "666";
    //string master = db.exeSQL_queryMaster("select master from user where username='"+username+"'");
    //cout << "master = " << master;
    //string master = "yv_master";
    
    //string preference = "jquery****xml file****close story****";
    int position = preference.find("****");
    int i = 0;
    string sub = preference;
    int preference_size = preference.size(); 
    while(position>0){ //i is must to define key
        i++;
        sub=sub.substr(position+4,preference_size);
        preference_size = sub.size();
        position = sub.find("****");
    }

    string keys[i];
    preference_size = preference.size(); 
    position = preference.find("****");
    i=0;
    while(position>0){                            //split preference into key, it tells 'string has no member split'
        keys[i]=preference.substr(0,position);
        i++;
        preference = preference.substr(position+4,preference_size);
        preference_size = preference.size();
        position = preference.find("****");
    }

    
    db.rec = db.exeSQL_query("select ttitle from task where tstatus='open' and master='yv_master'");
    string a = db.rec;    
    position = a.find("****");
    sub=a;
    int a_size = a.size();
    int j=0;
    while(position>0){
        j++;
        sub=sub.substr(position+4,a_size);
        a_size = sub.size();
        position = sub.find("****");
    }

    string record[j];
    a_size=a.size();
    position = a.find("****");
    j=0;
    while(position>0){                            //split a into record, it tells 'string has no member split'
        record[j]=a.substr(0,position);
        j++;
        a = a.substr(position+4,a_size);
        a_size = a.size();
        position = a.find("****");
    }
    int m=0;
    int n=0;
    int k=0;
    int key_position = 0;
    string push="";
    for (n=0; n<i; n++){        
        for (m=0; m<j; m++){            
            key_position = record[m].find(keys[n]);
            if (key_position>=0){
                push=push+record[m]+"****";
                k++;
            }
                    
        } //for m        

    }//for n

        
    return 0;
}
