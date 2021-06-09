class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];//массив товаров с версткой
        this.sumProducts = 0;
        this._fetchProducts();
        this.calcSumProducts();
        this.render();//вывод товаров на страницу
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            this.allProducts.push(item);
            block.insertAdjacentHTML("beforeend", item.render());
            //block.innerHTML += item.render();
        }
    }

    calcSumProducts() {
        for (let i = 0; i < this.goods.length; i++) {
            this.sumProducts += this.goods[i].price;
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Basket {
    render() {
    //    Вывод содержимого корзины
    }

    addItem() {
    //    Добавление товара в корзину
    }

    delItem() {
    //    Удаление товара из корзины
    }
}

class BasketItem {
    render(){
    //    Верстка отдельного товара для корзины
    }
}

let list = new ProductList();


//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);