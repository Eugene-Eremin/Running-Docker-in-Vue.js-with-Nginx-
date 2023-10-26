<template>
    <div class="text-center">
        <v-dialog v-model="dialogError" width="auto">
            <v-card>
                <v-alert title="Ошибка!" type="error">{{ message }}</v-alert>
            </v-card>
        </v-dialog>
    </div>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="600">
            <template v-slot:activator="{ props }">
                <button
                    class="flex flex-row items-center text-gray-400 transition ease-in-out duration-350 w-full border text-sm rounded-md p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 hover:bg-gray-600 active:bg-gray-800"
                    v-bind="props">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div class="ml-2">
                        Добавить
                    </div>
                </button>
            </template>
            <div>
                <v-card>
                    <v-card-title>
                        <div class="mt-2">
                            <span class="text-h5">Добавить работу</span>
                        </div>
                    </v-card-title>
                    <div class="p-2">
                        <v-card-text>
                            <v-form ref="form" @submit.prevent>
                                <v-text-field v-model="companyName" :rules="countRules" label="Название компании" required
                                    variant="underlined"></v-text-field>
                                <v-autocomplete v-model="scopeWork" :rules="countRules" :items="items" item-title="name"
                                    return-object label="Сфера" variant="underlined" required></v-autocomplete>
                                <v-text-field v-model="jobTitle" :rules="countRules" label="Должность" required
                                    variant="underlined"></v-text-field>
                                <v-text-field v-model="beginningWork" label="Начало работы (гггг-мм-дд)"
                                    v-mask="'####-##-##'" :rules="dateRules" required variant="underlined"></v-text-field>
                                <v-text-field v-model="endWork" label="Конец работы (гггг-мм-дд)" v-mask="'####-##-##'"
                                    :rules="dateEndRules" required variant="underlined"></v-text-field>
                                <v-btn type="submit" block color="blue-grey-darken-2" class="mt-4"
                                    @click="closeCard(false)">
                                    Назад
                                </v-btn>
                                <v-btn type="submit" block color="green-darken-4" class="mt-4" @click="validate">
                                    Добавить
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </div>
                </v-card>
            </div>
        </v-dialog>
    </v-row>
</template>

<script>
import $api from '@/http'

export default {
    data: () => ({
        dialog: false,
        items: [],

        companyName: '',
        scopeWork: null,
        jobTitle: '',
        beginningWork: '',
        endWork: '',

        countRules: [
            v => !!v || 'Обязательное поле'
        ],

        dateRules: [
            v => !!v || 'Обязательное поле',
            v => v.length == 10 || 'Введите дату полностью',
            v => ((Number(v.split('-')[0]) <= new Date().getFullYear() && Number(v.split('-')[0]) >= new Date().getFullYear() - 100) && (Number(v.split('-')[1]) <= 12 && Number(v.split('-')[1]) >= 1)) || 'Введите корректную дату',
        ],

        dateEndRules: [
            v => !!v || 'Введите корректную дату конца работы',
            v => v.length == 10 || 'Введите дату полностью',
            v => ((Number(v.split('-')[0]) <= new Date().getFullYear() && Number(v.split('-')[0]) >= new Date().getFullYear() - 100) && (Number(v.split('-')[1]) <= 12 && Number(v.split('-')[1]) >= 1)) || 'Введите корректную дату',
        ],

        dialogError: false,
        message: ''
    }),
    methods: ({
        closeCard(boolean) {
            if (boolean) {
                const data = {
                    companyName: this.companyName,
                    scopeWork: this.scopeWork,
                    jobTitle: this.jobTitle,
                    beginningWork: this.beginningWork,
                    endWork: this.endWork
                }
                console.log(data)
                this.$emit("addPastWorkData", data)
            }

            this.dialog = false
            this.companyName = ''
            this.scopeWork = null
            this.jobTitle = ''
            this.beginningWork = ''
            this.endWork = ''
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (this.beginningWork.split('-')[0] + this.beginningWork.split('-')[1] + this.beginningWork.split('-')[2] < this.endWork.split('-')[0] + this.endWork.split('-')[1] + this.endWork.split('-')[2]) {
                function isValidDate(dateString) {
                    const [year, month, day] = dateString.split("-");
                    const date = new Date(year, month - 1, day);
                    return (
                        date.getFullYear() == year &&
                        date.getMonth() + 1 == month &&
                        date.getDate() == day
                    );
                }

                const date1 = this.beginningWork;
                const date2 = this.endWork;

                if (isValidDate(date1) && isValidDate(date2)) {
                    if (valid) this.closeCard(true)
                } else {
                    this.message = 'Нет такого дня(-ей) в месяце(-ах)'
                    this.dialogError = true
                }
            } else {
                function isValidDate(dateString) {
                    const [year, month, day] = dateString.split("-");
                    const date = new Date(year, month - 1, day);
                    return (
                        date.getFullYear() == year &&
                        date.getMonth() + 1 == month &&
                        date.getDate() == day
                    );
                }

                const date1 = this.beginningWork;
                const date2 = this.endWork;

                if (isValidDate(date1) && isValidDate(date2)) {
                    this.message = 'Введите корректно конечную дату'
                    this.dialogError = true
                } else {
                    this.message = 'Нет такого дня(-ей) в месяце(-ах)'
                    this.dialogError = true
                }
            }
        },
    }),
    async mounted() {
        const { data } = await $api.get('/general-tables/areas-of-work')
        console.log(data)
        this.items = data
    },
}
</script>
