<template>
    <tr :key="applicationForVerification.telegramId"
        class="cursor-pointer transition ease-in-out duration-350 border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
        <td @click="openUser(applicationForVerification.telegramId)" class="px-6 py-3">
            <div v-show="applicationForVerification.infoUsers.status" class="bg-green-900 rounded-md">
                Проверяется
            </div>
            <div v-show="!applicationForVerification.infoUsers.status" class="bg-red-900 rounded-md">
                Не проверяется
            </div>
        </td>
        <td @click="openUser(applicationForVerification.telegramId)" class="px-6 py-3">
            {{ applicationForVerification.infoUsers.phoneNumber }}
        </td>
        <td @click="openUser(applicationForVerification.telegramId)" class="px-6 py-3">
            {{ applicationForVerification.infoUsers.name }}
        </td>
        <td @click="openUser(applicationForVerification.telegramId)" class="px-6 py-3">
            {{ applicationForVerification.infoUsers.areasOfWorkId.name }}
        </td>
        <td class="px-6 py-3">
            <div v-if="applicationForVerification.infoUsers.fileSummaryKey == null">
                <div class="p-2">
                    <a :href="applicationForVerification.infoUsers.summaryLink"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">
                        {{ applicationForVerification.infoUsers.summaryLink }}
                    </a>
                </div>
            </div>
            <div class="flex flex-row" v-else>
                <div class="p-2 pr-0">
                    {{ applicationForVerification.infoUsers.fileSummaryName }}
                </div>
                <svg @click="downloadResume(applicationForVerification.telegramId)" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="currentColor"
                    class="active:bg-gray-800 transition ease-in-out duration-350 w-10 h-10 mx-auto rounded-md p-2 hover:bg-gray-700">
                    <path
                        d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                </svg>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        applicationForVerification: {
            type: Array,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods: {
        openUser(id) {
            console.log('Открыть заявку для пользователя с telegramId - ' + id)
            this.$emit('openApplication', id)
            // ...
        },

        async downloadResume(id) {
            console.log('Скачать резюме с telegramId - ' + id)

            const response = await fetch(`http://localhost:5000/api/client/get-summary-file/${this.applicationForVerification.infoUsers.fileSummaryKey}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const blob = await response.blob()
                const downloadUrl = window.URL.createObjectURL(blob)
                const urlTest = downloadUrl
                console.log(urlTest)
                const link = document.createElement('a')
                console.log(blob)
                link.href = downloadUrl
                link.download = this.applicationForVerification.infoUsers.fileSummaryName
                document.body.append(link)
                link.click()
                link.remove()

            } else {
                console.log('ошибка')
                console.log(response)
            }
            // ...
        },
    }
}
</script>