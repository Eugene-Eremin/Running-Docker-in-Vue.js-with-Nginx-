<template>
    <div>Сферы работы<span class="text-red">*</span></div>
    <v-autocomplete v-model="selectAreasOfWork" :rules="countRulesForArrays"
        :items="itemsAreasOfWork" variant="underlined" item-title="name" item-value="id" return-object
        multiple></v-autocomplete>

    <div>Опыт в выбранных сферах (в годах)<span class="text-red">*</span></div>
    <div class="mt-2 mb-2 overflow-hidden rounded-md border-2 border-gray-700">
        <div class="h-[200px] overflow-x-hidden overflow-y-auto">
            <div v-for="areasOfWork in selectAreasOfWork" :key="areasOfWork.id">
                <ItemsAreasOfWorkAndExp @changeAreasOfWorkAndExp="changeAreasOfWorkAndExp" :areasOfWork="areasOfWork"
                    :selectAreasOfWork="selectAreasOfWork" />
            </div>
        </div>
    </div>

    <div>Навыки (минимум один для одной выбранной сферы работы)<span class="text-red">*</span></div>
    <div v-if="val" class="text-red-800 text-xs">Выберите минимум один навык</div>
    <Skills :selectAreasOfWork="selectAreasOfWork" @goEmit="goEmit" />
</template>

<script>
import $api from '@/http/index'

import ItemsAreasOfWorkAndExp from './ItemsAreasOfWorkAndExp.vue'
import Skills from './Skills.vue'

export default {
    components: {
        ItemsAreasOfWorkAndExp,
        Skills
    },
    props: {
        val: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            selectAreasOfWork: [],
            itemsAreasOfWork: [],

            countRulesForArrays: [
                v => (v.length != 0) || 'Обязательное поле',
                v => (v.length < 5) || 'Не больше 4 сфер работ',
            ],
        }
    },
    methods: {
        changeAreasOfWorkAndExp(data) {
            this.selectAreasOfWork = data
            console.log(this.selectAreasOfWork)
        },
        goEmit(skill) {
            this.$emit('addSkills', skill)
        }
    },
    async mounted() {
        const data = await $api.get('/general-tables/areas-of-work')
        console.log(data.data)

        let i = 0
        while (data.data.length > i) {
            this.itemsAreasOfWork.push(
                {
                    id: data.data[i].id,
                    name: data.data[i].name,
                    experienceFrom: 0,
                    experienceTo: 0,
                }
            )
            ++i
        }
    },
    watch: {
        selectAreasOfWork() {

            this.$emit("addArOfWrAndExperience", this.selectAreasOfWork)
        }
    }
}

</script>

<style scoped></style>