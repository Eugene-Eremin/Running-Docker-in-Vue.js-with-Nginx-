<template>
    <div v-if="!selectedGroup">
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
                        :type="show1 ? 'text' : 'password'" label="Пароль" @click:append-inner="show1 = !show1"
                        clearable></v-text-field>
                    <v-text-field v-model="repeatPpassword" :rules="[rules.required, rules.coincidence]"
                        :type="show1 ? 'text' : 'password'" label="Повторить пароль" clearable></v-text-field>
                    <br>
                    <v-btn :loading="loading" block color="success" size="large" @click="validate" variant="elevated">
                        Регестрироваться
                    </v-btn>
                    <div class="text-center mt-2">
                        <RouterLink to="/login">
                            <v-btn color="light-blue-darken-4" variant="plain">
                                Войти
                            </v-btn>
                        </RouterLink>
                    </div>
                </v-form>
            </v-card>
        </v-sheet>
    </div>
    <div v-else>
        Выберите группу
    </div>
</template>
                    
<script>
import router from '@/router';

import { ref } from 'vue';
import { useRoute } from 'vue-router'

import UserService from '../../services/AuthService';

import { useNavbarStore } from '../../store/navbarStore';
import { useUserStore } from '@/store/userStore';

export default {
    data() {
        return {
            form: false,
            email: null,
            phoneNumber: null,
            password: null,
            repeatPpassword: null,
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
                coincidence: v => v == this.password || 'Пароли не совпадают',
                number: v => (v.length > 15) || 'Введите номер полностью',
            },
        }
    },
    methods: {
        async registration(data) {
            const userStore = useUserStore()
            await userStore.registration(data.login, data.password)
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

            console.log('Регестрация')
            console.log(data)
            // ...
            // Отсылаются данные, приходит код активации
            // или письмо на почту и далее, в зависимости
            // от того, через что пользователь регестрировался,
            // его перекинет на соответствующую страницу
            // подтверждения своего профиляя
            // ...

            // Инфа записывается в сторедж

            userStore = this.registration(data)

            console.log((await userStore).redirectEmailConfirmation)

            if ((await userStore).redirectEmailConfirmation == true) {
                router.push('/email-confirmation')
                // доделать когда будет подтверждение с ном тел
                // } else if (userStore.redirectConfirmationOfThePhoneNumber == true) {
                //      router.push('/confirmation-of-the-phone-number')
            } else {
                router.push('/vacancies')
            }

            // if (!userStore.role.administrator && !userStore.role.applicant && !userStore.role.employer) {
            //     selectedGroup.value = !selectedGroup.value
            // }

            // !this.show2 && !this.loading ? router.push('/email-confirmation') : router.push('/confirmation-of-the-phone-number')

            this.loading = false
        },
    },
    setup() {
        const navbarStore = useNavbarStore()
        navbarStore.pathNow = useRoute().path

        document.title = 'Регестрация'

        return { navbarStore }
    }
}
</script>
