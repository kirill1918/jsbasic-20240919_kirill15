 var str = 'вася'
function ucFirst(str) {
    if (str.length == 0){
        return str
    }else if (str.length > 0) {
    return str[0].toUpperCase()+str.slice(1)
    }
        

}
console.log(ucFirst(str))
