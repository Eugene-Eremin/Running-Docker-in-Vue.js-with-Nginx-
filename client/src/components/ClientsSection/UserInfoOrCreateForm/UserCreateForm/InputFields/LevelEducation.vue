<template>
    <v-autocomplete v-model="select" :rules="rules" :items="items" item-title="name" item-value="id" return-value
        variant="underlined"></v-autocomplete>
</template>

<script>
import $api from '@/http'

export default {
    data() {
        return {
            select: [],
            items: [],

            rules: [
                v => (v.length != 0) || 'Обязательное поле'
            ]
        }
    },
    watch: {
        select() {
            this.$emit('addLevelEducation', this.select)
        }
    },
    async mounted() {
        const { data } = await $api.get('/general-tables/level-of-education')
        console.log(data)
        this.items = data
    },
}
</script>