<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <v-alert title="Ошибка!" type="error">{{ message }}</v-alert>
            </v-card>
        </v-dialog>
    </div>
    <div v-show="conslusion == null" class="bg-gray-700 text-gray-400">
        Загрузка...
    </div>
    <div v-show="conslusion == true" class="bg-gray-700 text-gray-400">
        Заявку уже начали проверять
    </div>
    <div v-show="conslusion == false" class="overflow-hidden rounded-md">
        <div class="px-4 py-1 flex bg-gray-700">
            <h3 class="my-auto text-lg font-medium leading-6 text-gray-400">Создать пользователя</h3>
            <!-- Выпадающий список с опциями -->
            <div class="ml-auto h-[49.2px] flex my-auto items-center text-gray-400">
                <OptionsDropdown v-if="userStore.role.administrator" @createUser="createUser" @rejectUser="rejectUser"
                    @closeApplication="closeApplication" />
            </div>
        </div>

        <div class="h-[550px] border-t w-full border-gray-700 text-gray-400 overflow-x-hidden overflow-y-auto">
            <!-- class="2xl:w-[517.6px] xl:w-[462.25px]" -->
            <dl class="  max-w-none ">
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium">Имя:</dt>
                    <dd class="text-sm sm:col-span-2 sm:mt-0 break-words px-4">
                        <v-text-field maxlength="64" v-model="userInfoCreate.name" :counter="64" :rules="generalRules"
                            variant="underlined" required></v-text-field>
                    </dd>
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium ">Номер телефона:</dt>
                    <dd class="text-sm  sm:col-span-2 sm:mt-0 break-words px-4">
                        <v-text-field v-model="userInfoCreate.phoneNumber" v-mask="'+# ### ### ## ##'"
                            :rules="phoneNumberRules" variant="underlined" required></v-text-field>
                    </dd>
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium ">Сфера поиска работы:</dt>
                    <dd class="text-sm sm:col-span-2 sm:mt-0 break-words px-4">
                        <!-- Выпадающий список с сферами работы -->
                        <AreasWorkDropdown @addJobSearchAreas="addJobSearchAreas"
                            :sendIncomingAreasOfWorkId="sendIncomingAreasOfWorkId" />
                    </dd>
                </div>
                <!-- Файл или ссылку -->
                <div>
                    <SummaryLinkOrFile :sendIncomingSummaryLinkOrFile="sendIncomingSummaryLinkOrFile"
                        :sendIncomingBooleanLF="sendIncomingBooleanLF" />
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium ">Работает сейчас:</dt>
                    <dd class="text-sm sm:col-span-2 sm:mt-0 break-words px-4">
                        <!-- Выпадающий список с выбором - да/нет -->
                        <WorkNowDropdown @addWorkNow="addWorkNow" />
                    </dd>
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium">
                        <div>
                            Последние работы:
                        </div>
                        <div class="mt-5 mb-5">
                            <!-- Форма добавления данных пользователя -->
                            <AddPastWork @addPastWorkData="addPastWorkData" class=" mx-auto" />
                        </div>
                    </dt>
                    <dd class="text-sm sm:col-span-2 sm:mt-0">
                        <div class="rounded-md overflow-hidden border border-gray-700">
                            <div
                                class="pr-4 bg-gray-700 text-center flex flex-row rounded-md overflow-hidden border-b border-gray-700">
                                <div class="m-auto flex-1 p-1">
                                    Название компании
                                </div>
                                <div class="m-auto flex-1 p-1">
                                    Сфера
                                </div>
                                <div class="m-auto flex-1 p-1">
                                    Должность
                                </div>
                                <div class="m-auto flex-1 p-1">
                                    Начало
                                    <br>
                                    Конец
                                </div>
                            </div>
                            <div class="text-center overflow-y-auto p-2 pb-0 h-32 w-full">
                                <!-- Список добавленых прошлых работ -->
                                <PastWorks @remove="removePastWork" @changePastWork="changePastWork"
                                    :pastWorkArray="pastWorkArray" />
                            </div>
                        </div>
                    </dd>
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium ">Уровень образования:</dt>
                    <dd class="text-sm  sm:col-span-2 sm:mt-0 break-words px-4">
                        <!-- Выпадающий список с выбором уровнем образования -->
                        <LevelEducation @addLevelEducation="addLevelEducation" />
                    </dd>
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium">
                        <div>
                            Владеемые языки:
                        </div>
                        <div class="mt-5 mb-5">
                            <!-- Форма добавления языков -->
                            <AddSpokenLanguage @addSpokenLanguage="addSpokenLanguage" class=" mx-auto" />
                        </div>
                    </dt>
                    <dd class="text-sm  sm:col-span-2 sm:mt-0">
                        <div class="rounded-md overflow-hidden border border-gray-700">
                            <div
                                class="pr-4 bg-gray-700 text-center flex flex-row rounded-md overflow-hidden border-b border-gray-700">
                                <div class="m-auto flex-1 p-1">
                                    Язык
                                </div>
                                <div class="m-auto flex-1 p-1">
                                    Уровень владени
                                    <br>
                                    от 0 до 10
                                </div>
                            </div>
                            <div class="text-center overflow-y-auto p-2 pb-0 h-32 w-full">
                                <!-- Список добавленых языков -->
                                <SpokenLanguages @remove="removeSpokenLanguage" @changeSpokenLanguage="changeSpokenLanguage"
                                    :spokenLanguageArray="spokenLanguageArray" />
                            </div>
                        </div>
                    </dd>
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium">
                        <div>
                            Владеемые навыки:
                        </div>
                        <div class="mt-5 mb-5">
                            <!-- Форма добавления навыков -->
                            <AddOwnedSkill :jobSearchAreas="userInfoCreate.jobSearchAreas" @addOwnedSkill="addOwnedSkill"
                                class=" mx-auto" />
                        </div>
                    </dt>
                    <dd class="text-sm sm:col-span-2 sm:mt-0">
                        <div class="rounded-md overflow-hidden border border-gray-700">
                            <div
                                class="pr-4 bg-gray-700 text-center flex flex-row rounded-md overflow-hidden border-b border-gray-700">
                                <div class="m-auto flex-1 p-1">
                                    Навык
                                </div>
                                <div class="m-auto flex-1 p-1">
                                    Уровень владения
                                    <br>
                                    от 0 до 10
                                </div>
                            </div>
                            <div class="text-center overflow-y-auto p-2 pb-0 h-32 w-full">
                                <!-- Список добавленых навыков -->
                                <OwnedSkills @remove="removeOwnedSkill" @changeOwnedSkill="changeOwnedSkill"
                                    :ownedSkillArray="ownedSkillArray" :jobSearchAreas="userInfoCreate.jobSearchAreas" />
                            </div>
                        </div>
                    </dd>
                </div>
                <div class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium ">
                        <div>
                            Социальные сети:
                        </div>
                        <div class="mt-5 mb-5">
                            <!-- Форма добавления соц. сетей -->
                            <AddSocialMedia @addSocialMedia="addSocialMedia" class=" mx-auto" />
                        </div>
                    </dt>
                    <dd class="text-sm sm:col-span-2 sm:mt-0">
                        <div class="rounded-md overflow-hidden border border-gray-700">
                            <div
                                class="pr-4 bg-gray-700 text-center flex flex-row rounded-md overflow-hidden border-b border-gray-700">
                                <div class="m-auto flex-1 p-1">
                                    Название
                                    <br>
                                    социальной сети
                                </div>
                                <div class="m-auto flex-1 p-1">
                                    Ссылка
                                </div>
                            </div>
                            <div class="text-center overflow-y-auto p-2 pb-0 h-32 w-full">
                                <!-- Список добавленых соц. сетей -->
                                <SocialsMedia :socialMediaArray="socialMediaArray" @remove="removeSocialMedia"
                                    @changeSocialMedia="changeSocialMedia" />
                            </div>
                        </div>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script setup>
