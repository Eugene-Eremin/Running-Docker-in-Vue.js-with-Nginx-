<template>
    <div class="overflow-y-hidden">
        <div class="mx-auto container flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0">
            <div class="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
                <img class="w-80 sm:w-auto lg:hidden" src="/home-img.png" alt="home" />
                <div class="w-80 sm:w-auto flex flex-col justify-start items-start">
                    <div>
                        <p class="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">HR-Platform</p>
                    </div>
                    <div class="mt-4 xl:w-3/5">
                        <p class="text-base leading-6 text-gray-600">
                            HR-Platform — это HR-платформа, где вы можете найти работу
                            или сотрудников в зависимости от ваших потребностей.
                        </p>
                    </div>
                    <div class="mt-16 w-full drop-shadow-2xl">
                        <RouterLink v-if="userStore.authorized" to="/vacancies"
                            class="transition ease-in-out duration-350 px-4 rounded-md bg-gray-900 flex justify-between items-center w-full lg:w-72 h-14  text-white hover:bg-gray-700 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            <p class="text-xl font-medium leading-5">Начать</p>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.66663 16H25.3333" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M20 21.3333L25.3333 16" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M20 10.6667L25.3333 16" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </RouterLink>
                        <RouterLink v-else to="/login"
                            class="transition ease-in-out duration-350 px-4 rounded-md bg-gray-900 flex justify-between items-center w-full lg:w-72 h-14  text-white hover:bg-gray-700 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            <p class="text-xl font-medium leading-5">Начать</p>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.66663 16H25.3333" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M20 21.3333L25.3333 16" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M20 10.6667L25.3333 16" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </RouterLink>
                    </div>
                </div>
                <div
                    class="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                    <img class="w-96 h-96 max-w-sm hidden lg:block" src="/home-img.png" alt="home" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import { useUserStore } from '@/store/userStore';
import { useNavbarStore } from '../store/navbarStore';

const navbarStore = useNavbarStore()
navbarStore.pathNow = useRoute().path

const userStore = useUserStore()

document.title = 'Главная'

</script>
