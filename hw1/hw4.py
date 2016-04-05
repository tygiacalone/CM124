f = open('fname.txt', 'r')
fnew = open('fnew.txt', 'w')

num = 0
for line in f:
    num += 1 
    if num % 2 == 1:
	continue
    else:
	print line
	fnew.write(line)

