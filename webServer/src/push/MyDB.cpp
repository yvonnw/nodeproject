/*****************************************************
 * Functions declared in header file_MyDB.h
 * ***************************************************/

#include <iostream>
#include <cstdlib>
#include <mysql/mysql.h>
#include "MyDB.h"
#include <string>
#include <cstring>
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

const char * MyDB::exeSQL_query(string sql){    
    if(mysql_query(connection, sql.c_str())){
        cout << "query error:" << mysql_error(connection);
        exit(1);
    }
    else {        
        result = mysql_store_result(connection);           
        int row_num = mysql_num_rows(result);
        
        /* items is definded in MyDB.h, why it tells 'items is not defined when items * MyDB::exeSQL_query(string sql)'
        string arr[row_num];
        p = (items *)malloc(sizeof(items));
        head=p;
        q=p;
        for(int i=0; i<row_num; ++i){     
            row = mysql_fetch_row(result);

            for(int j=0; j<mysql_num_fields(result); ++j){
                arr[i] = arr[i]+row[j]+" ";
            } //for j
            p->item = arr[i];
            p = (items*)malloc(sizeof(items));
            q->next = p;
            q=p;
            
        } // for i
        q->next=NULL;
        */
        
        string arr[row_num];
        //const char *q[row_num];       //works well in function, values are missed when return, rec: 0x0 
        string content=""; 
        //const char *text;
        for(int i=0; i<row_num; ++i){     
            row = mysql_fetch_row(result);

            for(int j=0; j<mysql_num_fields(result); ++j){ 
                arr[i] = arr[i]+row[j]+" ";      
            } //for j 
            
            //q[i]=arr[i].c_str();  //vaule will be missed when return if use c_str() 
            content = content+arr[i]+"****";             
            
        } //for i                
        int content_size=content.size();
        char *letter = new char[content_size];
        strcpy(letter, content.c_str());
        
        return letter;
        
        //return head;
    }
}




string MyDB::exeSQL_queryMaster(string sql){
    if(mysql_query(connection, sql.c_str())){
        cout << "query error:" << mysql_error(connection);
        exit(1);
    }
    else {
        result = mysql_store_result(connection);           
        row = mysql_fetch_row(result);            
        string master = row[0];
        return master;
    } 
}

string MyDB::exeSQL_getPreference(string sql){
    string preference = "";
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
                int size = 0;
                int index = 0;
                string target = "";
                int position = 0;
                string sub1 = "";
                char *p = row[j];
                char *q = row[j];
                int space_num = 0;
                while (*p){                //the number of space will be used to identify preference
                    if (*p==' '){
                        space_num++;
                        q=p;
                    }
                        p++;
                    
                }
                if (space_num<4){         //e.g. create button, create a button, create a beautiful button
                    q++;
                    while (*q){
                        preference += *q;
                        q++;
                    }
                    preference += " ";
                }

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
                    } // for index
                } //for j
                cout << endl;
            } //for i
            mysql_free_result(result);  //release memory of result
        } // else
        //return true;
        return preference;
    }
    

