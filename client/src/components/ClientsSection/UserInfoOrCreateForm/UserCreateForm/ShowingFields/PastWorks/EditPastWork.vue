<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="600">
            <template v-slot:activator="{ props }">
                <button v-bind="props"
                    class="hover:bg-yellow-600 active:bg-yellow-700 transition ease-in-out duration-350 flex flex-row rounded-t-md border-b-0 w-20 overflow-hidden border bg-yellow-700 border-gray-700">
                    <div class="flex-1 text-white">
                        изменить
                    </div>
                </button>
            </template>
            <div>
                <v-card>
                    <v-card-title>
                        <div class="mt-2">
                            <span class="text-h5">Изменить данные прошлой работы</span>
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
                                <v-text-field v-model="endWork" label="Начало работы (гггг-мм-дд)" v-mask="'####-##-##'"
                                    :rules="dateEndRules" required variant="underlined"></v-text-field>
                                <v-btn type="submit" block color="blue-grey-darken-2" class="mt-4"
                                    @click="closeCard(false)">
                                    Назад
                                </v-btn>
                                <v-btn type="submit" block color="amber-accent-4" class="mt-4 text-white" @click="validate">
                                    Изменить
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
    props: {
        pastWork: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        dialog: false,
        items: [],

        origin: {},

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
                this.$emit("changePastWork", data)
            }

            this.dialog = false
            this.companyName = this.origin.companyName
            this.scopeWork = this.origin.scopeWork
            this.jobTitle = this.origin.jobTitle
            this.beginningWork = this.origin.beginningWork
            this.endWork = this.origin.endWork
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
        setData() {
            console.log(this.pastWork)

            this.origin = {
                companyName: this.pastWork.companyName,
                scopeWork: this.pastWork.scopeWork,
                jobTitle: this.pastWork.jobTitle,
                beginningWork: this.pastWork.beginningWork,
                endWork: this.pastWork.endWork
            }

            this.companyName = this.pastWork.companyName
            this.scopeWork = this.pastWork.scopeWork
            this.jobTitle = this.pastWork.jobTitle
            this.beginningWork = this.pastWork.beginningWork,
                this.endWork = this.pastWork.endWork
        }
    }),
    watch: {
        pastWork() {
            this.setData()
        }
    },
    async mounted() {
        this.setData()

        const { data } = await $api.get('/general-tables/areas-of-work')
        console.log(data)
        this.items = data
    },
}
</script>
