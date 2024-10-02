function sumSalary(salaries){
    let sum = 0
    for(let s1 in salaries){
    if ( typeof salaries[s1] === 'number' && !isNaN (salaries[s1]) && salaries[s1] !== Infinity && salaries[s1] !== -Infinity){
         sum += salaries[s1]
    }
    }
    return sum
}
console.log(sumSalary(salaries))
