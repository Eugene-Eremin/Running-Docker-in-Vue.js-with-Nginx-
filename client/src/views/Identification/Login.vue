<template>
    <div>
        <v-sheet class="pa-12" rounded>
            <v-card class="mx-auto px-6 py-8 pb-6" max-width="400">
                <v-form ref="form">
                    <div
                        class="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                        <img class="w-24 h-24 mx-auto max-w-sm hidden lg:block" src="/icon.png" alt="home" />
                    </div>
                    <br>
                    <div class="text-center text-2xl font-bold text-gray-600">
                        HR-Platform
                    </div>
                    <br>
                    <v-text-field v-if="!show2" v-model="email"
                        :append-inner-icon="show2 ? 'mdi-phone-settings' : 'mdi-email'" :readonly="loading"
                        :rules="[rules.required, rules.email]" @click:append-inner="show2 = !show2" class="mb-2" clearable
                        label="Почта"></v-text-field>
                    <v-text-field v-else v-model="phoneNumber" v-mask="'+# ### ### ## ##'"
                        :append-inner-icon="show2 ? 'mdi-phone-settings' : 'mdi-email'" :readonly="loading"
                        :rules="[rules.required, rules.number]" @click:append-inner="show2 = !show2" class="mb-2" clearable
                        label="Номер телефона"></v-text-field>
                    <v-text-field v-model="password" :readonly="loading"
                        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" label="Пароль"
                        @click:append-inner="show1 = !show1" clearable></v-text-field>
                    <br>
                    <v-btn :loading="loading" @click="validate" block color="success" size="large" variant="elevated">
                        Войти
                    </v-btn>
                    <div class="text-center mt-2">
                        <RouterLink to="/registration">
                            <v-btn color="light-blue-darken-4" variant="plain">
                                Регестрироваться
                            </v-btn>
                        </RouterLink>
                    </div>
                </v-form>
            </v-card>
        </v-sheet>
    </div>
</template>

<script>
import router from '@/router';

import { useRoute } from 'vue-router'

import { useNavbarStore } from '../../store/navbarStore';
import { useUserStore } from '@/store/userStore';

export default {
    data() {
        return {
            check: null,
            form: false,
            email: null,
            phoneNumber: null,
            password: null,
            loading: useUserStore().isLoading,
            show1: false,
            show2: false,
            rules: {
                required: value => !!value || 'Обязательное поле',
                min: v => v.length >= 8 || 'Не менее 8 символов',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Невалидный email'
                },
                number: v => (v.length > 15) || 'Введите номер полностью',
            },
        }
    },
    methods: {
        async login(data) {
            const userStore = useUserStore()
            await userStore.login(data.login, data.password)
            return userStore
        },
        async validate() {
            this.loading = true

            const { valid } = await this.$refs.form.validate()

            if (!valid) return

            let userStore = useUserStore()

            let login = null
            if (!this.show2) {
                login = this.email
            } else {
                login = Number(this.phoneNumber.substring(1, this.phoneNumber.length).split(' ').join(''))
            }

            const data = {
                login: login,
                password: this.password
            }

            console.log('Войти')
            console.log(data)

            // ...
            // Отсылаю данные и если они верны, приходит ответ (response)
            // с информацией о том подтвердил ли пользователь
            // свой email или номер телефона или нет.
            // Если все нормально, токены записываются и 
            // переходит на страницу с вакансиями иначе
            // на страницу с подтверждением
            // ...

            // Тут в response я буду выцеплять поля: 
            // isEmailActivated
            // isPhoneNumberActivated
            // и если одно из двух активировано, то пропускать, если нет, то отсылать
            // на страницу подтверждения
            
            // Далее если профиль подтвержден, ищется роль, есть ли у пользователя роли,
            // если нет, то пользователь не входит, а его перекидывает на страницу с выбором роли

            // Инфа записывается в сторедж

            console.log((await userStore).isEmailActivated)


            // const thisUserStore = this.login(data)
            userStore = this.login(data)

            console.log((await userStore).redirectEmailConfirmation)

            if ((await userStore).redirectEmailConfirmation == true) {
                router.push('/email-confirmation')
            // доделать когда будет подтверждение с ном тел
            // } else if (userStore.redirectConfirmationOfThePhoneNumber == true) {
            //      router.push('/confirmation-of-the-phone-number')
            } else {
                router.push('/vacancies')
            }

            // console.log((await thisUserStore).isEmailActivated)

            console.log(userStore.isEmailActivated)
            console.log((await userStore).isEmailActivated)
            
            this.loading = false

        }
    },
    mounted() {
        const userStore = useUserStore()
        console.log(userStore.email)
        if (userStore.email != null) {
            this.email = userStore.email
        }
    },
    computed: {
        getStore() {
            const userStore = useUserStore()

            this.check = userStore.getIsEmailActivated
        }
    },
    setup() {
        const navbarStore = useNavbarStore()
        navbarStore.pathNow = useRoute().path

        document.title = 'Войти'

        const userStore = useUserStore()

        console.log(userStore.getIsEmailActivated)

        return { navbarStore, userStore }
    }
}
</script>
