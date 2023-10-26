<template>
    <div>
        <v-checkbox v-model="checkbox" @click="change" :label="skill.name"></v-checkbox>
    </div>
</template>

<script>
export default {
    props: {
        skill: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            checkbox: false
        }
    },
    methods: {
        change() {
            this.skill.checkbox = !this.checkbox
            this.$emit('goEmit', this.skill)
        }
    },
    mounted() {
        console.log(this.skill)
    }
}
</script>

<style scoped></style>