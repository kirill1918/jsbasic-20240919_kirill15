function getMinMax(str) {
<<<<<<< HEAD
    let str1 = str.split(' ');
    console.log(str1);
    let arr = [] 
    let value = str1;
=======
    let str2 = str.split(' ');
    let nu2 = [];
>>>>>>> e1545f5efaece7cf2f8bcecbd682828c4acecc91

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



