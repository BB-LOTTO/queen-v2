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
                    <v-col cols="12" lg="8">
                        <v-card title="โปรไฟล์" :subtitle="`รายละเอียดผู้ใช้งาน ${user.name}`" class="mb-4 rounded-xl">
                            <template v-slot:text>
                                <p class="mb-2"><span class="font-weight-bold">ชื่อผู้ใช้ :</span> {{ user.name }}
                                </p>
                                <p class="mb-2"><span class="font-weight-bold">หมายเลขโทรศัพท์ :</span> {{
                                    profile.mobile }}</p>
                                <p class="mb-2"><span class="font-weight-bold">อีเมล์ :</span> {{ profile.email1 }}</p>
                            </template>
                        </v-card>
                        <!-- <v-card title="ข้อมูลส่วนตัว" :subtitle="`ข้อมูลบัญชีธนาคาร`"
                            class="rounded-xl">
                            <template v-slot:text>
                                <p class="mb-2"><span class="font-weight-bold">ธนาคาร :</span>
                                    {{ profile.bank.bankNameTh }}
                                    <small>({{ profile.bank.bankNameEn }})</small>
                                </p>
                                <p class="mb-2"><span class="font-weight-bold">เลขบัญชี :</span> {{ profile.account }}
                                </p>
                            </template>
                        </v-card> -->
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-card title="ETC." class="rounded-xl">
                            <template v-slot:text>
                                <p>จำนวนการฝากเงิน : {{ profile.totalDeposit }}</p>
                                <p>จำนวนการถอนเงิน : {{ profile.totalWithdraw }}</p>
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

const _tp = useCookie('_tp') || 0
const { data } = useAuth()
const user = data.value.user
const profile = data.value.user.userProfile
const username = data.value.user.username

</script>
