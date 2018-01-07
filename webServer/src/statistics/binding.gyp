{
    "targets": [
        {
            "target_name": "draw",
            "sources": ["draw.cc","draw.cpp","draw.h","pie.py","/usr/include/python2.7/Python.h","sql_query.py"],
            "include_dirs": ["-I/usr/include/python2.7 -I/usr/include/x86_64-linux-gnu/python2.7"],
            "libraries": ["-L/usr/lib/python2.7/config-x86_64-linux-gnu -L/usr/lib -lpython2.7 -ldraw"]
        }
    ]
}