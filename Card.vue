<script setup>
import {ref} from 'vue';


defineProps({
    id: Number,
    title: String,
    imageUrl: String,
    price: Number,
    genres: Array,
    dateRel: String,
    icons: Array,
    description: String,
    developer: String,
    isFavourite: Boolean,
    isAdded: Boolean,
    onClickFavourite: Function,
    onClickAdd: Function,
    onClick: Function, 
})

const isExpanded = ref(false); 
const toggleExpand = () => {
    isExpanded.value = !isExpanded.value; 
};

</script>


<template>
  <div class="card">
    <!-- Изображение -->
    <div class="image-container">
      <img class="image" :src="imageUrl" alt="Game" />
    </div>

    <!-- Контент -->
    <div class="content">
      <div class="title">
        <p>{{ title }}</p>
      </div>

      

      <div class="genres">
        <span v-for="gener in genres" :key="gener" class="genre">{{ gener }}</span>
      </div>

      <div class="release-date">
        <p>Дата выхода: {{ dateRel }}</p>
        <p>Разработчик: {{ developer }}</p>
      </div>

      <button @click="toggleExpand" class="details-button">
        {{ isExpanded ? 'Скрыть описание' : 'Подробнее' }}
      </button>

      <div v-if="isExpanded" class="description">
        <p>{{ description }}</p>
        
        
      </div>
    </div>

    <!-- Действия -->
    <div class="actions">
      <img
        class="favourite-icon"
        v-if="onClickFavourite"
        @click="onClickFavourite"
        :src="!isFavourite ? '/like-1.svg' : '/like-liked.svg'"
        alt="Like"
      />
      <div class="price-container">
        <p class="price">{{ price }} ₽</p>
        <img
          v-if="onClickAdd"
          @click="onClickAdd"
          :src="!isAdded ? '/plus.svg' : '/checked.svg'"
          alt="Plus"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped src="../styles/card.less"></style>
