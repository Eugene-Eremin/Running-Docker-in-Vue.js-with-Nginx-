<template>
    <!-- Верхняя патель -->
    <nav id="navbar" class="drop-shadow-2xl fixed top-0 z-40 flex w-full flex-row bg-gray-700 px-4 justify-between">
        <ul class="breadcrumb flex-row items-center py-4 text-lg text-white sm:flex">
            <li class="inline transition ease-in-out duration-350 hover:text-gray-300 active:text-gray-400">
                <RouterLink to="/">HR-Platform</RouterLink>
            </li>
            <li class="inline">
                <span>{{ pathNow }}</span>
            </li>
        </ul>
        <button id="btnSidebarToggler" type="button"
            class="transition ease-in-out duration-350 py-4 text-2xl text-white hover:text-gray-200">
            <svg id="navClosed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg id="navOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="hidden h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </nav>

    <!-- Левый сайтбар -->
    <div id="containerSidebar" class="z-40">
        <div class="navbar-menu relative z-40">
            <nav id="sidebar"
                class="fixed left-0 bottom-0 flex w-3/4 -translate-x-full flex-col overflow-y-auto bg-gray-700 pt-6 pb-8 sm:max-w-xs lg:w-80">
                <div class="px-4 pb-6">
                    <h3 class="mb-2 text-xs font-medium uppercase text-gray-500">
                        Разделы
                    </h3>
                    <ul class="mb-8 text-sm font-medium">
                        <li>
                            <RouterLink id="homeLink"
                                class="transition ease-in-out duration-350 flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                to="/">
                                <span class="select-none">Главня</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink id="clientsLink"
                                class="transition ease-in-out duration-350 flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                to="/clients">
                                <span class="select-none">Клиенты</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink id="vacanciesLink"
                                class="transition ease-in-out duration-350 flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                to="/vacancies">
                                <span class="select-none">Вакансии</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink id="selectionsLink"
                                class="transition ease-in-out duration-350 flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                to="/selections">
                                <span class="select-none">Подборки</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink id="tableEditingLink"
                                class="transition ease-in-out duration-350 flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                to="/table-editing">
                                <span class="select-none">Редактирование таблиц</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="px-4 pb-6 mt-auto">
                    <h3 class="mb-2 mt-auto text-xs font-medium uppercase text-gray-500">
                        Профиль
                    </h3>
                    <ul class="text-sm font-medium">
                        <li>
                            <RouterLink id="adminLink"
                                class="transition ease-in-out duration-350 flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                to="/admin">
                                <span class="select-none">Мой профиль ({{ userStore.email }})</span>
                            </RouterLink>
                        </li>
                        <li>
                            <div id="registrationLink" @click="logout"
                                class="transition ease-in-out duration-350 flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">
                                <span class="select-none">Выйти</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

import router from '@/router';

import { useNavbarStore } from '../../store/navbarStore';
import { useUserStore } from '@/store/userStore';

const navbarStore = useNavbarStore()
const userStore = useUserStore()

const pathNow = ref('')

const logout = () => {
    userStore.logout()
    router.push('/login')
}

onMounted(() => {
    const navbar = document.getElementById("navbar");
    const sidebar = document.getElementById("sidebar");
    const btnSidebarToggler = document.getElementById("btnSidebarToggler");
    const homeLink = document.getElementById("homeLink");
    const clientsLink = document.getElementById("clientsLink");
    const vacanciesLink = document.getElementById("vacanciesLink");
    const selectionsLink = document.getElementById("selectionsLink");
    const tableEditingLink = document.getElementById("tableEditingLink");
    const adminLink = document.getElementById("adminLink");
    const navClosed = document.getElementById("navClosed");
    const navOpen = document.getElementById("navOpen");

    btnSidebarToggler.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    homeLink.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    clientsLink.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    vacanciesLink.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    selectionsLink.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    tableEditingLink.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    adminLink.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });

    sidebar.style.top = parseInt(navbar.clientHeight) - 1 + "px";

    // ---

    if (navbarStore.pathNow == '/') {
        pathNow.value = 'Главная'
    } else if (navbarStore.pathNow == '/clients') {
        pathNow.value = 'Клиенты'
    } else if (navbarStore.pathNow == '/vacancies') {
        pathNow.value = 'Вакансии'
    } else if (navbarStore.pathNow == '/selections') {
        pathNow.value = 'Подборки'
    } else if (navbarStore.pathNow == '/table-editing') {
        pathNow.value = 'Редактирование таблиц'
    } else if (navbarStore.pathNow == '/admin') {
        pathNow.value = 'Мой профиль'
    }
    else {
        pathNow.value = 'Ошибка'
    }
})

// ---

watch(() => navbarStore.pathNow, (state) => {
    console.log(state)
    if (state == '/') {
        pathNow.value = 'Главная'
    } else if (state == '/clients') {
        pathNow.value = 'Клиенты'
    } else if (state == '/vacancies') {
        pathNow.value = 'Вакансии'
    } else if (state == '/selections') {
        pathNow.value = 'Подборки'
    } else if (state == '/table-editing') {
        pathNow.value = 'Редактирование таблиц'
    } else if (navbarStore.pathNow == '/admin') {
        pathNow.value = 'Мой профиль'
    } else {
        pathNow.value = 'Ошибка'
    }
})

</script>

<style scoped>
ul.breadcrumb li+li::before {
    content: "\276F";
    padding-left: 8px;
    padding-right: 4px;
    color: inherit;
}

ul.breadcrumb li span {
    opacity: 60%;
}

#sidebar {
    -webkit-transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);
    transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);
}

#sidebar.show {
    transform: translateX(0);
}

#sidebar ul li a.active {
    background: #1f2937;
    background-color: #1f2937;
}
</style>