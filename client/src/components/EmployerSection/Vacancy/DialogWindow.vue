<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <template v-slot:activator="{ props }">
                <v-btn color="green-darken-4" @click="createVacancy" v-bind="props" prepend-icon="mdi-plus">
                    Создать вакансию
                </v-btn>
            </template>
            <v-card>
                <v-toolbar class="bg-gray-700">
                    <v-btn color="white" icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn color="white" icon dark @click="reset">
                        <v-icon>mdi-restore</v-icon>
                    </v-btn>
                    <div class="text-white text-xl pl-3">Вакансия</div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn color="white" variant="text" @click="validate">
                            Сохранить
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <div class="p-8">
                    <v-form ref="form">
                        <!-- Добавление картинки -->
                        <div>
                            <div v-show="filePicture == null"
                                class="mt-2 mb-8 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div class="text-center">
                                    <v-icon>mdi-image-area-close</v-icon>
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label for="file-upload"
                                            class="relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2  focus-within:ring-offset-2">
                                            <span>Выберите картинку</span>
                                            <input id="file-upload" name="file-upload" accept="image/*" type="file"
                                                lang="ru" class="sr-only" @change="uploadFilePicture" />
                                        </label>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                                </div>
                            </div>
                            <div v-show="filePicture != null" class="mt-2 mb-6 ml-auto mr-auto">
                                <img class="h-[500px] ml-auto mr-auto" :src="url">
                                <div class="text-center mt-2">
                                    <v-btn variant="text" @click="filePicture = null, url = null">
                                        Удалить
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                        <!----------------------->

                        <div class="pb-6"><span class="text-red">*</span> - обязательное для заполнения*</div>

                        <div>Название должности<span class="text-red">*</span></div>
                        <v-text-field type="text" v-model="companyName" :rules="countRules" required
                            variant="underlined"></v-text-field>

                        <!-- Поле с выбором сфер работ и возможностью указать для каждой опыт -->
                        <!-- Так же в этом компоненте компонент с выбором скиллов -->
                        <AreasOfWorkAndExperienceAndSkills @addArOfWrAndExperience="addArOfWrAndExperience"
                            @addSkills="addSkills" :val="val" />

                        <div>Описание<span class="text-red">*</span></div>
                        <v-textarea type="text" v-model="description" :rules="countRulesForDescription" clearable
                            variant="underlined"></v-textarea>

                        <div>Опыт в конкретных компаниях</div>
                        <v-autocomplete v-model="selectExperienceCompanies" :items="itemsExperienceCompanies"
                            variant="underlined" clearable item-title="name" item-value="id" return-object
                            multiple></v-autocomplete>

                        <div>Образование</div>
                        <v-autocomplete v-model="selectLevlEducation" :items="itemsLevlEducation" item-title="name"
                            item-value="id" return-object clearable variant="underlined"></v-autocomplete>

                        <div>Знание языков</div>
                        <v-autocomplete v-model="selectSpokenLanguages" :items="itemsSpokenLanguage" item-title="name"
                            item-value="id" return-object clearable variant="underlined" multiple></v-autocomplete>

                        <div>Обязательные требования</div>
                        <v-textarea type="text" v-model="mandatoryRequirements" clearable
                            variant="underlined"></v-textarea>

                        <div>Тестовое задание</div>
                        <v-file-input @change="uploadFileTest" @click:clear="uploadFileTest" clearable
                            variant="underlined"></v-file-input>

                        <v-btn color="green-darken-4" block variant="text" @click="validate">
                            Сохранить
                        </v-btn>

                    </v-form>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import $api from '@/http/index'

import AreasOfWorkAndExperienceAndSkills from './Fields/AreasOfWorkAndExperienceAndSkills/AreasOfWorkAndExperienceAndSkills.vue'

