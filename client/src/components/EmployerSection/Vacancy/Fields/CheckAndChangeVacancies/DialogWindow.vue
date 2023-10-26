<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <template v-slot:activator="{ props }">
                <div v-if="changeOrOpen">
                    <v-btn @click="openOrChangeAndRefreshVacancy, changeCOOH(true)" variant="text" density="comfortable"
                        v-bind="props" icon="mdi-pencil"></v-btn>
                </div>
                <div v-else class="ml-3 mr-auto">
                    <v-btn @click="openOrChangeAndRefreshVacancy, changeCOOH(false)" v-bind="props">Открыть вакансию</v-btn>
                </div>
            </template>
            <v-card>
                <v-toolbar class="bg-gray-700">
                    <v-btn color="white" icon dark @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn color="white" icon dark @click="openOrChangeAndRefreshVacancy">
                        <v-icon>mdi-restore</v-icon>
                    </v-btn>
                    <v-btn color="white" icon dark @click="deleteVacancy">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn v-show="!changeOrOpenHere" color="white" icon dark @click="changeCOOH(true)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn v-show="changeOrOpenHere" color="white" icon dark @click="changeCOOH(false)">
                        <v-icon>mdi-pencil-off</v-icon>
                    </v-btn>
                    <div class="text-white text-xl pl-3">Вакансия</div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn v-show="changeOrOpenHere" color="white" variant="text" @click="validate">
                            Изменить
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <div class="p-8">
                    <v-form ref="form">
                        <!-- Добавление картинки -->
                        <div v-show="loadPicture">
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
                                <div v-if="url == null">
                                    <img class="h-[500px] ml-auto mr-auto" src="../../../../../../public/no-foto.png"
                                        alt="no-foto.png" />
                                </div>
                                <div v-else>
                                    <img class="h-[500px] ml-auto mr-auto" :src="url" :alt="filePictureName">
                                    <div v-show="changeOrOpenHere" class="text-center mt-2">
                                        <v-btn variant="text" @click="filePicture = null, url = null">
                                            Удалить
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!----------------------->

                        <div class="pb-6"><span class="text-red">*</span> - обязательное для заполнения*</div>

                        <div>Название должности<span class="text-red">*</span></div>
                        <v-text-field :disabled="!changeOrOpenHere" type="text" v-model="companyName" :rules="countRules"
                            required variant="underlined"></v-text-field>

                        <!-- Поле с выбором сфер работ и возможностью указать для каждой опыт -->
                        <!-- Так же в этом компоненте компонент с выбором скиллов -->
                        <div v-if="itemsAreasOfWorkProp != null">
                            <AreasOfWorkAndExperienceAndSkills @addArOfWrAndExperience="addArOfWrAndExperience"
                                @addSkills="addSkills" :val="val" :itemsAreasOfWorkProp="itemsAreasOfWorkProp"
                                :itemsSkillsProp="itemsSkillsProp" :changeOrOpenHere="changeOrOpenHere" />
                        </div>

                        <div>Описание<span class="text-red">*</span></div>
                        <v-textarea :disabled="!changeOrOpenHere" type="text" v-model="description"
                            :rules="countRulesForDescription" clearable variant="underlined"></v-textarea>

                        <div>Опыт в конкретных компаниях</div>
                        <v-autocomplete :disabled="!changeOrOpenHere" v-model="selectExperienceCompanies"
                            :items="itemsExperienceCompanies" variant="underlined" clearable item-title="name"
                            item-value="id" return-object multiple></v-autocomplete>

                        <div>Образование</div>
                        <v-autocomplete :disabled="!changeOrOpenHere" v-model="selectLevlEducation"
                            :items="itemsLevlEducation" item-title="name" item-value="id" return-object clearable
                            variant="underlined"></v-autocomplete>

                        <div>Знание языков</div>
                        <v-autocomplete :disabled="!changeOrOpenHere" v-model="selectSpokenLanguages"
                            :items="itemsSpokenLanguage" item-title="name" item-value="id" return-object clearable
                            variant="underlined" multiple></v-autocomplete>

                        <div>Обязательные требования</div>
                        <v-textarea :disabled="!changeOrOpenHere" type="text" v-model="mandatoryRequirements" clearable
                            variant="underlined"></v-textarea>

                        <div>Тестовое задание</div>

                        <div class="flex flex-row">
                            <div class=" basis-full">
                                <v-file-input :disabled="!changeOrOpenHere" :label="fileTestName" @change="uploadFileTest"
                                    @click:clear="uploadFileTest" clearable variant="underlined"></v-file-input>
                            </div>
                            <div class=" basis-1/12">
                                <v-btn :disabled="changeOrOpenHere && urlTest == null" @click="downloadTestFile"
                                    variant="text">
                                    Скачать
                                </v-btn>
                            </div>
                            <div v-show="changeOrOpenHere && fileTestName != null" class=" basis-1/12">
                                <v-btn @click="fileTest = null, fileTestName = null" variant="text">
                                    Удалить
                                </v-btn>
                            </div>
                        </div>

                        <v-btn v-show="changeOrOpenHere" color="orange" block variant="text" @click="validate">
                            Изменить
                        </v-btn>

                    </v-form>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import $api from '@/http/index'

