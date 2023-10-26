<template>
    <v-autocomplete v-model="select" :rules="rules" :items="items" item-title="name" item-value="bool" return-value
        variant="underlined"></v-autocomplete>
</template>

<script>
export default {
    data() {
        return {
            select: null,
            items: [
                { name: 'Нет', bool: false },
                { name: 'Да', bool: true },
            ],

            rules: [
                v => (v.length != 0) || 'Обязательное поле'
            ]
        }
    },
    watch: {
        select() {
            this.$emit('addWorkNow', this.select)
        }
    }
}
</script>