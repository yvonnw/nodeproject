#include <stdio.h>
#include <stdlib.h>

#include <node/node.h>
#include <node/v8.h>

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

    void Push(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        //args is the username passed by js

    }
    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "push", Push);
    }
    NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}