<script setup>
import {onMounted, ref, inject} from 'vue';
import axios from 'axios';

import CardList from '@/components/CardList.vue';
import InfoBlock from '@/components/InfoBlock.vue';


const countFavState = inject('countFavState');

const favourites = ref([]);

onMounted( async () => {
    try {
        const {data} = await axios.get(`https://75568229184a798a.mokky.dev/favourites?_relations=games`);
        favourites.value = data.map((obj) => obj.game);
    } catch (err) {
        console.log(err);
    }
});
</script>


<template>
    
    <InfoBlock
        v-if="countFavState.state.countFav === 0"
        title="У вас нет закладок" 
        description="Добавьте закладки, чтобы убрать этот грустный смайлик"
        image-url="/emoji-1.png"/>

            
        
    <CardList v-else
        :items="favourites" is-favourites/>
</template>