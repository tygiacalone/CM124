cat('UID:404001782', '\n')
cat('email:tgiacalo@ucla.edu', '\n')
cat('Undergrad or Grad:Undergrad', '\n')

tbl <- read.table("~/Documents/homework/124CMCS/homework/hw3/SNP_short.txt", quote="\"", comment.char="")
tbl


y <- 3.0
p <- 0.4
n <- 55.0

pvals <- c(0.05, 0.2, 0.4)
yvals <- c(1.5, 2.00, 3.0)

for(j in 1:3) {
    y <- yvals[j]
    cat('For relative risk value of ', yvals[j], ':\n')
    for(i in 1:3){
	cat('\tFor frequency value of ', pvals[i], ':\n ')
	p <- pvals[i]
	pp <- (y*p)/((y-1)*p+1)
	pn <- p
	pa <- (pp + pn)/2

	centrality <- (pp-pn)/(sqrt(2/n)*sqrt(pa*(1-pa)))
	power <- pnorm(qnorm(0.05/2)+centrality)+1-pnorm(centrality-qnorm(0.05/2))
	cat('\t\tCoeff of Centrality: ', centrality, '\n')
	cat('\t\tPower: ', power, '\n')
    }
    cat('\n')
}


