#include <iostream>
#include "/usr/include/python2.7/Python.h"

using namespace std;

int main(){	
	
	char *po="yv_po"; 

	Py_Initialize();
	PyRun_SimpleString("import sys");
	//PyRun_SimpleString("sys.path.append('/home/yv/cworld/nodeproject/webServer/src/statistics')");
	PyRun_SimpleString("sys.path.append('./')"); //add current directory to path
	PyObject *pModule = NULL;
	PyObject *pFunc = NULL;
	
	pModule = PyImport_ImportModule("pie"); //pie.py	
	pFunc = PyObject_GetAttrString(pModule,"draw_pie"); //function in pie.py

	// parameter
	PyObject *pArgs = PyTuple_New(1); //the number of parameter
	PyTuple_SetItem(pArgs,0,Py_BuildValue("s", po)); //convert string to tuple
	
	//return value
	PyObject *pReturn = NULL;
	pReturn = PyEval_CallObject(pFunc,pArgs);

	//char *result;
	//PyArg_Parse(pReturn,"s",&result);// messy code @�'� if returned value is string
	
	int result;
	PyArg_Parse(pReturn,"i",&result);

	cout << result << endl;

	Py_Finalize();

	return 0;

}
