<template>
    <div>
        <PastWorksItem v-for="pastWork, index in props.pastWorkArray" @remove="emitGo" @changePastWork="emitGoSecond" :pastWork="pastWork" :index="index"
            :key="index" />
    </div>
</template>

<script setup>
import PastWorksItem from './PastWorksItem.vue';

const props = defineProps({
    pastWorkArray: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['remove', 'changePastWork'])
const emitGo = (index) => {
    emit('remove', index)
}
const emitGoSecond = (object) => {
    emit('changePastWork', object)
}

</script>
