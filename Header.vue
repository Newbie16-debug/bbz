<script setup>
import { ref } from "vue";


defineProps({
    totalPrice: Number
})


const emit = defineEmits(['openDrawer']);

</script>
<template>
    <header class="header">
      <router-link to="/">
        <div class="logo-container">
          <img src="/logo-logo.avif" alt="Logo" class="logo" />
          <div>
            <h2 class="store-name">ByteBaZaar</h2>
            <p class="store-tagline">Магазин компьютерных игр</p>
          </div>
        </div>
      </router-link>
  
      <ul class="nav-list">
        <li @click="() => emit('openDrawer')" class="nav-item">
          <img src="/cart.svg" alt="Cart" />
          <b>{{ totalPrice }} руб.</b>
        </li>
        <router-link to="/favourites">
          <li class="nav-item">
            <img src="/heart.svg" alt="Favorites" />
            <span>Закладки</span>
          </li>
        </router-link>
        <li class="nav-item">
          <img src="/profile.svg" alt="Profile" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
</template>
<style lang="less" scoped src="../styles/header.less"></style>
