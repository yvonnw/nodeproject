from __future__ import division
import urllib2
import urllib
import MySQLdb
import matplotlib.pyplot as plt
import sql_query
import sys

records = sql_query.query("select title from story where po='"+sys.argv[1]+"' and (date_sub(now(),interval 60 day)<createTime)")
	
data = list(records)
i=0
for row in records:
	story = row[0]
	num_task = sql_query.counter_sql("select count(*) from task where tparent='"+story+"'")
	num_task_closed = sql_query.counter_sql("select count(*) from task where tparent='"+story+"' and tstatus='closed'")
	if (num_task > 0):
		data[i]=num_task_closed/num_task    	
	else:
	    data[i]=0
	i=i+1

# draw bar char
plt.bar(range(len(data)), data, tick_label=records, align="center")
plt.title("Story Progress")
plt.xlabel("Story")
plt.ylabel("Completing Rate")
#plt.show()
plt.savefig("progerss_"+sys.argv[1]+".jpg")
plt.close()
print sys.argv[1]


''' the part below is for embedding python into c
def draw_bar(po):

	# hard code, po will be a parameter delivered from js
	po = "yv_po"

	# calculate completing percentage
	records = sql_query.query("select title from story where po='"+po+"' and (date_sub(now(),interval 60 day)<createTime)")
	print records
	data = list(records)
	i=0
	for row in records:
	    story = row[0]
	    num_task = sql_query.counter_sql("select count(*) from task where tparent='"+story+"'")
	    num_task_closed = sql_query.counter_sql("select count(*) from task where tparent='"+story+"' and tstatus='closed'")
	    if (num_task > 0):
	    	data[i]=num_task_closed/num_task    	
	    else:
	    	data[i]=0
	    i=i+1

	# draw bar char
	plt.bar(range(len(data)), data, tick_label=records, align="center")
	plt.title("Story Progress")
	plt.xlabel("Story")
	plt.ylabel("Completing Rate")
	plt.show()
	plt.savefig("progerss_"+po+".jpg")
	plt.close()

	return 0

'''
