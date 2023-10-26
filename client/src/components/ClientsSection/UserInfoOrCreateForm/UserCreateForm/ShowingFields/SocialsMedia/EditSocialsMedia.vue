<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="600">
            <template v-slot:activator="{ props }">
                <button v-bind="props"
                    class="hover:bg-yellow-600 active:bg-yellow-700 transition ease-in-out duration-350 flex flex-row rounded-t-md border-b-0 w-20 overflow-hidden border bg-yellow-700 border-gray-700">
                    <div class="flex-1 text-white">
                        изменить
                    </div>
                </button>
            </template>
            <div>
                <v-card>
                    <v-card-title>
                        <div class="mt-2">
                            <span class="text-h5">Изменить данные о социальной сети</span>
                        </div>
                    </v-card-title>
                    <div class="p-2">
                        <v-card-text>
                            <v-form ref="form" @submit.prevent>
                                <v-autocomplete v-model="socialMediaName" :rules="countRules" :items="items"
                                    label="Социальная сеть" variant="underlined" item-title="name" return-object
                                    required></v-autocomplete>
                                <v-text-field v-model="link" :rules="countRules" label="Ссылка на профиль" required
                                    variant="underlined"></v-text-field>
                                <v-btn type="submit" block color="blue-grey-darken-2" class="mt-4"
                                    @click="closeCard(false)">
                                    Назад
                                </v-btn>
                                <v-btn type="submit" block color="amber-accent-4" class="mt-4 text-white" @click="validate">
                                    Изменить
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </div>
                </v-card>
            </div>
        </v-dialog>
    </v-row>
</template>

<script>
import $api from '@/http'

export default {
    props: {
        socialMedia: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
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
                this.$emit("changeSocialMedia", data)
            }

            this.dialog = false
            this.link = this.origin.link
            this.socialMediaName = this.origin.socialMediaName
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) this.closeCard(true)
        },
        setData() {
            console.log(this.socialMedia)

            this.origin = {
                link: this.socialMedia.link,
                socialMediaName: this.socialMedia.socialMediaName,
            }

            this.link = this.socialMedia.link
            this.socialMediaName = this.socialMedia.socialMediaName
        }
    }),
    watch: {
        pastWork() {
            this.setData()
        }
    },
    async mounted() {
        this.setData()

        const { data } = await $api.get('/general-tables/social-medias')
        console.log(data)
        this.items = data
    },
}
</script>
