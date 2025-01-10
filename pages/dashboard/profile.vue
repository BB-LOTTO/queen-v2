<template>
    <NuxtLayout name="header">
        <template #sub-title>ข้อมูลส่วนตัว</template>
        <template #title>รายละเอียดผู้ใช้งาน</template>
    </NuxtLayout>

    <Head>
        <Title>ข้อมูลส่วนตัว - {{ useRuntimeConfig().public.webName }}</Title>
    </Head>
    <v-container class="mt-n10 main-container">
        <v-row>
            <v-col cols="3" class="d-none d-lg-block">
                <SideBarTradeLeftBar />
            </v-col>
            <v-col cols="12" lg="9">
                <v-row>
                    <v-col cols="12">
                        <v-card title="โปรไฟล์" :subtitle="`รายละเอียดผู้ใช้งาน ${user.name}`" class="mb-4 rounded-xl">
                            <template v-slot:text>
                                <p class="mb-2"><span class="font-weight-bold">ชื่อผู้ใช้ :</span> {{ user.name }}
                                </p>
                                <p class="mb-2"><span class="font-weight-bold">หมายเลขโทรศัพท์ :</span> {{
                                    profile.mobile }}</p>
                            </template>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const { data } = useAuth()
const user = data.value.user
const profile = data.value.user.userProfile

</script>
