<template>
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
                                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                    </div>
                    <div class="ml-2">
                        Добавить
                    </div>
                </button>
            </template>
            <v-card>
                <v-card-title>
                    <div class="mt-2">
                        <span class="text-h5">Добавить язык</span>
                    </div>
                </v-card-title>
                <div class="p-2">
                    <v-card-text>
                        <v-form ref="form" @submit.prevent>
                            <v-autocomplete v-model="language" :rules="countRules" :items="items" label="Язык"
                                variant="underlined" item-title="name" return-object required></v-autocomplete>
                            <v-text-field v-model="grade" :rules="countRulesGrade" label="Оценка" required
                                variant="underlined"></v-text-field>
                            <v-btn type="submit" block color="blue-grey-darken-2" class="mt-4" @click="closeCard(false)">
                                Назад
                            </v-btn>
                            <v-btn type="submit" block color="green-darken-4" class="mt-4" @click="validate">
                                Добавить
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import $api from '@/http'

export default {
    data: () => ({
        dialog: false,
        items: [],

        language: null,
        grade: null,

        countRules: [
            v => !!v || 'Обязательное поле'
        ],
        countRulesGrade: [
            v => !!v || 'Обязательное поле',
            v => (typeof v !== 'number') || 'Неверный тип данных',
            v => (v < 11) || 'Оценка должна быть от 0 до 10',
            v => (v > -1) || 'Оценка должна быть от 0 до 10',
        ]
    }),
    methods: ({
        closeCard(boolean) {
            if (boolean) {
                const data = {
                    language: this.language,
                    grade: Number(this.grade)
                }
                console.log(data)
                this.$emit("addSpokenLanguage", data)
            }

            this.dialog = false
            this.language = ''
            this.grade = null
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) this.closeCard(true)
        },
    }),
    async mounted() {
        const { data } = await $api.get('/general-tables/languages')
        console.log(data)
        this.items = data
    },
}
</script>