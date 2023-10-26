<template>
    <div>
        <div class="mt-2 ml-8 mb-8 text-gray-400" v-if="itemSkills.length == 0">У данной сферы нетнавыков для выбора</div>
        <div v-for="skill in itemSkills" :key="skill.id">
            <ItemSkill :changeOrOpenHere="changeOrOpenHere" :skill="skill" :itemsSkillsProp="itemsSkillsProp"
                @goEmit="goEmit" />
        </div>
    </div>
</template>

<script>
import $api from '@/http';

import ItemSkill from './ItemSkill.vue';

export default {
    components: {
        ItemSkill
    },
    props: {
        areaOfWork: {
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
            itemSkills: []
        }
    },
    methods: {
        goEmit(skill) {
            this.$emit('goEmit', skill)
        }
    },
    async mounted() {
        const data = await $api.get('/general-tables/skills/' + this.areaOfWork.id)
        console.log(data)
        this.itemSkills = data.data
        // let i = 0
        // while (data.data.length > i) {
        //     this.itemSkills.push({
        //         id: data.data[i].id,
        //         areaOfWorkId: data.data[i].areaOfWorkId,
        //         name: data.data[i].name,
        //         checkbox: false
        //     })
        //     ++i
        // }
    }
}
</script>

<style scoped></style>