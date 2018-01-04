import MySQLdb

def counter_sql (str):
	db = MySQLdb.connect("localhost","root","123456","agile")
	cursor = db.cursor()
	cursor.execute(str)
	number = cursor.fetchone()
	# convert tuple to int
	number = int(number[0])		
	db.close()
	return number


def query (str):
	db = MySQLdb.connect("localhost","root","123456","agile")
	cursor = db.cursor()
	cursor.execute(str)
	results = cursor.fetchall()
	# convert tuple to list
	#results = list(results)
	db.close()
	return results