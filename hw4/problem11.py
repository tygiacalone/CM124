import math
from numpy import ndarray

s = '0.0706880268626 0.107216874946 0.157086862379 0.201334177516 0.240641602402 0.279227630818 0.362926689699 0.363461155667 0.441205268 0.466621654529 0.509486541248 0.572174546662 0.664797830671 0.76144769946 0.856508529334 0.88188902558 0.882113110493 0.95678392071 0.993303178631'

A = s.split(' ')
B = []
B.extend([None]*len(A))

def generateStatistics(A):
    for i, val in enumerate(A):
	x = float(val)
	p = 2.0*x*(1.0-x)
	B[i] = str(p)

def generateResults():
    results = ''
    for i, val in enumerate(B):
	results += val + ' '
    return results

generateStatistics(A)
results = generateResults()
print(results)
