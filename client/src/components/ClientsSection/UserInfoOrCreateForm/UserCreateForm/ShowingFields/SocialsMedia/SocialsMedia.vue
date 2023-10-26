<template>
    <SocialsMediaItem v-for="socialMedia, index in props.socialMediaArray" :key="index" @remove="emitGo"
        @changeSocialMedia="emitGoSecond" :socialMedia="socialMedia" :index="index" />
</template>

<script setup>
import SocialsMediaItem from './SocialsMediaItem.vue';

const props = defineProps({
    socialMediaArray: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['remove', 'changeSocialMedia'])
const emitGo = (index) => {
    emit('remove', index)
}
const emitGoSecond = (object) => {
    emit('changeSocialMedia', object)
}

</script>