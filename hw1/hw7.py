k = 28.0
m = 27.0
n = 30.0

T = k + m + n

DD = (k/T)*((k-1)/(T-1))

DH = (k/T)*(m/(T-1)) + (m/T)*(k/(T-1))

DR = (k/T)*(n/(T-1)) + (n/T)*(k/(T-1))

HR = (m/T)*(n/(T-1))*(0.5) + (n/T)*(m/(T-1))*(0.5)

HH = (m/T)*((m-1)/(T-1))*(0.75)

RR = (n/T)*((n-1)/(T-1))*(0)

print('DD: ' + str(DD))
print('DH: ' + str(DH))
print('DR: ' + str(DR))
print('HR: ' + str(HR))
print('HH: ' + str(HH))
print('RR: ' + str(RR))

chance = DD + DH + DR + HR + HH + RR

print(chance)
