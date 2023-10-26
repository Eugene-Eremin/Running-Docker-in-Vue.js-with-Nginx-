import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import AuthService from '@/services/AuthService'

import { API_URL } from '@/http/index'

import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {

    const user = ref({})

    const authorized = ref(null)

    const isLoading = ref(null)

    const id = ref(null)

    const email = ref(null)
    const phoneNumber = ref(null)

    const isEmailActivated = ref(null)
    const isPhoneNumberActivated = ref(null)

    const role = ref({
        administrator: false,
        applicant: false,
        employer: false,
    })

    const redirectEmailConfirmation = ref(false)
    const redirectConfirmationOfThePhoneNumber = ref(false)

    const setAuth = (bool) => {
        authorized.value = bool
    }

    const setUser = (thisUser) => {
        user.value = thisUser

        id.value = thisUser.id
        email.value = thisUser?.email
        phoneNumber.value = thisUser?.phoneNumber
        isEmailActivated.value = thisUser?.isEmailActivated
        isPhoneNumberActivated.value = thisUser?.isPhoneNumberActivated

        thisUser?.groups.forEach(el => {
            if (el == 1) role.value.administrator = true
            if (el == 2) role.value.applicant = true
            if (el == 3) role.value.employer = true
        })
    }

    const login = async (emailOut, password) => {
        try {
            redirectEmailConfirmation.value = false
            // поток когда будет реализ redirectConfirmationOfThePhoneNumber.value = false

            const response = await AuthService.login(emailOut, password)
            console.log(response)

            let counter = 0
            response.data.user.groups.forEach(el => {
                counter++
            })

            console.log('У этого пользователя не активирована электронная почта')
            email.value = emailOut
            redirectEmailConfirmation.value = true
            // тут еще добавить проверку на активацию номера телефона если по
            // нему регестрировались, но это потом
            // } else if (response.data.user.isPhoneNumberActivated == false) {
            localStorage.setItem('token', response.data.accessToken)
            setAuth(true)
            setUser(response.data.user)

        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    const registration = async (emailOut, password) => {
        try {
            redirectEmailConfirmation.value = false
            // поток когда будет реализ redirectConfirmationOfThePhoneNumber.value = false

            const response = await AuthService.registration(emailOut, password)
            console.log(response)

            let counter = 0
            response.data.user.groups.forEach(el => {
                counter++
            })

            console.log('У этого пользователя не активирована электронная почта')
            email.value = emailOut
            redirectEmailConfirmation.value = true
            // тут еще добавить проверку на активацию номера телефона если по
            // нему регестрировались, но это потом
            // } else if (response.data.user.isPhoneNumberActivated == false) {
            localStorage.setItem('token', response.data.accessToken)
            setAuth(true)
            setUser(response.data.user)

        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    const logout = async () => {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            setAuth(false)
            setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    const checkAuth = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {
                withCredentials: true
            })
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            setAuth(true)
            setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const setLoading = (bool) => {
        isLoading.value = bool
    }

    const getIsEmailActivated = computed(() => {
        return isEmailActivated.value
    })

    return {
        user,
        authorized,
        isLoading,
        email,
        phoneNumber,
        isEmailActivated,
        isPhoneNumberActivated,
        role,
        redirectEmailConfirmation,
        redirectConfirmationOfThePhoneNumber,
        setAuth,
        setUser,
        login,
        registration,
        logout,
        checkAuth,
        getIsEmailActivated
    }
})