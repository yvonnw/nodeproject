cmd_Release/obj.target/draw.node := g++ -shared -pthread -rdynamic -m64  -Wl,-soname=draw.node -o Release/obj.target/draw.node -Wl,--start-group Release/obj.target/draw/draw.o -Wl,--end-group -L/usr/lib/python2.7/config-x86_64-linux-gnu -lpython2.7 -L/usr/lib -ldraw