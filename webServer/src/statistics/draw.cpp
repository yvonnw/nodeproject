#include <iostream>
#include "/usr/include/python2.7/Python.h"

using namespace std;

int main(){
	string po = "yv_po"; //hard code

	Py_Initialize();
	PyObject *pModule = NULL;
	PyObject *pFunc = NULL;
	pModule = PyImport_ImportModule("pie"); //pie.py
	pFunc = PyObject_GetAttrString(pModule,"draw_pie"); //function in pie.py

	// parameter
	PyObject *pArgs = PyTuple_New(1); //the number of parameter
	PyTuple_SetItem(pArgs,0,Py_BuildValue("s",po));

	//return value
	PyObject *pReturn = NULL;
	pReturn = PyEval_CallObject(pFunc,pArgs);

	int result;
	PyArg_Parse(pReturn,"i",&result);
	cout << "return=" << result << endl;

	Py_Finalize();

	return 0;

}
