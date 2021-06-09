class Hamburger {
    constructor() {
        this.smallHamburger = {price: 50, calories: 20};
        this.bigHamburger = {price: 100, calories: 40};

        this.fillingCheese = {price: 10, calories: 20};
        this.fillingSalad = {price: 20, calories: 5};
        this.fillingPotatoes = {price: 15, calories: 10};

        this.spice = {price: 15, calories: 0};
        this.mayonnaise = {price: 20, calories: 5};

        this.price = 0;
        this.calories = 0;
        this.composition = [];

        // document.querySelector('#calc').onclick = this.calc();
        // document.querySelector('#calc').addEventListener("click", this.calc);
    }

    getHamburgerSize() {
        if (document.hamburger.hamburgerType[0].checked) {
            // if (this.composition.indexOf(this.bigHamburger) != -1) {
            //     this.composition.splice(this.composition.indexOf(this.bigHamburger), 1);
            // }
            this.composition.push(this.smallHamburger);
        } else {
            // if (this.composition.indexOf(this.smallHamburger) != -1) {
            //     this.composition.splice(this.composition.indexOf(this.smallHamburger), 1);
            // }
            this.composition.push(this.bigHamburger);
        }
    }

    getFilling() {
        if (document.hamburger.filling[0].checked) {
            this.composition.push(this.fillingCheese);
        } else if (document.hamburger.filling[1].checked) {
            this.composition.push(this.fillingSalad);
        } else {
            this.composition.push(this.fillingPotatoes);
        }
    }

    getSpice() {
        if (document.hamburger.spice.checked) {
            this.composition.push(this.spice);
        }
    }

    getMayonnaise() {
        if (document.hamburger.mayonnaise.checked) {
            this.composition.push(this.mayonnaise);
        }
    }

    calcPrice() {
        let sum = 0;
        for (let i = 0; i < this.composition.length; i++) {
            sum += this.composition[i].price;
        }

        this.price = sum;
    }

    calcCalories() {
        let sum = 0;
        for (let i = 0; i < this.composition.length; i++) {
            sum += this.composition[i].calories;
        }

        this.calories = sum;
    }

    calc() {
        this.composition = [];

        this.getHamburgerSize();
        this.getFilling();
        this.getSpice();
        this.getMayonnaise();

        this.calcPrice();
        this.calcCalories();

        document.querySelector('#price-calories').innerHTML = `Стоимость: ${this.price}, калории: ${this.calories}.`;
    }
}

let hamburger = new Hamburger();
let button = document.querySelector('#calc');
button.addEventListener("click", hamburger.calc.bind(hamburger));