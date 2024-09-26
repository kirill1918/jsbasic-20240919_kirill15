function checkSpam(str) {
    const peq = str.toLowerCase()
    if (peq.includes  ('1xbet') || peq.includes  ('xxx') || peq == ('1xbet') || peq == ('xxx'))  {
        return true
    }else{
        return false
    }

}

console.log(checkSpam('innocent rabbit'));
console.log(checkSpam('1XbeT now'));
console.log(checkSpam('free xxxxx')); 
