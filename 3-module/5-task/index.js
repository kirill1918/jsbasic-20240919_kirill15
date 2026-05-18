let str = '1 и -5.8 или 10 хотя 34 + -5.3 и 73';

function getMinMax(str) {
    let str1 = str.split(' ');
    console.log(str1);
    let arr = [] 
    let value = str1;

    for (let i = 0; i < value.length; i++) { 
        const number  = Number(value[i])
        
        if(!isNaN(number)) { 
            arr.push(number)
        }
        
    }

    let min  = Math.min(...arr)
    let max = Math.max(...arr)

    return { min: min, max: max };

    
}

    



let result = getMinMax(str);
console.log(result.min , result.max)


