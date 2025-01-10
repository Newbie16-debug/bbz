<script setup>
import { ref } from 'vue';
import axios from 'axios';


const isAdmin = ref(false);
const isModalOpen = ref(false);
const formData = ref({
    id: null,
    title: '',
    price: 0,
    imageUrl: '',
    dateRel: '',
    genres: '', 
    developer: '',
    description: ''
});

// Открытие модального окна с предустановленными данными
const openModal = (data = {}) => {
    isModalOpen.value = true;
    formData.value = {
        id: data.id || null,
        title: data.title || '',
        price: data.price || 0,
        imageUrl: data.imageUrl || '',
        dateRel: data.dateRel || '',
        genres: (data.genres || []).join(', '), // Преобразуем массив жанров в строку
        developer: data.developer || '',
        description: data.description || ''
    };
};


const closeModal = () => {
    isModalOpen.value = false;
};

// Преобразование строки жанров в массив
const prepareGenres = () => {
    formData.value.genres = formData.value.genres
        .split(',')
        .map((genre) => genre.trim()) 
        .filter((genre) => genre); 
};

// Отправка данных на сервер
const submitForm = async () => {
    try {
        prepareGenres(); 

        if (formData.value.id) {
            
            await axios.put(`https://75568229184a798a.mokky.dev/games/${formData.value.id}`, formData.value);
        } else {
            
            await axios.post('https://75568229184a798a.mokky.dev/games/', formData.value);
        }

        closeModal();
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
};
</script>
<template>
    <div v-if="true">
        <button 
            @click="openModal()" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Добавить игру
        </button>

        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 class="text-xl font-bold mb-4">{{ formData.id ? 'Изменить запись' : 'Добавить запись' }}</h2>
                <form @submit.prevent="submitForm">
                    <!-- Название -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Название</label>
                        <input 
                            v-model="formData.title" 
                            type="text" 
                            class="border rounded w-full px-3 py-2 outline-none" 
                            placeholder="Введите название" required/>
                    </div>

                    <!-- Цена -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Цена</label>
                        <input 
                            v-model="formData.price" 
                            type="text" 
                            class="border rounded w-full px-3 py-2 outline-none" 
                            placeholder="Введите цену" required/>
                    </div>

                    <!-- URL изображения -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">URL изображения</label>
                        <input 
                            v-model="formData.imageUrl" 
                            type="text" 
                            class="border rounded w-full px-3 py-2 outline-none" 
                            placeholder="Введите URL изображения" required/>
                    </div>

                    <!-- Дата релиза -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Дата релиза</label>
                        <input 
                            v-model="formData.dateRel" 
                            type="text" 
                            class="border rounded w-full px-3 py-2 outline-none" required/>
                    </div>

                    <!-- Жанры -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Жанры</label>
                        <input 
                            v-model="formData.genres" 
                            type="text" 
                            class="border rounded w-full px-3 py-2 outline-none" 
                            placeholder="Введите жанры через запятую" required/>
                    </div>

                    <!-- Разработчик -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Разработчик</label>
                        <input 
                            v-model="formData.developer" 
                            type="text" 
                            class="border rounded w-full px-3 py-2 outline-none" 
                            placeholder="Введите разработчика" required/>
                    </div>

                    <!-- Описание -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Описание</label>
                        <textarea 
                            v-model="formData.description" 
                            class="border rounded w-full px-3 py-2 outline-none" 
                            placeholder="Введите описание" required></textarea>
                    </div>

                    <!-- Кнопки -->
                    <div class="flex justify-end gap-4">
                        <button 
                            type="button" 
                            @click="closeModal" 
                            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Отмена
                        </button>
                        <button 
                            type="submit" 
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
