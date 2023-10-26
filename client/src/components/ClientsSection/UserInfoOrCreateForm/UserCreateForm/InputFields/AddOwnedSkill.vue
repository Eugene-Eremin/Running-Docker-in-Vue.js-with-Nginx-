<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="600">
            <template v-slot:activator="{ props }">
                <button v-show="items.length != 0"
                    class="flex flex-row items-center text-gray-400 transition ease-in-out duration-350 w-full border text-sm rounded-md p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 hover:bg-gray-600 active:bg-gray-800"
                    v-bind="props">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                        </svg>
                    </div>
                    <div class="ml-2">
                        Добавить
                    </div>
                </button>
                <div v-show="items.length == 0">
                    Для указанной сферы работы нет навыков для выбора
                </div>
            </template>
            <v-card v-if="this.jobSearchAreas">
                <v-card-title>
                    <div class="mt-2">
                        <span class="text-h5">Добавить навык</span>

                    </div>
                </v-card-title>
                <div class="p-2">
                    <v-card-text>
                        <v-form ref="form" @submit.prevent>
                            <v-autocomplete v-model="skill" :rules="countRules" :items="items" label="Навык"
                                item-title="name" return-object variant="underlined" required></v-autocomplete>
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
            <v-card v-else>
                <v-card-title>
                    <div class="mt-2">
                        <span class="text-h5">Стоп!</span>
                    </div>
                </v-card-title>
                <div class="p-2">
                    <v-card-text>
                        <div>
                            <div>
                                Выберите сферу работы, чтобы указать
                                навык, которым владеете в этой сфере
                            </div>
                            <div>
                                <v-btn type="submit" block color="blue-grey-darken-2" class="mt-4"
                                    @click="closeCard(false)">
                                    Назад
                                </v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import $api from '@/http'

import { useTableInformationStore } from '@/store/tableInformationStore'

export default {
    props: ['jobSearchAreas'],
    data: () => ({
        dialog: false,
        items: [],

        skill: null,
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
                    skill: this.skill,
                    grade: Number(this.grade)
                }
                console.log(data)
                this.$emit("addOwnedSkill", data)
            }

            this.dialog = false
            this.skill = ''
            this.grade = null
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) this.closeCard(true)
        },
    }),
    watch: {
        async jobSearchAreas() {
            console.log(this.jobSearchAreas)

            const { data } = await $api.get('/general-tables/skills/' + this.jobSearchAreas)
            console.log(data)
            this.items = data
            useTableInformationStore().lengthItemsSkillsForValidation = this.items.length
        }
    },
}
</script>