<template>
    <div>
        <div class="flex flex-row">
            <button @click="emitGo"
                class="hover:bg-red-600 active:bg-red-700 transition ease-in-out duration-350 flex flex-row rounded-t-md border-b-0 w-16 overflow-hidden border bg-red-700 border-gray-700">
                <div class="flex-1 text-white">
                    удалить
                </div>
            </button>
            <div class="mt-3 ml-3">
                <EditSocialsMedia :socialMedia="socialMedia" :index="index" @changeSocialMedia="emitGoSecond" />
            </div>
        </div>
        <div class="mb-2 flex flex-row rounded-md rounded-tl-none overflow-hidden border border-gray-700">
            <div class="m-auto flex-1 p-1">
                {{ props.socialMedia.socialMediaName.name }}
            </div>
            <div class="m-auto flex-1 p-1">
                {{ props.socialMedia.link }}
            </div>
        </div>
    </div>
</template>

<script setup>
import EditSocialsMedia from './EditSocialsMedia.vue';

import { ref } from 'vue';

const props = defineProps({
    socialMedia: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['remove', 'changeSocialMedia'])
const emitGo = () => {
    emit('remove', props.index)
}
const emitGoSecond = (data) => {
    emit('changeSocialMedia', { index: props.index, data: data })
}

let change = ref(false)
const changeData = () => {
    change.value = !change.value
}

</script>