import AreasOfWorkAndExperienceAndSkills from './AreasOfWorkAndExperienceAndSkills.vue'

export default {
    components: {
        AreasOfWorkAndExperienceAndSkills,
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        changeOrOpen: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            changeOrOpenHere: this.changeOrOpen,

            dialog: false,

            val: false,

            // --

            filePicture: null,
            filePictureName: '',
            url: null,
            loadPicture: false,

            companyName: '',

            selectAreasOfWorkAndExp: [],
            selectedSkills: [],
            finSkills: [],
            // ==
            itemsAreasOfWorkProp: null,
            itemsSkillsProp: null,
            // ==

            description: '',

            selectExperienceCompanies: [],
            itemsExperienceCompanies: [],

            selectLevlEducation: [],
            itemsLevlEducation: [],

            selectSpokenLanguages: [],
            itemsSpokenLanguage: [],

            mandatoryRequirements: '',

            fileTest: null,
            fileTestName: null,
            urlTest: null,
            fileTestDownload: '',

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
        }
    },
    methods: {
        async openOrChangeAndRefreshVacancy() {

            const dataNameCompanies = await $api.get('/vacancy-tables/name-companies')
            this.itemsExperienceCompanies = dataNameCompanies.data
            console.log(this.itemsExperienceCompanies)

            const dataLevlEducation = await $api.get('/general-tables/level-of-education')
            this.itemsLevlEducation = dataLevlEducation.data
            console.log(this.itemsLevlEducation)

            const dataSpokenLanguage = await $api.get('/general-tables/languages')
            this.itemsSpokenLanguage = dataSpokenLanguage.data
            console.log(this.itemsSpokenLanguage)

            // --

            const allVacancyInfo = await $api.get(`/vacancy/get-one-vacancy-for-employer/${this.id}`)
            console.log(allVacancyInfo)

            const response = await fetch(`http://localhost:5000/api/vacancy/get-vacancy-picture-file/${allVacancyInfo.data.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const blob = await response.blob()
                const downloadUrl = window.URL.createObjectURL(blob)
                this.url = downloadUrl
                this.filePicture = true
                this.filePictureName = allVacancyInfo.data.filePictureName
            } else {
                this.filePicture = true
                console.log('Фотографии компании нет')
                console.log(response)
            }

            this.loadPicture = true

            let i = 0

            this.companyName = allVacancyInfo.data.jobTitle

            this.itemsAreasOfWorkProp = allVacancyInfo.data.areasOfWorkVacancies
            this.itemsSkillsProp = allVacancyInfo.data.skillsVacancies

            this.description = allVacancyInfo.data.description

            this.selectExperienceCompanies = []
            while (allVacancyInfo.data.experienceInCompaniesVacancies.length > i) {
                let j = 0
                while (this.itemsExperienceCompanies.length > j) {
                    if (allVacancyInfo.data.experienceInCompaniesVacancies[i].nameCompaniesId == this.itemsExperienceCompanies[j].id) {
                        this.selectExperienceCompanies.push(this.itemsExperienceCompanies[j])
                        break
                    }
                    ++j
                }
                ++i
            }

            this.selectLevlEducation = []
            i = 0
            while (this.itemsLevlEducation.length > i) {
                if (allVacancyInfo.data.levelOfEducationId == this.itemsLevlEducation[i].id) {
                    this.selectLevlEducation = this.itemsLevlEducation[i]
                    break
                }
                ++i
            }

            this.selectSpokenLanguages = []
            i = 0
            while (allVacancyInfo.data.spokenLanguagesVacancies.length > i) {
                let j = 0
                while (this.itemsSpokenLanguage.length > j) {
                    if (allVacancyInfo.data.spokenLanguagesVacancies[i].languagesId == this.itemsSpokenLanguage[j].id) {
                        this.selectSpokenLanguages.push(this.itemsSpokenLanguage[j])
                        break
                    }
                    ++j
                }
                ++i
            }

            this.mandatoryRequirements = allVacancyInfo.data.mandatoryRequirements

            this.fileTestName = allVacancyInfo.data.fileTestName
            if (allVacancyInfo.data.fileTestKey != null) this.fileTest = true
            this.fileTestDownload = this.fileTestName
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
            this.fileTestName = null
            if (event.target.files) {
                this.fileTest = event.target.files[0]
            } else {
                this.fileTest = null
            }
            console.log(this.fileTest)
        },
        async downloadTestFile() {
            const response = await fetch(`http://localhost:5000/api/vacancy/get-vacancy-test-file/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const blob = await response.blob()
                const downloadUrl = window.URL.createObjectURL(blob)
                this.urlTest = downloadUrl
                console.log(this.urlTest)
                const link = document.createElement('a')
                console.log(blob)
                link.href = downloadUrl
                link.download = this.fileTestDownload
                document.body.append(link)
                link.click()
                link.remove()

            } else {
                console.log('ошибка')
                console.log(response)
            }
        },
        async changeCOOH(boolean) {
            await this.openOrChangeAndRefreshVacancy()
            this.changeOrOpenHere = boolean
            if (this.changeOrOpenHere && this.url == null) this.filePicture = null
        },
        async deleteVacancy() {
            const deleteVac = await $api.post(`/vacancy/delete-vacancy-data/${this.id}`)
            console.log(deleteVac)
            this.dialog = false
            this.$emit('deleteVacancyDialog')
            this.reset()
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
                    const dataVD = await $api.post(`/vacancy/update-vacancy-data/${this.id}`, { vacancyData })
                    console.log(dataVD.data)
                } catch (e) {
                    console.log(e)
                }

                let filePictureFormData
                this.url == null ? filePictureFormData = null : filePictureFormData = this.filePicture
                let fileTestFormData
                this.fileTestName == null && this.fileTest == null ? fileTestFormData = null : fileTestFormData = this.fileTest

                console.log('===Files===')
                console.log(filePictureFormData)
                console.log(fileTestFormData)
                console.log('===Files===')

                let files = new FormData();
                files.append('filePicture', filePictureFormData)
                files.append('fileTest', fileTestFormData)

                console.log('Перед изменением файла')

                try {
                    const dataF = await $api.post(`/vacancy/update-vacancy-files/${this.id}`, files)
                    console.log(dataF.data)
                } catch (e) {
                    console.log(e)
                }

                console.log('После изменения файла')

                this.dialog = false

                this.$emit('uploadVacanciesChange')

                this.reset()
            }
        },
        closeDialog() {
            this.dialog = false
            this.changeOrOpenHere = false
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
        changeOrOpen() {
            this.changeOrOpenHere = this.changeOrOpen
        }
    }
}
</script>

<style scoped></style>