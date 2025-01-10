<template>
  <div class="slider-wrapper">
    <div ref="slider" class="slider">
      <div class="slide"><img src="/public/slider-images/slide-capcom.jpg"/></div>
      <div class="slide"><img src="/public/slider-images/slider-capcom-new.avif"/></div>
      <div class="slide">Слайд 3</div>
    </div>
    <div class="controls">
     
    <img src="/public/left-arrow.svg" alt="Left Arrow" @click="prevSlide" class="left-arrow" />
    
    <img src="/public/right-arrow.svg" alt="Right Arrow" @click="nextSlide" class="right-arrow" />
    </div>
  </div>
</template>

<script>
// Импортируем jQuery и slick
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel'; // Подключаем slick.js

import { onMounted, ref } from 'vue';

export default {
  name: 'Slider',
  setup() {
    const slider = ref(null); // Ссылка на слайдер

    // Инициализация slick при монтировании компонента
    onMounted(() => {
      $(slider.value).slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
      });
    });

    // Методы для управления слайдером
    const prevSlide = () => {
      $(slider.value).slick('slickPrev');
    };

    const nextSlide = () => {
      $(slider.value).slick('slickNext');
    };

    return {
      slider,
      prevSlide,
      nextSlide,
    };
  },
};
</script>

<style scoped>
/* Базовый стиль для слайдера */
.slider-wrapper {
width: 60%; 
margin: 0 auto;
position: relative;
}

.slider {
display: flex;
overflow: hidden;
}

.slide {
width: 100%;
height: 300px;
background-color: #ddd;
display: flex;
justify-content: center;
align-items: center;
font-size: 2rem;
}

.slide img {
width: 100%;
height: 100%;
object-fit: fill;
}

/* Позиционирование стрелок */
.controls {
position: absolute;
top: 50%;
width: 100%;
display: flex;
justify-content: space-between;
transform: translateY(-50%);
}

/* Стиль стрелок */
.left-arrow,
.right-arrow {
width: 70px;
cursor: pointer;
}

.left-arrow {
margin-left: 10px;
}

.right-arrow {
margin-right: 10px;
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 768px) {
.slider-wrapper {
  width: 100%; 
}

.slide {
  height: 200px; 
}

.controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}

.left-arrow,
.right-arrow {
  width: 50px; 
}
}


@media (max-width: 480px) {
.slide {
  height: 150px; 
}

.left-arrow,
.right-arrow {
  width: 40px; 
}
}
</style>

  