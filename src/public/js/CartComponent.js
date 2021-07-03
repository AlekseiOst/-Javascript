// const = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const cartItem = {
    props: ['img', 'cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img" class="cart-img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }}</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
};

const cart = {
    data() {
        return {
            // cartUrl: '/getBasket.json',
            cartItems: [],
            // imgCart: '',
            showCart: false
        }
    },
    components: {
      'cart-item': cartItem
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/product-${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            // this.$parent.getJson(`/api/cart`)
            //     .then(data => {
            //         if (data.result === 1) {
            //             if (item.quantity > 1) {
            //                 item.quantity--;
            //             } else {
            //                 this.cartItems.splice(this.cartItems.indexOf(item), 1);
            //             }
            //         }
            //     })
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    template: `<li>
                    <button class="basket-button icon-basket" type="button" @click="showCart = !showCart"></button>
                    <div class="cart-block" v-show="showCart">
                        <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" @remove="remove">
                        </cart-item>
                    </div>
                </li>
    `
};

export default cart