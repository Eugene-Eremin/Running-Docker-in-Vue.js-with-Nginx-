<template>
    <div>
        <div v-if="userStore.authorized">
            <div v-if="userStore.role.administrator">
                <NavbarForAdmin />
            </div>
            <div v-else-if="userStore.role.applicant">
                <NavbarForApplicant />
            </div>
            <div v-else>
                <NavbarForEmployer />
            </div>
        </div>
        <div v-else>
            <NavbarForUnauthorized />
        </div>
    </div>
</template>

<script setup>
import NavbarForAdmin from './NavbarForAdmin.vue';
import NavbarForApplicant from './NavbarForApplicant.vue';
import NavbarForEmployer from './NavbarForEmployer.vue';
import NavbarForUnauthorized from './NavbarForUnauthorized.vue';

import { useUserStore } from '../../store/userStore'

const userStore = useUserStore()

</script>