cmd_Release/obj.target/addon.node := g++ -shared -pthread -rdynamic -m64  -Wl,-soname=addon.node -o Release/obj.target/addon.node -Wl,--start-group Release/obj.target/addon/push.o Release/obj.target/addon/main.o Release/obj.target/addon/MyDB.o -Wl,--end-group 