import OptionsDropdown from './OptionsDropdown.vue';

import AreasWorkDropdown from './InputFields/AreasWorkDropdown.vue';
import WorkNowDropdown from './InputFields/WorkNowDropdown.vue'
import SummaryLinkOrFile from './InputFields/SummaryLinkOrFile.vue';
import AddPastWork from './InputFields/AddPastWork.vue';
import LevelEducation from './InputFields/LevelEducation.vue';
import AddSpokenLanguage from './InputFields/AddSpokenLanguage.vue';
import AddOwnedSkill from './InputFields/AddOwnedSkill.vue';
import AddSocialMedia from './InputFields/AddSocialMedia.vue';

import PastWorks from './ShowingFields/PastWorks/PastWorks.vue';
import SpokenLanguages from './ShowingFields/SpokenLanguages/SpokenLanguages.vue';
import OwnedSkills from './ShowingFields/OwnedSkills/OwnedSkills.vue';
import SocialsMedia from './ShowingFields/SocialsMedia/SocialsMedia.vue';

import $api from '@/http';

import { ref, reactive, defineProps, watch, onMounted, defineEmits, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { EventBus } from '@/event-bus';

import { useTableInformationStore } from '@/store/tableInformationStore';
import { useUserStore } from '../../../../store/userStore';

const tableInformationStore = useTableInformationStore()
const userStore = useUserStore()

const emit = defineEmits(['closeApplication'])

// ...

const addJobSearchAreas = (data) => {
    console.log(data)
    userInfoCreate.jobSearchAreas = data
    ownedSkillArray.value = []
    userInfoCreate.ownedSkills = []
}

const addWorkNow = (data) => {
    userInfoCreate.workNow = data
}

const addLevelEducation = (data) => {
    userInfoCreate.eucationLevel = data
}

// -

let pastWorkArray = ref([])

const addPastWorkData = (data) => {
    console.log(data)
    let thisData = { ...data }
    pastWorkArray.value = [...pastWorkArray.value, data]
    thisData.scopeWork = thisData.scopeWork.id
    userInfoCreate.lastJobs = [...userInfoCreate.lastJobs, thisData]
}

const removePastWork = (removeIndex) => {
    let thisRemoveIndex = removeIndex
    userInfoCreate.lastJobs = userInfoCreate.lastJobs.filter((el, index) => { return index !== thisRemoveIndex });
    pastWorkArray.value = pastWorkArray.value.filter((el, index) => { return index !== thisRemoveIndex });
}

const changePastWork = (object) => {
    let thisObjectData = { ...object.data }
    pastWorkArray.value[object.index] = object.data
    thisObjectData.scopeWork = thisObjectData.scopeWork.id
    userInfoCreate.lastJobs[object.index] = thisObjectData
}

// -

let spokenLanguageArray = ref([])

const addSpokenLanguage = (data) => {
    let thisData = { ...data }
    spokenLanguageArray.value = [...spokenLanguageArray.value, data]
    thisData.language = thisData.language.id
    userInfoCreate.spokenLanguages = [...userInfoCreate.spokenLanguages, thisData]
}

const removeSpokenLanguage = (removeIndex) => {
    let thisRemoveIndex = removeIndex
    userInfoCreate.spokenLanguages = userInfoCreate.spokenLanguages.filter((el, index) => { return index !== thisRemoveIndex });
    spokenLanguageArray.value = spokenLanguageArray.value.filter((el, index) => { return index !== thisRemoveIndex });
}

const changeSpokenLanguage = (object) => {
    let thisObjectData = { ...object.data }
    spokenLanguageArray.value[object.index] = object.data
    thisObjectData.language = thisObjectData.language.id
    userInfoCreate.spokenLanguages[object.index] = thisObjectData
}

// -

let ownedSkillArray = ref([])

const addOwnedSkill = (data) => {
    let thisData = { ...data }
    ownedSkillArray.value = [...ownedSkillArray.value, data]
    thisData.skill = thisData.skill.id
    userInfoCreate.ownedSkills = [...userInfoCreate.ownedSkills, thisData]
}

const removeOwnedSkill = (removeIndex) => {
    let thisRemoveIndex = removeIndex
    userInfoCreate.ownedSkills = userInfoCreate.ownedSkills.filter((el, index) => { return index !== thisRemoveIndex });
    ownedSkillArray.value = ownedSkillArray.value.filter((el, index) => { return index !== thisRemoveIndex });
}

const changeOwnedSkill = (object) => {
    let thisObjectData = { ...object.data }
    ownedSkillArray.value[object.index] = object.data
    thisObjectData.skill = thisObjectData.skill.id
    userInfoCreate.ownedSkills[object.index] = thisObjectData
}

// -

let socialMediaArray = ref([])

const addSocialMedia = (data) => {
    let thisData = { ...data }
    socialMediaArray.value = [...socialMediaArray.value, data]
    thisData.socialMediaName = thisData.socialMediaName.id
    userInfoCreate.socialMedia = [...userInfoCreate.socialMedia, thisData]
}

const removeSocialMedia = (removeIndex) => {
    let thisRemoveIndex = removeIndex
    userInfoCreate.socialMedia = userInfoCreate.socialMedia.filter((el, index) => { return index !== thisRemoveIndex });
    socialMediaArray.value = socialMediaArray.value.filter((el, index) => { return index !== thisRemoveIndex });
}

const changeSocialMedia = (object) => {
    let thisObjectData = { ...object.data }
    socialMediaArray.value[object.index] = object.data
    thisObjectData.socialMediaName = thisObjectData.socialMediaName.id
    userInfoCreate.socialMedia[object.index] = thisObjectData
}

// -

// Информация о создаваемом пользователе
const userInfoCreate = reactive({
    name: '',
    phoneNumber: '',
    // Number(number.substring(1, number.length).split(' ').join(''))
    jobSearchAreas: null,
    workNow: null,
    lastJobs: [],
    eucationLevel: null,
    spokenLanguages: [],
    ownedSkills: [],
    socialMedia: [],
})

// -

const createUser = async () => {
    console.log('Создать пользователя')
    console.log(userInfoCreate)
    const data = {
        telegramId: postTelegramId.value,
        name: userInfoCreate.name,
        phoneNumber: Number(userInfoCreate.phoneNumber.substring(1, userInfoCreate.phoneNumber.length).split(' ').join('')),
        jobSearchAreas: userInfoCreate.jobSearchAreas,
        workNow: userInfoCreate.workNow,
        lastJobs: userInfoCreate.lastJobs,
        eucationLevel: userInfoCreate.eucationLevel,
        spokenLanguages: userInfoCreate.spokenLanguages,
        ownedSkills: userInfoCreate.ownedSkills,
        socialMedia: userInfoCreate.socialMedia,
    }
    const messageError = validation(data)
    if (messageError !== true) {
        message.value = messageError
        dialog.value = true
    } else {
        console.log('Валидно')
        // отправляем на сервер и убираем форму
        const postUserInfo = await $api.post('/client/fill-user-information-from-resume', { data })
        console.log(postUserInfo)
        const responseToApplicantsTelegram = await $api.post(`/client/response-to-applicants-telegram/${'approvetordeviation'}`, {
            data: {
                telegramId: postTelegramId.value,
            }
        })
        tableInformationStore.pastTelegramId = null
        emit('closeApplication')
    }
}

const validation = (data) => {
    console.log(data)
    if (data.name.length == 0) return 'Укажите имя пользователя'
    if (String(data.phoneNumber).length !== 11) return 'Укажите номер корректно'
    if (data.jobSearchAreas == null) return 'Укажите сферу поиска работы'
    if (data.workNow == null) return 'Укажите поле "Работает сейчас"'
    if (data.lastJobs.length == 0) return 'Укажите минимум одну прошлую работу'
    if (data.eucationLevel == null) return 'Укажите уровень образования'
    if (data.ownedSkills.length == 0 && useTableInformationStore().lengthItemsSkillsForValidation != 0) return 'Укажите минимум один навык'
    return true
}

const rejectUser = async (comment) => {
    console.log('Отклонить заявку')
    const responseToApplicantsTelegram = await $api.post(`/client/response-to-applicants-telegram/${'approvetordeviation'}`, {
        data: {
            telegramId: postTelegramId.value,
            comment: comment,
        }
    })
    tableInformationStore.pastTelegramId = null
    emit('closeApplication')
}

const closeApplication = async () => {
    const responseToApplicantsTelegram = await $api.post(`/client/response-to-applicants-telegram/${'openroclose'}`, {
        data: {
            telegramId: postTelegramId.value,
            status: false
        }
    })
    tableInformationStore.pastTelegramId = null
    emit('closeApplication')
}

// -

const dialog = ref(false)
const message = ref('')

// -

const postTelegramId = ref(null)

const conslusion = ref(null)

const sendIncomingAreasOfWorkId = ref(null)
const sendIncomingSummaryLinkOrFile = ref(null)
const sendIncomingBooleanLF = ref(null)


const handleData = async (state) => {
    if (state != null) {
        postTelegramId.value = state
        if (tableInformationStore.pastTelegramId != null) {
            const responseToApplicantsTelegram = await $api.post(`/client/response-to-applicants-telegram/${'openroclose'}`, {
                data: {
                    telegramId: tableInformationStore.pastTelegramId,
                    status: false
                }
            })
        }
        tableInformationStore.pastTelegramId = state

        const applicationForVerificationInfoUser = await $api.get(`/client/application-for-verification-info-user/${state}`)
        console.log(applicationForVerificationInfoUser.data)
        conslusion.value = applicationForVerificationInfoUser.data.applicationForVerification.status
        if (!conslusion.value) {
            // -
            userInfoCreate.name = applicationForVerificationInfoUser.data.name
            userInfoCreate.phoneNumber = applicationForVerificationInfoUser.data.phoneNumber
            sendIncomingAreasOfWorkId.value = applicationForVerificationInfoUser.data.areasOfWork.id
            if (applicationForVerificationInfoUser.data.summaryLink == null) {
                sendIncomingSummaryLinkOrFile.value = applicationForVerificationInfoUser.data.fileSummaryName
                sendIncomingBooleanLF.value = false
            } else {
                sendIncomingSummaryLinkOrFile.value = applicationForVerificationInfoUser.data.summaryLink
                sendIncomingBooleanLF.value = true
            }
            const responseToApplicantsTelegram = await $api.post(`/client/response-to-applicants-telegram/${'openroclose'}`, {
                data: {
                    telegramId: state,
                    status: true
                }
            })
        }
    }
}

const updateApplicationForVerificationInfoUser = async () => {
    try {
        const applicationForVerificationInfoUser = await $api.get(`/client/update-application-for-verification-info-user`)
        console.log(applicationForVerificationInfoUser.data)
        if (postTelegramId.value == applicationForVerificationInfoUser.data.telegramId) {
            userInfoCreate.name = applicationForVerificationInfoUser.data.name
            userInfoCreate.phoneNumber = applicationForVerificationInfoUser.data.phoneNumber
            sendIncomingAreasOfWorkId.value = applicationForVerificationInfoUser.data.areasOfWorkId
            if (applicationForVerificationInfoUser.data.summaryLink == null) {
                sendIncomingSummaryLinkOrFile.value = applicationForVerificationInfoUser.data.fileSummaryName
                sendIncomingBooleanLF.value = false
            } else {
                sendIncomingSummaryLinkOrFile.value = applicationForVerificationInfoUser.data.summaryLink
                sendIncomingBooleanLF.value = true
            }
        }
        await updateApplicationForVerificationInfoUser()
    } catch (e) {
        console.log(e)
        setTimeout(async () => {
            await updateApplicationForVerificationInfoUser()
        }, 500)
    }
}

onMounted(async () => {
    EventBus.on('data-emitted', handleData);
    await updateApplicationForVerificationInfoUser()
})

// ---

const router = useRouter();

const handleBeforeUnload = async (event) => {
    console.log('Пользователь покидает страницу или обновляет её');
    if (postTelegramId.value != null) {
        const responseToApplicantsTelegram = await $api.post(`/client/response-to-applicants-telegram/${'openroclose'}`, {
            data: {
                telegramId: postTelegramId.value,
                status: false
            }
        })
    }
    tableInformationStore.pastTelegramId = null
    event.preventDefault();
    event.returnValue = ''; // Некоторые браузеры требуют этот код
};

// Подписываемся на событие перед закрытием вкладки/обновлением страницы
window.addEventListener('beforeunload', handleBeforeUnload);

// Отслеживаем изменения маршрута
watch(
    () => router.currentRoute,
    async (to, from) => {
        // Ваш код при переходе на другую страницу
        console.log('Пользователь покидает страницу или обновляет её');
        if (postTelegramId.value != null) {
            const responseToApplicantsTelegram = await $api.post(`/client/response-to-applicants-telegram/${'openroclose'}`, {
                data: {
                    telegramId: postTelegramId.value,
                    status: false
                }
            })
        }
        tableInformationStore.pastTelegramId = null
    }
);

// Отписываемся от события при размонтировании компонента
onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
});

// ---

const generalRules = [
    v => !!v || 'Обязательное поле'
]

const phoneNumberRules = [
    v => !!v || 'Обязательное поле',
    v => (v.length > 15) || 'Введите номер полностью',
]

</script>