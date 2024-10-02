function sumSalary(salaries){
    let sum = 0
    for(let s1 in salaries){
    if ( typeof salaries[s1] === 'number'){
         sum = sum + salaries[s1]
    }
    }
    return sum
}
