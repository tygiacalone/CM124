import math

y = 3.0
p = 0.4
n = 1000.0

pp = (y*p)/((y-1)*p+1)
pn = p
pa = (pp + pn)/2

centrality = (pp-pn)/(math.sqrt(2/n)*math.sqrt(pa*(1-pa)))

print('centrality: ' + str(centrality))
