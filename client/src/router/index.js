// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

import Login from '../views/Identification/Login.vue'
import Registration from '../views/Identification/Registration.vue'

import ConfirmationOfThePhoneNumber from '../views/Identification/ConfirmationOfThePhoneNumber.vue'
import EmailConfirmation from '../views/Identification/EmailConfirmation.vue'

import Clients from '../views/Clients.vue'
import Vacancies from '../views/Vacancies.vue'
import Selections from '../views/Selections.vue'
import TableEditing from '../views/TableEditing.vue'

import Admin from '../views/ProfileView/Admin.vue'
import Applicant from '../views/ProfileView/Applicant.vue'
import Employer from '../views/ProfileView/Employer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { auth: false }
    },
    // -
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      meta: { auth: false }
    },
    // -
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { auth: true }
    },
    {
      path: '/applicant',
      name: 'Applicant',
      component: Applicant,
      meta: { auth: true }
    },
    {
      path: '/employer',
      name: 'Employer',
      component: Employer,
      meta: { auth: true }
    },
    // -
    {
      path: '/confirmation-of-the-phone-number',
      name: 'ConfirmationOfThePhoneNumber',
      component: ConfirmationOfThePhoneNumber,
      meta: { auth: false }
    },
    {
      path: '/email-confirmation',
      name: 'EmailConfirmation',
      component: EmailConfirmation,
      meta: { auth: false }
    },
    // -
    {
      path: '/clients',
      name: 'Clients',
      component: Clients,
      meta: { auth: true, role: ['admin', 'employer'] }
    },
    {
      path: '/vacancies',
      name: 'Vacancies',
      component: Vacancies,
      meta: { auth: true }
    },
    {
      path: '/selections',
      name: 'Selections',
      component: Selections,
      meta: { auth: true, role: 'admin' }
    },
    {
      path: '/table-editing',
      name: 'TableEditing',
      component: TableEditing,
      meta: { auth: true, role: 'admin' }
    },
  ]
})

export default router
