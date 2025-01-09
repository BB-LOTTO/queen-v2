<template>
    <NuxtLayout name="header">
        <template #sub-title>กระเป๋าเงิน</template>
        <template #title>ฝาก - ถอน</template>
    </NuxtLayout>
    <Head>
        <Title>กระเป๋าเงิน - {{ useRuntimeConfig().public.webName }}</Title>
    </Head>
    <v-container class="mt-n10 main-container">
        <v-row>
            <v-col cols="3" class="d-none d-lg-block">
                <SideBarTradeLeftBar/>
            </v-col>
            <v-col cols="12" lg="9">
                <v-card class="user-wallet mb-4 rounded-xl">
                    <template v-slot:prepend>
                        <v-icon>mdi-wallet</v-icon>
                    </template>
                    <template v-slot:title>
                        <span class="font-weight-black">กระเป๋าเงิน</span>
                    </template>

                    <template v-slot:text>
                        <v-row>
                            <v-col cols="12" lg="5">
                                <v-card
                                    variant="outlined"
                                    class="mx-auto"
                                    color="surface-variant"
                                    rounded="xl"
                                >
                                    <template v-slot:title>
                                        <div class="text-caption font-weight-bold">ยอดเงินคงเหลือ</div>
                                    </template>
                                    <template v-slot:text>
                                        <div class="text-h4 font-weight-black">
                                            <span style="color: #2E7D32;" v-html="balance()"></span>
                                            <small class="ms-1">฿</small>
                                        </div>
                                    </template>
                                    <template v-slot:actions>
                                        <v-divider></v-divider>
                                        <UserDeposit 
                                            :username="data.user.username"
                                            @to-update-wallet="getUserSession"
                                        />

                                        <UserWithdraw 
                                            :username="data.user.username"
                                            :balance="parseInt(data.user.userFunds.balance)"
                                            @to-update-wallet="getUserSession"
                                            @to-update-withdraw="historyWithdraw"
                                        />
                                    </template>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-card>

                <v-row>
                    <v-col cols="12" lg="6">
                        <v-card class="rounded-xl">
                            <template v-slot:prepend>
                                <v-icon>mdi-cash-fast</v-icon>
                            </template>
                            <template v-slot:title>
                                <span class="font-weight-black">รายการฝาก <small class="text-caption">( {{ totalElements.deposit }} รายการ )</small></span>
                            </template>

                            <template v-slot:append>
                                <div class="d-flex align-center">
                                    <v-icon class="cursor-pointer" @click="depositePage('prev')">mdi-chevron-left</v-icon>
                                    <p class="text-end text-caption mb-0">{{ page.deposit+1 }}/{{ totalPages.deposit }}</p>
                                    <v-icon class="cursor-pointer" @click="depositePage('next')">mdi-chevron-right</v-icon>
                                </div>
                            </template>

                            <template v-slot:text>
                                <v-skeleton-loader
                                    :loading="loading.deposit"
                                    type="list-item-three-line"
                                >
                                    <HistoryDepositList
                                        :deposits="depositList"
                                    ></HistoryDepositList>
                                </v-skeleton-loader>
                            </template>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-card class="rounded-xl">
                            <template v-slot:prepend>
                                <v-icon>mdi-cash-fast</v-icon>
                            </template>
                            <template v-slot:title>
                                <span class="font-weight-black">รายการถอน <small class="text-caption">( {{ totalElements.withdraw }} รายการ )</small></span>
                            </template>

                            <template v-slot:append>
                                <div class="d-flex align-center">
                                    <v-icon class="cursor-pointer" @click="withdrawPage('prev')">mdi-chevron-left</v-icon>
                                    <p class="text-end text-caption mb-0">{{ page.withdraw+1 }}/{{ totalPages.withdraw }}</p>
                                    <v-icon class="cursor-pointer" @click="withdrawPage('next')">mdi-chevron-right</v-icon>
                                </div>
                            </template>

                            <template v-slot:text>
                                <v-skeleton-loader
                                    :loading="loading.withdraw"
                                    type="list-item-three-line"
                                >
                                    <HistoryWithdrawList
                                        v-if="withdrawListRender"
                                        :username="data.user.username"
                                        :withdraws="withdrawList"
                                        @to-update-wallet="getUserSession"
                                        @to-update-withdraw="historyWithdraw"
                                    ></HistoryWithdrawList>
                                </v-skeleton-loader>
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

const { getSession, data } = useAuth()
const depositList = ref([])
const withdrawList = ref([])
const withdrawListRender = ref(true)
const page = ref({ deposit: 0, withdraw: 0 })
const size = ref({ deposit: 10, withdraw: 10 })
const totalElements = ref({ deposit: 0, withdraw: 0 })
const totalPages = ref({ deposit: 0, withdraw: 0 })
const loading = ref({deposit: true, withdraw: true})

onMounted(() => {
    historyDeposit()
    historyWithdraw()
})

const balance = () => {
    const _balance = Number(data.value.user.userFunds.balance).toFixed(2)
    return new Intl.NumberFormat().format(_balance.split('.')[0]) + '.' + `<small>${_balance.split('.')[1]}</small>` 
}

async function getUserSession() {
    getSession()
}

function depositePage(step) {
    let _page = page.value
    let _totalPages = totalPages.value
    if(step === 'next') _page.deposit+1 < _totalPages.deposit ? _page.deposit++ : _page.deposit = _totalPages.deposit - 1
    if(step === 'prev') _page.deposit > 0 ? _page.deposit-- : _page.deposit = 0

    historyDeposit()
}

function withdrawPage(step) {
    let _page = page.value
    let _totalPages = totalPages.value
    if(step === 'next') _page.withdraw+1 < _totalPages.withdraw ? _page.withdraw++ : _page.withdraw = _totalPages.withdraw - 1
    if(step === 'prev') _page.withdraw > 0 ? _page.withdraw-- : _page.withdraw = 0

    historyWithdraw()
}

const setDateNow = () => {
    const d = new Date()
    return `${d.getDate()}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`
}

async function reRenderComponent(type) {
    if(type === 'withdraw') {
        withdrawListRender.value = false
        await nextTick()
        withdrawListRender.value = true
    }
}

async function historyDeposit() {
    loading.value.deposit = true
    try {
        const res = await $fetch('/api/history/findDeposit', {
            method: 'POST',
            body: {
                'username': data.value.user.username,
                'startdate': '01-07-2023',
                'enddate': setDateNow(),
                'page': page.value.deposit,
                'size': size.value.deposit
            }
        })

        if(res) {
            totalElements.value.deposit = res.data.totalElements
            totalPages.value.deposit = res.data.totalPages
            depositList.value = res.data.data
        }
    }
    catch(error) {
        console.log(error)
    }
    finally {
        loading.value.deposit = false
    }
}

async function historyWithdraw() {
    loading.value.withdraw = true
    try {
        const res = await $fetch('/api/history/findWithdraw', {
            method: 'POST',
            body: {
                'username': data.value.user.username,
                'startdate': '01-07-2023',
                'enddate': setDateNow(),
                'page': page.value.withdraw,
                'size': size.value.withdraw
            }
        })

        if(res) {
            totalElements.value.withdraw = res.data.totalElements
            totalPages.value.withdraw = res.data.totalPages
            withdrawList.value = res.data.data
            reRenderComponent('withdraw')
        }
    }
    catch(error) {
        console.log(error)
    }
    finally {
        loading.value.withdraw = false
    }
}

</script>

<style>
.user-wallet .v-card-item__append {
    width: 250px;
}
.v-list-item--density-default:not(.v-list-item--nav).v-list-item--two-line {
    width: 100%;
    display: inline-grid;
}
</style>