a = 4960
b = 9145

total = 0

for num in range(a,b+1):
    if num % 2 == 1:
	total += num

print(total)
