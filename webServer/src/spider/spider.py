import urllib2
import urllib
import MySQLdb
from bs4 import BeautifulSoup

# hard code, story will be a parameter delivered from js
story = "4"   

db = MySQLdb.connect("localhost","root","123456","agile")
cursor = db.cursor()
cursor.execute("select owner from story where title = '"+story+"'")
master = cursor.fetchone()		
# convert tuple to string 
master = master.__str__() #('yv_master',)
length = len(master)
length = length-3
master = master[2:length]	
db.close()


# capture page
request = urllib2.Request("http://localhost:3000/storytask_"+master+".html")
response = urllib2.urlopen(request)
html = response.read()
print html
soup = BeautifulSoup(response, "lxml")
print soup.p
