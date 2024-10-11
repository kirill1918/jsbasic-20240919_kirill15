function getMinMax(str) {
    let str2 = str.split(' ');
    let nu2 = [];

    for (let index in str2) {
        let num = Number(str2[index]); 
        if (!isNaN(num)) { 
            nu2.push(num); 
        }
    }

    
    let min1 = Math.min(...nu2);
    let max1 = Math.max(...nu2);

    
    return { min: min1, max: max1 };
}

let inputData = '1 и -5.8 или 10 хотя 34 + -5.3 и 73';
let result = getMinMax(inputData);
console.log(result.min, result.max); 

