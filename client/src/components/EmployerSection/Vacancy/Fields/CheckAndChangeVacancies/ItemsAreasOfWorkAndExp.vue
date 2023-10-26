<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="auto">
                <v-text-field :disabled="!changeOrOpenHere" v-model="from" type="number" size="x-large" @change="change"
                    :label="areasOfWork.name + ' (от)'" :rules="countRules" variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="auto">
                <v-text-field :disabled="!changeOrOpenHere" v-model="to" type="number" size="x-large" @change="change"
                    :label="areasOfWork.name + ' (до)'" :rules="countRules" variant="underlined"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        areasOfWork: {
            type: Object,
            required: true
        },
        selectAreasOfWork: {
            type: Array,
            required: true
        },
        changeOrOpenHere: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            from: String(this.areasOfWork.experienceFrom),
            to: String(this.areasOfWork.experienceTo),

            countRules: [
                v => !!v || 'Обязательное поле',
                v => (typeof v !== 'number') || 'Неверный тип данных',
                v => (v < 51) || 'Опыт должен быть от 0 до 50',
                v => (v > -1) || 'Опыт должен быть от 0 до 50',
            ],
        }
    },
    methods: {
        change() {
            if (Number(this.from) > Number(this.to) && Number(this.to) != 0) {
                this.from = "0"
            }
            let i = 0
            while (this.selectAreasOfWork.length > i) {
                if (this.selectAreasOfWork[i].id == this.areasOfWork.id) {
                    this.selectAreasOfWork[i].experienceFrom = Number(this.from)
                    this.selectAreasOfWork[i].experienceTo = Number(this.to)
                    this.$emit("goEmit", this.selectAreasOfWork)
                    break
                }
                ++i
            }
            this.$emit("changeAreasOfWorkAndExp", this.selectAreasOfWork)
        }
    },

}
</script>

<style lang="scss" scoped></style>