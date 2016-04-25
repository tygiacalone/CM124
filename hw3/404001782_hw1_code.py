import pandas as pd
import numpy as np
import math
from scipy.stats import norm
dtype_dict = {'SNP{:05}'.format(_): np.int8 for _ in range(1000)}
data = pd.read_csv('SNP_Status.txt', sep=' ', index_col=0, dtype=dtype_dict)
cols = data.columns
#print data
#print '\n'

print 'UID:404001782'
print 'email:tgiacalo@ucla.edu'
print 'Undergrad or Grad:Undergrad'

d = {}
a = 0.05
bonferroni = a / 100000.0
#print bonferroni
#print 'Columns: '
#print cols
#print '\n'

for heading in cols:
    if heading == 'Status':
	break
#    print d
    d[heading] = {'case': 0.0, 'control': 0.0, "pcase": 0.0, "pcontrol": 0.0, "pavg": 0.0, "N": 0.0, "SA": 0.0, "p": 0.0, "nc": 0.0}
#    print heading + ':'
    head =  data[heading]
    status = data["Status"]
    for val, stat in zip(head, status):
#	print(val, stat)
	if stat == "Case":
	    d[heading]["case"] += val
	else:
	    d[heading]["control"] += val
    
    d[heading]["N"] = 2000;
    d[heading]["pcase"] = d[heading]["case"]/d[heading]["N"];
    d[heading]["pcontrol"] = d[heading]["control"]/d[heading]["N"];
    d[heading]["pavg"] = (d[heading]["pcase"] + d[heading]["pcontrol"])/2.0
    pcase = d[heading]["pcase"]
    pcontrol = d[heading]["pcontrol"]
    pavg = d[heading]["pavg"]
    N = d[heading]["N"]
    if N != 0 and (pcase-pcontrol) != 0 and (pavg*(1.0-pavg)) > 0 and (2.0/N) > 0:
	d[heading]["SA"] = (pcase - pcontrol)/(math.sqrt(2.0/N)*math.sqrt(pavg*(1.0-pavg)))
	d[heading]["nc"] = d[heading]["SA"] * math.sqrt(2.0/N)
    d[heading]["p"] = 2*norm.cdf(-math.fabs(d[heading]["SA"]), loc=0, scale=1)
#print d    
#print '\n'

print "<A>"
for heading in cols:
    if heading == "Status":
	break
    print heading + ":" + str(d[heading]["p"])
print "</A>"

print "<B>"
for heading in cols:
    if heading == "Status":
	break
    if d[heading]["p"] < bonferroni:
	print heading
print "</B>"

#print norm.ppf(0.025, loc=0, scale=1)
#print norm.cdf(norm.ppf(0.025, loc=0, scale=1))

#print "SNP00000:"
#print d["SNP00000"]

#print "SNP00030:"
#print d["SNP00030"]
#print 'done'


#pcase = 0.6
#pcontrol = 0.55
#pavg = (pcase + pcontrol)/2.0
#N = 2000.0

#print pavg
#print (pcase - pcontrol)/(math.sqrt(2/N)*math.sqrt(pavg*(1-pavg)))
