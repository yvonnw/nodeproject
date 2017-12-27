{
    "targets": [
        {
            "target_name": "addon",
            "sources": ["push.cc","pushtask.cpp","MyDB.cpp","MyDB.h","pushtask.h"],
            "include_dirs": ["-I/usr/include/mysql"],
            "libraries": ["-L/usr/lib/x86_64-linux-gnu -lmysqlclient -lpthread -lz -lm -lrt -ldl"]
        }
    ]
}