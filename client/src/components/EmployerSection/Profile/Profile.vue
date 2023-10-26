<template>
    <div class="w-full h-[250px]">
        <img src="../../../../public/background.png" class="w-full h-full rounded-tl-lg rounded-tr-lg">
    </div>
    <div class="flex flex-col items-center -mt-20">
        <img src="../../../../public/standard-avatar.png" class="w-40 border-4 border-white rounded-full">
        <div class="flex items-center space-x-2 mt-2">
            <p class="text-2xl">{{ userStore.email }}</p>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()

</script>