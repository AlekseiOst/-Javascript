Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgPath = `img/product-${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
<!--            <div class="product-item">-->
<!--                <img :src="img" alt="Some img" class="cartImg">-->
<!--                <div class="desc">-->
<!--                    <h3>{{product.product_name}}</h3>-->
<!--                    <p>{{product.price}}</p>-->
<!--                    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>-->
<!--                </div>-->
<!--            </div>-->
            <div class="featured-product-content">
                    <img :src="img" alt="product">
                    <a class="featured-product-content-link" @click="$root.$refs.cart.addProduct(product)">
                        <div><img src="img/arrow.svg" alt=">"></div>
                        <h5>{{product.product_name}}</h5>
                        <p>$ {{product.price}}</p>
                    </a>
                </div>
    `
})