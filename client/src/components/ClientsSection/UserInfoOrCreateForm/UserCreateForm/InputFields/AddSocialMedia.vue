<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="600">
            <template v-slot:activator="{ props }">
                <button
                    class="flex flex-row items-center text-gray-400 transition ease-in-out duration-350 w-full border text-sm rounded-md p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 hover:bg-gray-600 active:bg-gray-800"
                    v-bind="props">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                    </div>
                    <div class="ml-2">
                        Добавить
                    </div>
                </button>
            </template>
            <v-card>
                <v-card-title>
                    <div class="mt-2">
                        <span class="text-h5">Добавить социальную сеть</span>
                    </div>
                </v-card-title>
                <div class="p-2">
                    <v-card-text>
                        <v-form ref="form" @submit.prevent>
                            <v-autocomplete v-model="socialMediaName" :rules="countRules" :items="items" item-title="name"
                                return-object label="Социальная сеть" variant="underlined" required></v-autocomplete>
                            <v-text-field v-model="link" :rules="countRules" label="Ссылка на профиль" required
                                variant="underlined"></v-text-field>
                            <v-btn type="submit" block color="blue-grey-darken-2" class="mt-4" @click="closeCard(false)">
                                Назад
                            </v-btn>
                            <v-btn type="submit" block color="green-darken-4" class="mt-4" @click="validate">
                                Добавить
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import $api from '@/http'

export default {
    data: () => ({
        dialog: false,
        items: null,

        link: null,
        socialMediaName: null,

        countRules: [
            v => !!v || 'Обязательное поле'
        ]
    }),
    methods: ({
        closeCard(boolean) {
            if (boolean) {
                const data = {
                    link: this.link,
                    socialMediaName: this.socialMediaName
                }
                console.log(data)
                this.$emit("addSocialMedia", data)
            }

            this.dialog = false
            this.link = null
            this.socialMediaName = null
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) this.closeCard(true)
        },
    }),
    async mounted() {
        const { data } = await $api.get('/general-tables/social-medias')
        console.log(data)
        this.items = data
    },
}
</script>