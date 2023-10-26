<template>
    <div class="relative mt-1 text-gray-400 w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
            </svg>
        </div>
        <input v-model="search" @keyup.enter="searchUsers" type="text"
            class="transition ease-in-out duration-350 focus:outline-none focus:ring focus:ring-gray-400 focus:border-gray-500 w-full border text-sm rounded-md block pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400"
            placeholder="Найти по номеру, имени или сфере">
    </div>
</template>

<script setup>
import { ref } from 'vue';

const search = ref('')

const searchUsers = () => {
    console.log(`Найти пользователей - ${search.value}`)
    // ...
    search.value = ''
}

</script>
