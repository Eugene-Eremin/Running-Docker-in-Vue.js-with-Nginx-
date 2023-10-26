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
                            <span class="text-h5">Изменить данные владеемого навыка</span>
                        </div>
                    </v-card-title>
                    <div class="p-2">
                        <v-card-text>
                            <v-form ref="form" @submit.prevent>
                                <v-autocomplete v-model="skill" :rules="countRules" :items="items" label="Навык"
                                    item-title="name" return-object variant="underlined" required></v-autocomplete>
                                <v-text-field v-model="grade" :rules="countRulesGrade" label="Оценка" required
                                    variant="underlined"></v-text-field>
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
        jobSearchAreas: {
            type: Number,
            required: true,
        },
        ownedSkill: {
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

        skill: null,
        grade: null,

        countRules: [
            v => !!v || 'Обязательное поле'
        ],
        countRulesGrade: [
            v => !!v || 'Обязательное поле',
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
                this.$emit("changeOwnedSkill", data)
            }

            this.dialog = false
            this.skill = this.origin.skill
            this.grade = this.origin.grade
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) this.closeCard(true)
        },
        setData() {
            console.log(this.ownedSkill)

            this.origin = {
                skill: this.ownedSkill.skill,
                grade: this.ownedSkill.grade,
            }

            this.skill = this.ownedSkill.skill
            this.grade = this.ownedSkill.grade
        }
    }),
    watch: {
        ownedSkill() {
            this.setData()
        }
    },
    async mounted() {
        this.setData()

        console.log(this.jobSearchAreas)

        const { data } = await $api.get('/general-tables/skills/' + this.jobSearchAreas)
        console.log(data)
        this.items = data
    },
}
</script>
