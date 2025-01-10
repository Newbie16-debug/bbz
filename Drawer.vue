<script setup>
import {computed,ref,onMounted} from 'vue'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue';

const emit = defineEmits(['createOrder']);

const props = defineProps({
    totalPrice: Number,
    isOrdered: Boolean,
    buttonDisabled: Boolean,
    orderId: Number
})
const isMobile = ref(false);

onMounted(() => {
  // Проверяем размер экрана и устанавливаем флаг для мобильных устройств
  isMobile.value = window.innerWidth <= 768;
});

</script>



<template>
    
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-1/4 h-full fixed right-0 top-0 z-20 p-8">
        <DrawerHead />

        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
            <InfoBlock
            v-if="!totalPrice && !orderId"
            title="Корзина пустая" 
            description="Добавьте товары, чтобы сделать заказ"
            image-url="/package-icon.png"/>

            <InfoBlock
            v-if="orderId"
            title="Заказ оформлен!" 
            description="Спасибо за покупку!"
            image-url="/order-success-icon.png"/>
        </div>

        <div v-else>
            <CartItemList />
           
            <div class="mt-7">

                <div class="flex gap-2">
                    <span>Итого:</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{totalPrice}} Р</b>
                </div>
                
                <button @click="() => emit('createOrder')"
                    :disabled="buttonDisabled"
                    class="mt-8 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer">
                    Оформить заказ
                </button>

            </div>
        </div>
        
        
    </div>
</template>