import math

s = '0.00511740736284 0.90324770339 0.760096110758 0.829345026144 0.528762226506 0.286452069468 0.614204268111 0.184120450354 0.833860291577 0.284813062228 0.470273206412 0.369710888426 0.100576697369 0.764441822808 0.436520128272 0.202170032802 0.990607087856 0.565217108272 0.0167218095038'

A = s.split(' ')
results = ''
for i, val in enumerate(A):
    m = val
    f = 1.0 - (1.0 - math.sqrt(float(val)))**2.0
    results += str(f) + ' '

print(results)