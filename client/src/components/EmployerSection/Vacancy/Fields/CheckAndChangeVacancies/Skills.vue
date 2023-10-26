<template>
    <div>
        <div class="mt-2 mb-2 overflow-hidden rounded-md border-2 border-gray-700">
            <div class="h-[200px] overflow-x-hidden overflow-y-auto">
                <div v-for="areaOfWork in selectAreasOfWork" :key="areaOfWork.id">
                    <div class="mt-2 ml-4">{{ areaOfWork.name }}</div>
                    <div class="ml-2">
                        <ItemsSkills :changeOrOpenHere="changeOrOpenHere" :areaOfWork="areaOfWork"
                            :itemsSkillsProp="itemsSkillsProp" @goEmit="goEmit" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $api from '@/http/index'

import ItemsSkills from './ItemsSkills.vue'

export default {
    components: {
        ItemsSkills
    },
    props: {
        selectAreasOfWork: {
            type: Array,
            required: true
        },
        itemsSkillsProp: {
            tyep: Array,
            required: true
        },
        changeOrOpenHere: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        goEmit(skill) {
            this.$emit('goEmit', skill)
        }
    }
}
</script>

<style scoped></style>