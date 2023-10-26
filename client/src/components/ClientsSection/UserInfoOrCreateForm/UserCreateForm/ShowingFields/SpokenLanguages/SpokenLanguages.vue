<template>
    <div>
        <SpokenLanguagesItem v-for="spokenLanguage, index in props.spokenLanguageArray" @remove="emitGo"
            @changeSpokenLanguage="emitGoSecond" :spokenLanguage="spokenLanguage" :index="index" :key="index" />
    </div>
</template>

<script setup>
import SpokenLanguagesItem from './SpokenLanguagesItem.vue';

const props = defineProps({
    spokenLanguageArray: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['remove', 'changeSpokenLanguage'])
const emitGo = (index) => {
    emit('remove', index)
}
const emitGoSecond = (object) => {
    emit('changeSpokenLanguage', object)
}

</script>