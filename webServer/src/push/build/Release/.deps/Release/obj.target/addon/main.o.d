cmd_Release/obj.target/addon/main.o := g++ '-DNODE_GYP_MODULE_NAME=addon' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/home/yv/.node-gyp/8.6.0/include/node -I/home/yv/.node-gyp/8.6.0/src -I/home/yv/.node-gyp/8.6.0/deps/uv/include -I/home/yv/.node-gyp/8.6.0/deps/v8/include  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++0x -MMD -MF ./Release/.deps/Release/obj.target/addon/main.o.d.raw   -c -o Release/obj.target/addon/main.o ../main.cpp
Release/obj.target/addon/main.o: ../main.cpp ../MyDB.h
../main.cpp:
../MyDB.h:
