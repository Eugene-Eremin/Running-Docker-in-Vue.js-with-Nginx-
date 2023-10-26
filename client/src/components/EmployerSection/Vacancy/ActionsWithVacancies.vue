<template>
  <div class="pt-4 px-4">
    <v-card :title="vacancy.jobTitle" :subtitle="areasOfWorkVacancies" variant="tonal">
      <div class="d-flex flex-no-wrap justify-start">
        <!-- Реализовать подгрузку фото -->
        <v-avatar class="ma-3" size="125" rounded="0">
          <div v-if="url == null">
            <img src="../../../../public/no-foto.png" />
          </div>
          <div v-else>
            <img :alt="vacancy.filePictureName" :src="url" />
          </div>
        </v-avatar>

        <div>
          <div class=" h-[100px] overflow-hidden">
            <v-card-text>
              {{ description }}
            </v-card-text>
          </div>
          <div>
            <v-card-actions>
              <DialogWindow @deleteVacancyDialog="deleteVacancyDialog" @uploadVacanciesChange="uploadVacanciesChange"
                :id="id" :changeOrOpen="false" />
            </v-card-actions>
          </div>
        </div>
      </div>
      <template v-slot:append>
        <div class="d-flex justify-space-between">
          <div class="mt-3">
            <DialogWindow @deleteVacancyDialog="deleteVacancyDialog" @uploadVacanciesChange="uploadVacanciesChange"
              :id="id" :changeOrOpen="true" />
          </div>
          <div class="ml-3">
            <v-btn variant="text" density="comfortable" @click="deleteVacancy" icon="mdi-delete"></v-btn>
          </div>
        </div>
      </template>
    </v-card>
  </div>
</template>

<script>
import $api from '@/http'

import DialogWindow from './Fields/CheckAndChangeVacancies/DialogWindow.vue'

export default {
  components: {
    DialogWindow
  },
  props: {
    vacancy: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: this.vacancy.id,
      jobTitle: this.vacancy.jobTitle,
      areasOfWorkVacancies: '',
      description: this.vacancy.description,
      filePictureName: this.vacancy.filePictureName,
      url: null
    }
  },
  methods: {
    openVacancy() {
      console.log('Открыть полностью вакансию с id - ' + this.vacancy.id)
    },
    async deleteVacancy() {
      const deleteVac = await $api.post(`/vacancy/delete-vacancy-data/${this.id}`)
      console.log(deleteVac)
      this.$emit('goEmitDelete')
    },
    deleteVacancyDialog() {
      this.$emit('goEmitDelete')
    },
    uploadVacanciesChange() {
      this.$emit('uploadVacanciesChange')
    }
  },
  async mounted() {
    let i = 0
    while (this.vacancy.areasOfWorkVacancies.length > i) {
      this.areasOfWorkVacancies += this.vacancy.areasOfWorkVacancies[i].name
      if (this.vacancy.areasOfWorkVacancies.length - 1 != i) {
        this.areasOfWorkVacancies += ', '
      }
      ++i
    }

    const response = await fetch(`http://localhost:5000/api/vacancy/get-vacancy-picture-file/${this.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      this.url = downloadUrl
    } else {
      console.log('Фотографии компании нет')
      console.log(response)
    }
  },
  watch: {
    async vacancy() {
      this.areasOfWorkVacancies = ''
      let i = 0
      while (this.vacancy.areasOfWorkVacancies.length > i) {
        this.areasOfWorkVacancies += this.vacancy.areasOfWorkVacancies[i].name
        if (this.vacancy.areasOfWorkVacancies.length - 1 != i) {
          this.areasOfWorkVacancies += ', '
        }
        ++i
      }

      const response = await fetch(`http://localhost:5000/api/vacancy/get-vacancy-picture-file/${this.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        this.url = downloadUrl
      } else {
        this.url = null
        console.log('Фотографии компании нет')
        console.log(response)
      }
    }
  }
}
</script>