let calculator  = {
    sum() {
        return Number(this.a) + Number(this.b)
    },
    mul () {
        return Number(this.a) * Number(this.b)
    } ,
    read (){
         this.a = prompt('a' , 0);
         this.b = prompt( 'b' , 0);

            }
         }; 
    




calculator.read ()

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
