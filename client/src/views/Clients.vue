<template>
    <div class="flex flex-col xl:flex-row justify-center items-start mx-auto 2xl:w-[1536px]">
        <!-- Пользователи -->
        <div class="w-[370px] 0.5sm:w-[490px] md:w-[750px] mx-auto p-10 drop-shadow-2xl lg:w-3/5">
            <div class="pb-4 flex flex-col 1.8xl:flex-row items-center">
                <!-- Search форма -->
                <SearchForm />
            </div>
            <div class="rounded-md overflow-hidden">
                <!-- Таблица -->
                <UsersTable @openApplication="openApplication" />
            </div>
        </div>
        <!-- Инфо. выбранного пользователя или форма создание нового -->
        <div class="w-[370px] 0.5sm:w-[490px] md:w-[750px] drop-shadow-2xl mx-auto p-10 lg:w-2/5">
            <!-- Создать пользователя -->
            <div v-show="show">
                <UserCreateForm @closeApplication="closeApplication" />
            </div>
        </div>
    </div>
</template>

<script setup>
import SearchForm from '../components/ClientsSection/Users/SearchForm.vue'
import UsersTable from '../components/ClientsSection/Users/UsersTable.vue';
import UserCreateForm from '../components/ClientsSection/UserInfoOrCreateForm/UserCreateForm/UserCreateForm.vue';

import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { EventBus } from '@/event-bus';

import { useNavbarStore } from '../store/navbarStore';
import { useTableInformationStore } from '@/store/tableInformationStore';
import { useUserStore } from '../store/userStore'

const tableInformationStore = useTableInformationStore()
const userStore = useUserStore()

const navbarStore = useNavbarStore()
navbarStore.pathNow = useRoute().path

const show = ref(false)

const telegramId = ref()

const openApplication = (id) => {
    EventBus.emit('data-emitted', id);
    show.value = true
}

const closeApplication = () => {
    show.value = false
}

// ---

document.title = 'Клиенты'

</script>