export default {
    components: {
        AreasOfWorkAndExperienceAndSkills,
    },
    data() {
        return {
            dialog: false,

            val: false,

            // --

            filePicture: null,
            url: null,

            companyName: '',

            selectAreasOfWorkAndExp: [],
            selectedSkills: [],
            finSkills: [],

            description: '',

            selectExperienceCompanies: [],
            itemsExperienceCompanies: [],

            selectLevlEducation: [],
            itemsLevlEducation: [],

            selectSpokenLanguages: [],
            itemsSpokenLanguage: [],

            mandatoryRequirements: '',

            fileTest: null,

            // --

            countRules: [
                v => !!v || 'Обязательное поле',
                v => (v.length < 256) || 'Не более 255 символов',
            ],

            countRulesForArrays: [
                v => (v.length != 0) || 'Обязательное поле'
            ],

            countRulesForDescription: [
                v => (v != null) || 'Обязательное поле',
                v => (v.length != 0) || 'Обязательное поле',
                v => (v.length < 256) || 'Не более 255 символов',
            ],

            // countRulesForMN: [
            //     v => (this.mandatoryRequirements.length < 256) || 'Не более 255 символов',
            // ]
        }
    },
    methods: {
        async createVacancy() {
            const dataNameCompanies = await $api.get('/vacancy-tables/name-companies')
            console.log(dataNameCompanies)
            this.itemsExperienceCompanies = dataNameCompanies.data

            const dataLevlEducation = await $api.get('/general-tables/level-of-education')
            console.log(dataLevlEducation)
            this.itemsLevlEducation = dataLevlEducation.data

            const dataSpokenLanguage = await $api.get('/general-tables/languages')
            console.log(dataSpokenLanguage)
            this.itemsSpokenLanguage = dataSpokenLanguage.data

        },
        uploadFilePicture(event) {
            if (event.target.files) {
                this.filePicture = event.target.files[0]
                console.log(this.filePicture)
                this.url = URL.createObjectURL(this.filePicture)
                console.log(this.url)
            } else {
                this.filePicture = null
            }
        },
        addArOfWrAndExperience(data) {
            this.selectAreasOfWorkAndExp = data
            let i = 0

            let finalSkills = []
            while (this.selectAreasOfWorkAndExp.length > i) {
                let j = 0
                while (this.selectedSkills.length > j) {
                    if (this.selectAreasOfWorkAndExp[i].id == this.selectedSkills[j].areaOfWorkId) {
                        console.log('нашел')
                        finalSkills.push(this.selectedSkills[j])
                    }
                    ++j
                }
                ++i
            }
            this.selectedSkills = finalSkills

            console.log(this.selectAreasOfWorkAndExp)
        },
        addSkills(skill) {
            console.log(skill)
            this.selectedSkills.push(skill)
            console.log(this.selectedSkills)
        },
        uploadFileTest(event) {
            if (event.target.files) {
                this.fileTest = event.target.files[0]
            } else {
                this.fileTest = null
            }
        },
        // --
        async validate() {
            console.log(this.selectAreasOfWorkAndExp)
            console.log(this.selectedSkills)

            let finalSkills = []

            let i = 0
            while (this.selectAreasOfWorkAndExp.length > i) {
                finalSkills.push([])
                let j = 0
                while (this.selectedSkills.length > j) {
                    if (this.selectAreasOfWorkAndExp[i].id == this.selectedSkills[j].areaOfWorkId) {
                        console.log('нашел')
                        finalSkills[i].push(this.selectedSkills[j])
                    }
                    ++j
                }
                ++i
            }

            this.finSkills = []
            i = 0
            while (finalSkills.length > i) {
                console.log(i)
                let j = 0
                while (finalSkills[i].length > j) {
                    console.log(j)
                    if (finalSkills[i][j].checkbox == true) {
                        this.finSkills.push(finalSkills[i][j])
                    }
                    ++j
                }
                ++i
            }


            console.log(this.finSkills)
            console.log(finalSkills)

            const { valid } = await this.$refs.form.validate()

            if (this.finSkills.length == 0) {
                this.val = true
            }
            else if (valid) {
                const vacancyData = {

                    companyName: this.companyName,

                    selectAreasOfWorkAndExp: this.selectAreasOfWorkAndExp,
                    selectedSkills: this.finSkills,

                    description: this.description,

                    selectExperienceCompanies: this.selectExperienceCompanies,

                    selectLevlEducation: this.selectLevlEducation,

                    selectSpokenLanguages: this.selectSpokenLanguages,

                    mandatoryRequirements: this.mandatoryRequirements,

                }

                console.log(vacancyData)

                try {
                    const dataVD = await $api.post('/vacancy/create-vacancy-data', { vacancyData })
                    console.log(dataVD.data)
                } catch (e) {
                    console.log(e)
                }

                let files = new FormData();
                files.append('filePicture', this.filePicture)
                files.append('fileTest', this.fileTest)

                try {
                    const dataF = await $api.post('/vacancy/create-vacancy-files', files)
                    console.log(dataF.data)
                } catch (e) {
                    console.log(e)
                }

                this.dialog = false

                this.$emit('updateVacancies')

                this.reset()
            }
        },
        reset() {
            this.$refs.form.reset()
            this.filePicture = null
            this.url = null
            this.fileTest = null
        }
    },
    mounted() {
        this.mandatoryRequirements = ''
    },
    watch: {
        finSkills() {
            this.finSkills.length == 0 ? this.val = true : this.val = false
        },
    }
}
</script>

<style scoped></style>