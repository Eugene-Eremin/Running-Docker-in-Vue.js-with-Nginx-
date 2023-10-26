<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <v-alert title="Ошибка!" type="error">Код неверный</v-alert>
            </v-card>
        </v-dialog>
    </div>
    <div>
        <v-sheet class="pa-12" rounded>
            <v-card class="mx-auto px-6 py-8 pb-6" max-width="400">
                <v-form ref="form">
                    <div class="text-gray-600">
                        На указанный номер ({{ userStore.phoneNumber }}) был отправлен смс-код подтверждение. Пожалуйста
                        укажите код из смс, и ваш профиль будет подтвержден
                    </div>
                    <br>
                    <v-text-field v-model="smsCode" :readonly="loading"
                        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" label="Смс-код"
                        @click:append-inner="show1 = !show1" clearable></v-text-field>
                    <br>
                    <v-btn :loading="loading" @click="validate" block color="success" size="large" variant="elevated">
                        Подтвердить
                    </v-btn>
                </v-form>
            </v-card>
        </v-sheet>
    </div>
</template>

<script>
import router from '@/router';

import { useRoute } from 'vue-router'

import { useUserStore } from '@/store/userStore';
import { useNavbarStore } from '../../store/navbarStore';

export default {
    data() {
        return {
            form: false,
            smsCode: null,
            loading: false,
            show1: false,
            dialog: false,
            rules: {
                required: value => !!value || 'Обязательное поле'
            },
        }
    },
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (!valid) return

            this.loading = true

            const userStore = useUserStore()

            const data = {
                phoneNumber: userStore.phoneNumber,
                smsCode: this.smsCode
            }

            console.log('Подтвердить')
            console.log(data)

            // Отправить смс-код и номер телефона, 
            // чтобы сверить введенный код и код в БД

            if (true) {
                // Если все ок, то выдать токены и др. инфо.
                // Впустить
            } else {
                this.dialog = true
                this.loading = false
                // выдать ошибку
            }
        }
    },
    setup() {
        const navbarStore = useNavbarStore()
        navbarStore.pathNow = useRoute().path

        const userStore = useUserStore()

        document.title = 'Подтверждение номера телефона'

        return { navbarStore, userStore }
    }
}
</script>

