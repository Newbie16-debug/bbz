<script setup>
import { inject, reactive, watch, ref, onMounted } from 'vue';
import axios from 'axios';
import debounce from 'lodash.debounce';
import CardList from '../components/CardList.vue'
import GenInfo from '../components/GenInfo.vue';
import AddElement from '@/components/AddElement.vue';
import Slider from '@/components/Slider.vue';


const {cart, addToCart, removeFromCart} = inject('cart');

const countFavState = inject('countFavState');

const items = ref([]);

const genresList = ref([]); 


const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
    genres: []
});


// Обработка изменения выбора жанра через чекбоксы
const onChangeGenreSelect = (event) => {
    const genre = event.target.value;
    if (event.target.checked) {
        // Если жанр выбран, добавляем его в массив
        if (!filters.genres.includes(genre)) {
            filters.genres.push(genre);
        }
    } else {
        // Если жанр снят, удаляем его из массива
        filters.genres = filters.genres.filter(g => g !== genre);
    }
};

const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item);
    }
    else {
        removeFromCart(item);
    }

    console.log(cart);
}

//следит за изменением обычного HTML select и его значение "вшивать"
const onChangeSelect = (event) => {
    //здесь получаем из option либо name, либо price, либо -price
    //и пихаем в value
    filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
    filters.searchQuery = event.target.value}, 500);


const addToFavourite = async (item) => {
    try {
        
        if (!item.isFavourite) {
            const obj = {
            //тут меняю с item_id
            //item_id: item.id
            game_id: item.id
            };
            item.isFavourite = true;
            const {data} = await axios.post(`https://75568229184a798a.mokky.dev/favourites`, obj);
            
            //чтобы знать айди закладки для ее удаления
            item.favouriteId = data.id;
            countFavState.state.countFav++;
        }
        else {
            item.isFavourite = false;
            
            await axios.delete(`https://75568229184a798a.mokky.dev/favourites/${item.favouriteId}`);
            item.favouriteId = null;
            countFavState.state.countFav--;
        }
    } catch (err) {
        console.log(err);
    }
    //console.log(countFav.count);
}

//хук или что то такое
//следит за изменением переменной sortBy


//запрос закладок
const  fetchFavourites = async () => {
    try {
        
        const {data: favourites} = await axios.get(`https://75568229184a798a.mokky.dev/favourites`);
            
        items.value = items.value.map(item => {
            const favourite = favourites.find(favourite => favourite.game_id === item.id);

            if (!favourite) {
                return item;
            }

            return {
                ...item, 
                isFavourite: true,
                favouriteId: favourite.id,
                
            };
        });

        countFavState.updateCountFav(favourites.length);
        
    } catch (err) {
        console.log(err);
    }
}



//запрос списка товаров
const fetchItems = async () => {
    try {
        //параметры, которые передаем внутрь запросов
        const params = {
            sortBy: filters.sortBy
            // Передаем жанр в запрос
            //не пишем тут searchQuery, потому что
            //по умолчанию будет сортировка по заголовку
        };
        
        // Если жанры выбраны, добавляем их в параметры запроса
        if (filters.genres.length > 0) {
            // Формируем запрос с жанрами в виде массива genres[]
            params['genres[]'] = filters.genres;
        }


        //если меняется то, что ввожу в инпут
        if (filters.searchQuery) {
            
            params.title = `*${filters.searchQuery}*`;
        }
        //в {} передаем объект
        // и ждем ответа от сервера
        //путь на games
        const {data} = await axios.get(`https://75568229184a798a.mokky.dev/games`, {
            params
        });
            

        items.value = data.map((obj) => ({
            ...obj, 
            isAdded: false, 
            isFavourite: false,
            favouriteId: null
        }));
    } catch (err) {
        console.log(err);
    }
}

// Получаем список доступных жанров
// Функция для получения списка жанров
const fetchGenres = async () => {
    try {
        const {data} = await axios.get('https://75568229184a798a.mokky.dev/games?_select=genres');
        const uniqueGenres = new Set();
        data.forEach(item => {
            item.genres.forEach(genre => {
                uniqueGenres.add(genre);
            });
        });
        genresList.value = Array.from(uniqueGenres);
    } catch (err) {
        console.log('Ошибка при получении жанров:', err);
    }
};


// Как только рендерится компонент App.vue (при первом рендере)
// должно делать запрос на бэ
// для этого юзаем хук

//ожидаем монтирование комп-а App.vue внутрь приложения
//как только App.vue отрендерится(будет вшит в DOM дерево)
//произойдет вызов функции ниже

onMounted(async () => {
    const localCart = localStorage.getItem('cart');
    cart.value = localCart ? JSON.parse(localCart) : []

    
    await fetchItems();
    await fetchFavourites();
    await fetchGenres();
    
    

    items.value = items.value.map((item) => ({
        ...item,
        //если есть какой то из товаров в корзине, то true
        isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))
})

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
});

watch(filters, fetchItems)



</script>

<template>
    <div class="flex flex-col sm:flex-row justify-between items-center sm:gap-8 mb-8">
        <h2 class="text-3xl font-bold mb-4 sm:mb-0">Все игры</h2>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto ">
            <!-- Сортировка по -->
            <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none w-full sm:w-auto">
                <option value="name">По названию</option>
                <option value="price">По цене (дешевые)</option>
                <option value="-price">По цене (дорогие)</option>
            </select>

            <!-- Чекбоксы для жанров -->
            <div class="w-full sm:w-auto">
                <span>Выберите жанры:</span>
                <div class="flex flex-wrap gap-4">
                    <label v-for="genre in genresList" :key="genre" class="flex items-center">
                        <input 
                            type="checkbox" 
                            :value="genre" 
                            @change="onChangeGenreSelect" 
                            :checked="filters.genres.includes(genre)"
                            class="mr-2"
                        />
                        <span>{{ genre }}</span>
                    </label>
                </div>
            </div>

            <!-- Поле поиска -->
            <div class="relative w-full sm:w-auto">
                <img src="/search.svg" class="absolute left-4 top-3">
                <input 
                    @input="onChangeSearchInput" 
                    class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 w-full sm:w-auto" 
                    placeholder="Поиск..."
                />
            </div>
        </div>
    </div>

    <AddElement />
    <Slider />
    <div class="mt-10">
        <CardList 
            :items="items" 
            @add-to-favourite="addToFavourite" 
            @add-to-cart="onClickAddPlus" 
        />
        <GenInfo />
    </div>
    
</template>