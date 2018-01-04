from __future__ import division
import urllib2
import urllib
import MySQLdb
import matplotlib.pyplot as plt
import sql_query

def draw_pie(po):
	# hard code, po will be a parameter delivered from js
	#po = "yv_po"

	#get data within 2 months from db 
	total_amount = sql_query.counter_sql("select count(*) from story where po='"+po+"' and (date_sub(now(),interval 60 day)<createTime)")
	open_amount = sql_query.counter_sql("select count(*) from story where po = '"+po+"' and status='open' and (date_sub(now(),interval 60 day)<createTime)")
	closed_amount = sql_query.counter_sql("select count(*) from story where po = '"+po+"' and status='closed' and (date_sub(now(),interval 60 day)<createTime)")
	pending_amount = sql_query.counter_sql("select count(*) from story where po = '"+po+"' and status='pending' and (date_sub(now(),interval 60 day)<createTime)")
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

	return 0

