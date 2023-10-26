<template>
    <div class="w-2/3 mx-auto mt-28 text-gray-600">
        На вашу электронную почту ({{ userStore.email }}) отправлено письмо подтверждения.<br>
        Пожалуйста проверьте вашу электронную почту, перейдите по ссылке и ваш профиль будет подтвержден
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue';

import { useUserStore } from '@/store/userStore';
import { useNavbarStore } from '../../store/navbarStore';

const navbarStore = useNavbarStore()
navbarStore.pathNow = useRoute().path

const userStore = useUserStore()

console.log(userStore.email)

document.title = 'Подтверждение электронной почты'

</script>
