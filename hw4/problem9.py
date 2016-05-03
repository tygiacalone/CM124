import operator as op

k = 6
n = 19

''' 
ncr taken from stackoverflow: http://stackoverflow.com/questions/4941753/is-there-a-math-ncr-function-in-python
Function that calculates n choose r
'''
def ncr(n, r):
    r = min(r, n-r)
    if r == 0: return 1
    numer = reduce(op.mul, xrange(n, n-r, -1))
    denom = reduce(op.mul, xrange(1, r+1))
    return numer//denom

def nIndividuals(k, n):
    return ncr(2**k, n) * 0.25**n * 0.75**(2**k - n)

def atLeastN(k, n):
    return 1 - sum([nIndividuals(k, i) for i in range(n)])

print(atLeastN(k,n))
