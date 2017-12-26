#include <stdio.h>
#include <stdlib.h>

#include <node/node.h>
#include <node/v8.h>
#include <iostream>
#include <cstdlib>
#include <mysql/mysql.h>
#include "pushtask.h"
#include "MyDB.h"
#include <string>
#include <cstring>

using namespace std;
using namespace v8;
using namespace node;


namespace demo {
    using v8::Exception;
    using v8::FunctionCallbackInfo;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::String;
    using v8::Value;
    using v8::Isolate;
    //extern string pushTask(string username);

    void Push(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        //args is the username passed by js
        //convert v8 string to std string
        v8::String::Utf8Value n(args[0]->ToString());
        std::string username = std::string(*n);

        std::string task = pushTask(username); //find pushTask in v8.h by default

        //convert std string to v8 string 
        Handle<Value> pushList = v8::String::NewFromUtf8(isolate, task.c_str());

        args.GetReturnValue().Set(pushList);       
        
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "push", Push);
    }
    NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}