<template>
    <div class="overflow-y-scroll md:w-auto 1.8xl:h-[545px] h-[488px] bg-gray-800">
        <table class="w-full text-center text-sm text-gray-400">
            <thead class="text-xs uppercase bg-gray-700">
                <tr>
                    <th class="px-6 py-3">
                        Статус
                    </th>
                    <th class="px-6 py-3">
                        Номер телефона
                    </th>
                    <th class="px-6 py-3">
                        Имя
                    </th>
                    <th class="px-6 py-3">
                        Сфера
                    </th>
                    <th class="px-6 py-3">
                        Резюме
                    </th>
                </tr>
            </thead>

            <tbody class="mt-10">
                <ItemUser v-for="applicationForVerification in applicationsForVerificationArr"
                    :applicationForVerification="applicationForVerification" @openApplication="openApplication" />
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useUserStore } from '../../../store/userStore';

import { onMounted, ref, defineEmits } from 'vue';

import ItemUser from './ItemUser.vue';

import $api from '@/http';

const userStore = useUserStore()

const applicationsForVerificationArr = ref([])

const getApplicationsForVerification = async () => {
    const applicationsForVerification = await $api.get('/client/applications-for-verification')
    applicationsForVerificationArr.value = applicationsForVerification.data
    console.log(applicationsForVerificationArr.value)
}


const newApplicationForVerification = async () => {
    try {
        const applicationsForVerification = await $api.get('/client/new-application-for-verification')
        applicationsForVerificationArr.value = applicationsForVerification.data
        console.log(applicationsForVerificationArr.value)
        await newApplicationForVerification()
    } catch (e) {
        console.log(e)
        setTimeout(async () => {
            await newApplicationForVerification()
        }, 500)
    }
}

const emit = defineEmits(['openApplication'])
const openApplication = (id) => {
    emit('openApplication', id)
}

onMounted(async () => {
    await getApplicationsForVerification()
    await newApplicationForVerification()
})

</script>
