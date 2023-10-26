<template>
    <div class="h-full p-8">
        <div class="bg-white rounded-lg shadow-xl pb-8">
            <!-- Профиль -->
            <Profile />
            <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                <div class="flex items-center space-x-4 mt-2">
                    <!-- Диалоговое окно для создания вакансии -->

                </div>
            </div>
        </div>
    </div>
    <div class="h-full px-8 pb-8">
        <div class="bg-white rounded-lg overflow-hidden shadow-xl">
            <!---->

            <!-- Вакансии пользователя -->
            <div class="h-[500px] overflow-auto">

            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'

import { useNavbarStore } from '../../store/navbarStore';

import Profile from '@/components/EmployerSection/Profile/Profile.vue'

export default {
    components: {
        Profile
    },
    data() {
        return {

        }
    },
    methods: {

    },
    async mounted() {

    },
    watch: {

    },
    setup() {
        const navbarStore = useNavbarStore()
        navbarStore.pathNow = useRoute().path

        document.title = 'Профиль'

        return { navbarStore }
    }
}
</script>

<style scoped></style>