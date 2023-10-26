<template>
  <div>
    <header class="mb-16" v-if="wait">
      <ChooseNavbar />
    </header>
    <header class="mb-16" v-else>
      <NavbarForUnauthorized />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <!-- ... -->
    </footer>
  </div>
</template>

<script setup>
import ChooseNavbar from './components/Navbar/ChooseNavbar.vue';
import NavbarForUnauthorized from './components/Navbar/NavbarForUnauthorized.vue';

import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router'

import { useUserStore } from './store/userStore'

const userStore = useUserStore()

const wait = ref(false)

onBeforeMount(async () => {
  if (localStorage.getItem('token')) await userStore.checkAuth()
  wait.value = true
})

</script>