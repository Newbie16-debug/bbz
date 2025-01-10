<script setup>
import { ref, watch, provide, computed, reactive } from 'vue';
import axios from 'axios';

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Footer from './components/Footer.vue'


//корзина
const cart = ref([]);
const isOrdered = ref(false);
const orderId = ref(null);

const state = reactive({
    countFav: 0, // Счетчик избранных
});

// Функция обновления счетчика
const updateCountFav = (count) => {
    state.countFav = count;
};

// Передаем через provide
provide('countFavState', {
    state,
    updateCountFav,
});

//для реактивности
const totalPrice = computed(
    () => cart.value.reduce((acc, item) => acc + item.price, 0)
)

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isOrdered.value || cartIsEmpty.value );

const drawerOpen = ref(false);

const closeDrawer = () => {
    drawerOpen.value = false;
}

const openDrawer = () => {
    drawerOpen.value = true;
}



const addToCart = (item) => {
    cart.value.push(item);
    item.isAdded = true;
}

const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1);
    item.isAdded = false;
}
 


const createOrder = async () => {
    try {
        isOrdered.value = true;
        const {data} = await axios.post(`https://75568229184a798a.mokky.dev/orders`, {
            items: cart.value,
            totalPrice: totalPrice.value
        });

        cart.value = []

        //return data;
        orderId.value = data.id
        console.log(orderId);

    } catch(err) {
        console.log(err);
    }
    finally {
        isOrdered.value = false;
    }
}


//любое изменение в корзине сохраняется в локал сторадж
watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
},
{deep: true}
)

provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
});

//корзина заканчивается
//provide('count', countFav);
</script>

<template>
    <Drawer 
        v-if="drawerOpen" 
        :total-price="totalPrice" 
        @create-order="createOrder"
        :button-disabled="cartButtonDisabled"
        :order-id="orderId" />
        <Header :total-price="totalPrice" @open-drawer="openDrawer"/>
        
        <div class="p-12">
            <router-view></router-view>
            
        </div>

        
        
        <Footer />
    
</template>



