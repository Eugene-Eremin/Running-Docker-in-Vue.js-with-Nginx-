<template>
    <div>
        <v-checkbox v-model="checkbox" :disabled="!changeOrOpenHere" @click="change" :label="skill.name"></v-checkbox>
    </div>
</template>

<script>
export default {
    props: {
        skill: {
            type: Object,
            required: true
        },
        itemsSkillsProp: {
            type: Array,
            required: true
        },
        changeOrOpenHere: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            checkbox: false
        }
    },
    methods: {
        change() {
            this.checkbox = !this.checkbox
        }
    },
    mounted() {
        let i = 0
        while (this.itemsSkillsProp.length > i) {
            if (this.skill.id == this.itemsSkillsProp[i].skillId) {
                this.checkbox = !this.checkbox
                break
            }
            ++i
        }
    },
    watch: {
        checkbox() {
            this.skill.checkbox = this.checkbox
            this.$emit('goEmit', this.skill)
        }
    }
}
</script>

<style scoped></style>