<script setup>
import Card from './Card.vue'

defineProps({
    items: Array,
    isFavourites: Boolean
});

//эмит для того, чтобы было проще смотреть, какие события есть
//в компоненте
const emit = defineEmits(['addToFavourite', 'addToCart']);

</script>

<template>
    <div v-auto-animate class="flex flex-col gap-10">
        <!-- тут надо явно указать v-key, чтобы виртуальное DOM дерево -->
        <!-- знало, что каждая карточка уникальная, ведь используем v-for -->
        <!-- Примечание: :v-key="item.id" можно не писать после v-for -->
        
        <Card
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :imageUrl="item.imageUrl"
            :price="item.price"
            :genres="item.genres"
            :dateRel="item.dateRel"
            :description="item.description"
            :developer="item.developer"
            :isAdded="item.isAdded"
            :onClickAdd="isFavourites ? null : () => emit('addToCart', item)"
            :onClickFavourite="isFavourites ? null : () => emit('addToFavourite', item)"
            :isFavourite="item.isFavourite"  
            />
        
    </div>
</template>