<template>
    <div>
        <OwnedSkillsItem v-for="ownedSkill, index in props.ownedSkillArray" :key="index" @remove="emitGo"
            @changeOwnedSkill="emitGoSecond" :ownedSkill="ownedSkill" :index="index"
            :jobSearchAreas="props.jobSearchAreas" />
    </div>
</template>

<script setup>
import OwnedSkillsItem from './OwnedSkillsItem.vue';

const props = defineProps({
    jobSearchAreas: {
        type: Number,
        required: true,
    },
    ownedSkillArray: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['remove', 'changeOwnedSkill'])
const emitGo = (index) => {
    emit('remove', index)
}
const emitGoSecond = (object) => {
    emit('changeOwnedSkill', object)
}

</script>