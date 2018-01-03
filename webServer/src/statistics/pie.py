from __future__ import division
import urllib2
import urllib
import MySQLdb
import matplotlib.pyplot as plt


# hard code, po will be a parameter delivered from js
po = "yv_po"

def counter_sql (str):
	db = MySQLdb.connect("localhost","root","123456","agile")
	cursor = db.cursor()
	cursor.execute(str)
	number = cursor.fetchone()
	# convert tuple to int
	number = int(number[0])		
	db.close()
	return number;

#get data from db 
total_amount = counter_sql("select count(*) from story where po = '"+po+"'")
open_amount = counter_sql("select count(*) from story where po = '"+po+"' and status='open'")
closed_amount = counter_sql("select count(*) from story where po = '"+po+"' and status='closed'")
pending_amount = counter_sql("select count(*) from story where po = '"+po+"' and status='pending'")
open_rate = open_amount/total_amount  # it will be 0 without from __future__ import division
closed_rate = closed_amount/total_amount
pending_rate = pending_amount/total_amount


# draw pie
plt.figure(1,figsize=(6,6))
color = ["green","red","grey"]
expl = [0,0.1,0]
label = ['open','pending','closed']
quants = [open_rate,pending_rate,closed_rate]
plt.pie(quants, explode=expl, colors=color, labels=label, autopct='%1.2f%%', pctdistance=0.8, shadow=True)
plt.title('Status Overview', bbox={'facecolor':'0.8', 'pad':5})
plt.show()
plt.savefig("overview_"+po+".jpg")
plt.close()

