<template>
    <v-container class="mt-10 main-container">
        <div class="row">
            <div class="col-12 text-center">
                <div class="w-50 mx-auto">
                    <img src="/public/icon/time_expired.svg" class="text-center">
                </div>
                <h1 class="mt-5">การเข้าสู่ระบบหมดอายุ</h1>
                <p><strong>ขออภัย</strong> การเข้าสู่ระบบของคุณถึงขีดจำกัดแล้ว</p>
                <p>หากคุณต้องการใช้งานต่อ กรุณาเข้าสู่ระบบใหม่</p>
            </div>
        </div>
    </v-container>
</template>

<script setup>
definePageMeta({
    // middleware: 'guest',
    layout: 'blank'
})
const _second = ref(5)

onMounted(() => {
    clearToken()
    // setInterval(() => { countdown() }, 1000)
})

function countdown() {
    if(_second.value > 0) _second.value--
}

function clearToken() {
    const token = useCookie('auth.token')
    const _tp = useCookie('_tp')

    token.value = _tp.value = null
    // setTimeout(() => {
    //     reloadNuxtApp({
    //         path: "/login",
    //         ttl: 2000, // default 10000
    //     })
    // }, 5000)
}

</script>