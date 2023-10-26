<template>
    <div class="text-center m-8" v-if="vacancies.length == 0">
        Вакансий не найдено
    </div>
    <div v-else>
        <div v-for="vacancy in vacancies" :key="vacancy.id">
            <ActionsWithVacancies @goEmitDelete="goEmitDelete" @uploadVacanciesChange="uploadVacanciesChange"
                :vacancy="vacancy" />
        </div>
        <div class="mb-4"></div>
    </div>
</template>

<script>
import ActionsWithVacancies from '../Vacancy/ActionsWithVacancies.vue';

export default {
    components: {
        ActionsWithVacancies
    },
    props: {
        vacancies: {
            type: Array,
            required: true
        }
    },
    methods: {
        goEmitDelete() {
            this.$emit('goEmitDelete')
        },
        uploadVacanciesChange() {
            this.$emit('uploadVacanciesChange')
        }
    }
}
</script>

<style scoped></style>