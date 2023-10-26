<template>
    <div v-show="!sendIncomingBooleanLF"
        class="border-b border-gray-700 bg-gray-800  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium">
            Резюме файл:
        </dt>
        <dd class="text-sm pr-5 sm:col-span-2 sm:mt-0 py-4">
            {{ sendIncomingSummaryLinkOrFile }}

        </dd>
    </div>
    <div v-show="sendIncomingBooleanLF"
        class="border-b border-gray-700 bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium">
            Ссылка на резюме:
        </dt>
        <dd class="mt-0 text-sm sm:col-span-2 sm:mt-0 break-words px-4 py-4">
            <div class="">
                {{ sendIncomingSummaryLinkOrFile }}
            </div>
        </dd>
    </div>
</template>

<script setup>

import { defineProps } from 'vue';

// ---

const props = defineProps({
    sendIncomingSummaryLinkOrFile: {
        type: String,
        required: true
    },
    sendIncomingBooleanLF: {
        type: Boolean,
        required: true,
    }
})

</script>
