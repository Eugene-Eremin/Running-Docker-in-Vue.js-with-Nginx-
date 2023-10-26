<template>
    <v-autocomplete v-model="select" :rules="rules" :items="items" item-title="name" item-value="id" return-value
        variant="underlined"></v-autocomplete>
</template>

<script>
import $api from '@/http'

export default {
    props: {
        sendIncomingAreasOfWorkId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            select: null,
            items: [],

            rules: [
                v => (v.length != 0) || 'Обязательное поле'
            ]
        }
    },
    async mounted() {
        const { data } = await $api.get('/general-tables/areas-of-work')
        console.log(data)
        this.items = data
    },
    watch: {
        select() {
            this.$emit('addJobSearchAreas', this.select)
        },
        sendIncomingAreasOfWorkId() {
            this.select = this.sendIncomingAreasOfWorkId
        }
    }
}
</script>