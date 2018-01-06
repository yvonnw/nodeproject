/*********************************************
embed c into node
**********************************************/

#include <stdio.h>
#include <stdlib.h>
#include "/usr/include/python2.7/Python.h"
#include <node/node.h>
#include <node/v8.h>
#include <iostream>
#include <cstdlib>
#include "./draw.h"
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

    void Draw(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        //args is the username passed by js
        //convert v8 string to std string
        v8::String::Utf8Value n(args[0]->ToString());
        std::string username = std::string(*n);

        int result = drawPie(username);
        //convert from std namespace to v8 namespace 
        Local<Number> results = Number::New(isolate,result);

        args.GetReturnValue().Set(results);   

  
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "draw", Draw);
    }
    NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}