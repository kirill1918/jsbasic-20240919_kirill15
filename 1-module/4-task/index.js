function checkspam(str) {
    const peq = str.toLowerCase()
    if (peq.includes  ('1xbet') || peq.includes  ('xxx') || peq == ('1xbet') || peq == ('xxx'))  {
        return true
    }else{
        return false
    }

}



console.log(checkspam('innocent rabbit'));
console.log(checkspam('1XbeT now'));
console.log(checkspam('free xxxxx'));
