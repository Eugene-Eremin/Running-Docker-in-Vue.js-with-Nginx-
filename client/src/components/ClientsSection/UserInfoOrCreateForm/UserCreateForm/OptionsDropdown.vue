<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="transition ease-in-out duration-350 inline-flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-opacity-50 active:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <div class="mr-1">Действия</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                </svg>
            </MenuButton>
        </div>

        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button @click="createUser" :class="[
                        active ? 'transition ease-in-out duration-350 bg-green-700 text-gray-900' : 'text-gray-400',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                                clip-rule="evenodd" />
                        </svg>
                        <div class="ml-2">Создать</div>
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button @click="dialog = true" :class="[
                        active ? 'transition ease-in-out duration-350 bg-red-700 text-gray-900' : 'text-gray-400',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                clip-rule="evenodd" />
                        </svg>
                        <div class="ml-2">Отклонить</div>
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button @click="closeApplication" :class="[
                        active ? 'transition ease-in-out duration-350 bg-gray-700 text-gray-900' : 'text-gray-400',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                clip-rule="evenodd" />
                        </svg>
                        <div class="ml-2">Закрыть</div>
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
    <div>
        <v-dialog v-model="dialog" persistent width="600">
            <v-card>
                <v-card-title>
                    <div class="mt-2">
                        <span class="text-h5">Причина отказа</span>
                    </div>
                </v-card-title>
                <div class="p-2">
                    <v-card-text>
                        <v-form ref="form" @submit.prevent>
                            <v-text-field v-model="comment" :rules="[v => !!v || 'Обязательное поле']" label="Комментарий"
                                required variant="underlined"></v-text-field>
                            <v-btn type="submit" block color="blue-grey-darken-2" class="mt-4" @click="closeCard(false)">
                                Назад
                            </v-btn>
                            <v-btn type="submit" block color="green-darken-4" class="mt-4" @click="rejectUser">
                                Добавить
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const emit = defineEmits(['createUser', 'rejectUser', 'closeApplication'])

const createUser = () => {
    emit('createUser')
}

//-

const rejectUser = async () => {
    const bool = await validate()
    if (bool !== false) emit('rejectUser', bool)
}

//-

const closeApplication = () => {
    emit('closeApplication')
}

const closeCard = (boolean) => {
    if (boolean) {
        // rejectUser()
    }

    dialog.value = false
    comment.value = ''
}
const validate = async () => {
    let valid = true
    let pass = comment.value
    if (comment.value.length == 0) valid = false
    if (valid) {
        closeCard(true)
        return pass
    }
    return false
}
const dialog = ref(false)
const comment = ref('')

</script>
