from itertools import product

s = 'ACACTCTCTTTATCAATGAACGCTAATTTGCCGCCAGCTGTGGCACGGAAAGCAAAGCGGATTCACGTGGATAAGAGTTGCTTGTCGGTCTGACAGTAGCCATGGACGCGTGAGCCGGTATTATAGCTATACCTAGCCGGGTCAACCATTTCTGCGAGGCCGATGTTCACCGTATGCCGTGGCGATATACCAACAGGGAGTCGGTGCAGGGTTTTTTGACGGGACTTATCGCATACCTTTGCTGATGGCATCGACGCGGTGGAAAGTCTGTTCCATCACCGAGGTGTTACGCCGGGACCGATATCGTGGCCCTCGGGTCGCCTCATATGTATTTGCTCTAACACGGGGAGGGACTTCGGTAACCTCGGGCTGTTCTTGTGTTGCAATCATGTCAACACGATTCGAAATTACGGGGTATCAGGGACGCCCCGAAACCTTCATCACAAGTAAACCTTACCGACACGAGCATCACTTACACTAGTCCCTCCAGGCTCCCGTGCTGGGCACGGAGACTCGAACTGCCCAAGGACGCTCCTTCAAAATCTCAAATACTTGAAACGTGATCAAGGGCACCATGGGGGGCGCCGTACTTTTGTTGCATGAATTCTACGCCGGGCTATCGATTCCATATCTCTTAAGCCCAAATCGTCTCGTGGCGATGGGGCGGAATACGTGAAAATATGCGGAGATTTTTCATATTGATACTCTTGGCCTTGAAGTTCGCTCGAGGAGTCGTGACTCCGACCAATCTCAGGGAGTCGCGTAGCTCA'
S = list(s)

DNA = ['A', 'C', 'G', 'T']

k = 7

P = [''.join(x) for x in product(DNA, repeat=k)]
print(P)

T = [''.join(x) for x in product(DNA, repeat=k)]
print(T)
d = {}

def generateDict(d, T):

    for i, val in enumerate(T):
	d[val] = 0

def generateTuples(S):
    tupl = ''
    for i, val in enumerate(S):
	if i+k > len(S):
	    break
	tupl = s[i : i + k]
	if tupl in d:
	    d[tupl] += 1

def printResults(d, T):
    results = ''
    for i, val in enumerate(T):
	if val in d:
	    results += str(d[val]) + ' '

    print(results)

generateDict(d,T)
generateTuples(S)
print(d)
printResults(d, T)
