import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTableInformationStore = defineStore('tableInformationStore', () => {

    const lengthItemsSkillsForValidation = ref(0)
    const pastTelegramId = ref(null)
    const conslusion = ref(null)
    const rm = ref()

    return { lengthItemsSkillsForValidation, pastTelegramId, conslusion }
})