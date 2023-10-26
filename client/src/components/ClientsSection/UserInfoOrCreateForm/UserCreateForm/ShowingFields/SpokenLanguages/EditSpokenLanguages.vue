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
            <v-card>
                <v-card-title>
                    <div class="mt-2">
                        <span class="text-h5">Изменить данные о языке</span>
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
                            <v-btn type="submit" block color="amber-accent-4" class="mt-4 text-white" @click="validate">
                                Изменить
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
    props: {
        spokenLanguage: {
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
                    grade: this.grade
                }
                console.log(data)
                this.$emit("changeSpokenLanguage", data)
            }

            this.dialog = false
            this.language = this.origin.language
            this.grade = this.origin.grade
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) this.closeCard(true)
        },
        setData() {
            console.log(this.spokenLanguage)

            this.origin = {
                language: this.spokenLanguage.language,
                grade: this.spokenLanguage.grade,
            }

            this.language = this.spokenLanguage.language
            this.grade = this.spokenLanguage.grade
        }
    }),
    watch: {
        spokenLanguage() {
            this.setData()
        }
    },
    async mounted() {
        this.setData()

        const { data } = await $api.get('/general-tables/languages')
        console.log(data)
        this.items = data
    },
}
</script>