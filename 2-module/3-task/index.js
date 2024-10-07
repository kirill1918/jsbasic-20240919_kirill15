let calculator  = {
    sum() {
        return Number(this.a) + Number(this.b);
    },
    mul() {
        return Number(this.a) * Number(this.b);
    },
    read(a, b) {
        this.a = a;
        this.b = b;
    }
};
calculator.read();

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
