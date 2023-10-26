<template>
    <div class="h-full p-8">
        <div class="bg-white rounded-lg shadow-xl pb-8">
            <!-- Профиль -->
            <Profile />
            <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                <div class="flex items-center space-x-4 mt-2">
                    <!-- Диалоговое окно для создания вакансии -->
                    <DialogWindow @updateVacancies="updateVacancies" />
                </div>
            </div>
        </div>
    </div>
    <div class="h-full px-8 pb-8">
        <div class="bg-white rounded-lg overflow-hidden shadow-xl">
            <!---->
            <div class="flex flex-row">
                <div class="basis-3/4">
                    <v-text-field @change="changeSearch" v-model="search" hide-details="auto" clearable
                        label="Искать (ПОКА НЕ РАБОТАЕТ)"></v-text-field>
                </div>
                <div class="basis-1/4">
                    <v-autocomplete v-model="select" hide-details="auto" label="Искать по" item-value="id" return-value
                        item-title="title" :items="itemsSearch"></v-autocomplete>
                </div>
            </div>
            <!-- Вакансии пользователя -->
            <div class="h-[500px] overflow-auto">
                <ProfileVacancies @goEmitDelete="goEmitDelete" @uploadVacanciesChange="uploadVacanciesChange"
                    :vacancies="vacancies" />
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'

import $api from '@/http';

import { useNavbarStore } from '../../store/navbarStore';

import Profile from '@/components/EmployerSection/Profile/Profile.vue'
import DialogWindow from '@/components/EmployerSection/Vacancy/DialogWindow.vue'
import ProfileVacancies from '@/components/EmployerSection/Profile/ProfileVacancies.vue';

export default {
    components: {
        Profile,
        DialogWindow,
        ProfileVacancies
    },
    data() {
        return {
            search: '',
            select: 0,
            url: '',

            vacancies: [],

            itemsSearch: [
                { id: 0, title: 'Названию должности', },
                { id: 1, title: 'Сфере работ' },
                { id: 2, title: 'Описанию' },
            ],
        }
    },
    methods: {
        changeSearch() {
            console.log('изменено')
            // id search != ''
            // тут отправлять при изменении на бек запрос по фильтру
        },
        async goEmitDelete() {
            this.vacancies = []
            await this.uploadVacancies()
        },
        async updateVacancies() {
            this.vacancies = []
            await this.uploadVacancies()
        },
        async uploadVacanciesChange() {
            this.vacancies = []
            await this.uploadVacancies()
        },
        async uploadVacancies() {
            this.vacancies = []
            console.log('Загрузка вакансий')
            const vacancies = await $api.get('/vacancy/get-all-vacancies-for-employer')

            console.log(vacancies)

            this.vacancies = vacancies.data
        }
    },
    async mounted() {
        await this.uploadVacancies()
    },
    watch: {
        select() {
            this.changeSearch()
        }
    },
    setup() {
        const navbarStore = useNavbarStore()
        navbarStore.pathNow = useRoute().path

        document.title = 'Профиль'

        return { navbarStore }
    }
}
</script>

<style scoped></style>