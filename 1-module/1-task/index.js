function factorial(n) { 
    let result = 1
    while(n > 1) {
        result = n * result
        n = n - 1
    }
    return result
if(n === 0) {
    return 1
}
} 
console.log(factorial(5))
