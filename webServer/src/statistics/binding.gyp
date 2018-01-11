{
    "targets": [
        {
            "target_name": "draw",
            "sources": ["draw.cc","pie.py","/usr/include/python2.7/Python.h","sql_query.py"],
            "include_dirs": ["-I/usr/include/python2.7/pyconfig.h -I/usr/include/python2.7 -I/usr/include/x86_64-linux-gnu/python2.7  -fno-strict-aliasing -Wdate-time -D_FORTIFY_SOURCE=2 -g -fstack-protector-strong -Wformat -Werror=format-security  -DNDEBUG -g -fwrapv -O2 -Wall -Wstrict-prototypes"],
            "libraries": ["-L/usr/lib/python2.7/config-x86_64-linux-gnu -lpython2.7 -L/usr/lib -ldraw -L/usr/lib/python2.7/config-x86_64-linux-gnu -L/usr/lib -lpython2.7 -lpthread -ldl  -lutil -lm  -Xlinker -export-dynamic -Wl,-O1 -Wl,-Bsymbolic-functions"]
        }
    ]
}