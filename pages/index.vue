<template>
    <!-- <NuxtLayout name="header" :actions="true"></NuxtLayout>
    <v-container class="main-container">
        <GameAllGame></GameAllGame>
        <LotteryRecommend :btnActive="true"></LotteryRecommend>
        <LotteryResult></LotteryResult>
    </v-container> -->
    <v-container class="mt-10 main-container">
        <div class="row">
            <div class="col-12 text-center">
                <div class="w-50 mx-auto">
                    <img src="/public/icon/login_key_icon.svg" class="text-center">
                </div>
                <h1 class="mt-5">เข้าสู่ระบบ</h1>
                <p>กำลังตรวจสอบการเข้าสู่ระบบ</p>
                <p>กรุณารอซักครู่...</p>
            </div>
        </div>
    </v-container>
</template>

<script setup>
definePageMeta({
    layout: 'blank',
    middleware: 'third-party'
})
</script>

<style scoped>
/* .v-slide-group.game-slide-home {
    padding: 0 !important;
} */
</style>