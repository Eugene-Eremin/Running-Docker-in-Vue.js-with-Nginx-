<!-- !!! Заметки (удалить) !!! -->

<!-- /// Отправка файла /// -->

<!-- 
<template>
    <div class="flex flex-col">
        <input @change="changeFile" type="file" />
        <button @click="sendFile" class="mr-auto">Отправить файл</button>
    </div>
</template>

<script setup>
import axios from 'axios'

testStore = useTestStore()

let file = []

const changeFile = (event) => {
    file = event.target.files[0]
    console.log(file)
}
const sendFile = async () => {
    let formData = new FormData();

    formData.append('file', file)

    await axios.post('http://localhost:5000/api/test2/testcontr2', formData)
        .then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
}

document.title = 'Home'
</script>
-->

<!-- /// Отправка данных между компонентами (props, emit) /// -->

<!-- App.vue -->
<!-- 
    <template>
    <div>
        <SomeComponent :prop="propsOne" @waitDispatchOne="getEmitOne" @waitDispatchTwo="getEmitTwo" />
    </div>
</template>

<script setup>

import SomeComponent from './SomeComponent.vue';

const getEmitOne = (event) => {
    console.log(event)
}
const getEmitTwo = (event) => {
    console.log(event)
}


const propsOne = 'props text'

</script>
-->

<!-- SomeComponent.vue -->
<!--
<template>
    <div>
        <button @click="goEmitOne">
            отправить родителю emitOne
        </button>
        <button @click="goEmitTwo">
            отправить родителю emitTwo
        </button>
        <button @click="getProps">
            получить пропс
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['waitDispatchOne', 'testemittwo'])
const goEmitOne = () => {
    emit('waitDispatchOne', 'test one')
}
const goEmitTwo = () => {
    emit('testemittwo', 'test two')
}


const props = defineProps({
    prop: {
        type: String,
        required: true
    },
    // propTwo: {
    //     type: String,
    //     required: true
    // },
})
const getProps = () => {
    console.log(props.prop)
}
</script>
-->

<!-- Отображение фотографии
<template>
    <img :src="url">

    <v-btn @click="aabb(event)">Скачать</v-btn>
</template> 
-->

<!-- Отображение фотографии
<script>
const response = await fetch('http://localhost:5000/api/vacancy/get-all-vacancies-for-employer', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
if (response.status === 200) {
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    this.url = downloadUrl
    // .substr(5, downloadUrl.length)
    console.log(this.url)
    // const link = document.createElement('a')
    // console.log(blob)
    // link.href = downloadUrl
    // link.download = 'free-icon-corrdect-5440366.png'
    // document.body.append(link)
    // console.log(link)
    // link.click()
    // link.remove()

} else {
    console.log('ошибка')
    console.log(response)
}
</script>
-->

<!--  Скачать файл при клике
<script>
async aabb() {
    const response = await fetch('http://localhost:5000/api/vacancy/get-all-vacancies-for-employer', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        this.url = downloadUrl
        console.log(this.url)
        const link = document.createElement('a')
        console.log(blob)
        link.href = downloadUrl
        link.download = 'free-icon-corrdect-5440366.png'
        document.body.append(link)
        link.click()
        link.remove()

    } else {
        console.log('ошибка')
        console.log(response)
    }
}
</script> -->