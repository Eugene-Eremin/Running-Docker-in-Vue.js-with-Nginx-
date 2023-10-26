import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbarStore', () => {

    const pathNow = ref('')

    return { pathNow }
})