<template>
    <NuxtLayout name="header">
        <template #sub-title>หวยออนไลน์</template>
        <template #title>ดูโพยหวย</template>
    </NuxtLayout>
    <Head>
        <Title>โพยหวย - {{ useRuntimeConfig().public.webName }}</Title>
    </Head>
    <v-container class="mt-n10 main-container">
        <v-row>
            <v-col cols="3" class="d-none d-lg-block">
                <SideBarTradeLeftBar/>
            </v-col>
            <v-col cols="12" lg="9">
                <v-card class="rounded-xl pa-3">
                    <template v-slot:text>
                        <v-row>
                            <v-col cols="12" md="7">
                                <v-row>
                                    <v-col cols="6" lg="5">
                                        <v-text-field
                                            v-model="startdate"
                                            density="compact"
                                            type="date"
                                            label="ตั้งแต่วันที่"
                                            variant="outlined"
                                            required
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" lg="5">
                                        <v-text-field
                                            v-model="enddate"
                                            density="compact"
                                            type="date"
                                            label="ถึงวันที่"
                                            variant="outlined"
                                            required
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" lg="2" class="d-flex align-center">
                                        <v-btn
                                            :disabled="btnSearchLoading"
                                            :loading="btnSearchLoading"
                                            class="text-none"
                                            color="pink-darken-3"
                                            variant="flat"
                                            block
                                            @click="searchBill"
                                        >
                                            ค้นหา
                                        </v-btn>
                                    </v-col>
                                </v-row>

                                <v-item-group 
                                    v-model="dateSelection"
                                    mandatory
                                >
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                v-for="n in 6"
                                                :key="n"
                                                cols="4"
                                                md="2"
                                                class="pt-2 pb-0 px-1"
                                            >
                                                <v-item v-slot="{ isSelected, toggle }">
                                                    <v-card
                                                        :color="isSelected ? 'pink-darken-4' : 'pink-lighten-2'"
                                                        class="d-flex align-center"
                                                        dark
                                                        @click="toggle"
                                                    >
                                                        <v-scroll-y-transition>
                                                            <small class="flex-grow-1 text-center">
                                                                {{ _selection[n-1] }}
                                                        </small>
                                                        </v-scroll-y-transition>
                                                    </v-card>
                                                </v-item>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-item-group>

                                <p class="mt-2">ข้อมูลตั้งแต่วันที่ : 
                                    <span class="text-pink-lighten-3">{{ $dateFormat(startdate) }}</span>
                                    ถึง 
                                    <span class="text-pink-lighten-3">{{ $dateFormat(enddate) }}</span>
                                </p>
                            </v-col>
                            <v-col cols="12" md="5" class="d-none"></v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <v-skeleton-loader
                                    :loading="billLoading"
                                    height="400"
                                    type="table"
                                >
                                    <!-- Desktop -->
                                    <v-data-table
                                        density="compact"
                                        :headers="bill_headers"
                                        :items="bills"
                                        class="d-none d-lg-block"
                                    >
                                        <template v-slot:item="{ item }">
                                            <tr>
                                                <td>
                                                    <p class="mb-0 cursor-pointer text-pink-lighten-2 text-subtitle-2"
                                                        @click="showBillDetail(
                                                            item.billId, 
                                                            setDateTH(item.createdDt), 
                                                            item.betAmount,
                                                            item.gameRoundId.lotteryId.name,
                                                            $dateFormat(item.gameRoundId.name.split(' ')[1]),
                                                            item.status,
                                                            item.sumResult
                                                        )">
                                                        {{ item.billId }}
                                                    </p>
                                                </td>
                                                <td>
                                                    {{ $dateFormat(item.createdDt) }} <small>{{ $timeFormat(item.createdDt) }}</small>
                                                </td>
                                                <td class="text-start">{{ item.gameRoundId.lotteryId.name }}</td>
                                                <td class="text-start">{{ $dateFormat(item.gameRoundId.name.split(' ')[1]) }}</td>
                                                <td class="text-center">{{ $numberFormat(item.betAmount) }}.-</td>
                                                <td class="text-center">{{ item.sumResult ?? '-' }}</td>
                                                <td class="text-center">
                                                    <v-tooltip v-if="item.status === '0'" text="ยกเลิกโพย">
                                                        <template v-slot:activator="{ props }">
                                                            <v-icon 
                                                                v-bind="props" 
                                                                color="error" 
                                                                icon="mdi-delete-circle-outline"
                                                                class="cursor-pointer"
                                                                @click="confirmCancelPoy(item.billId)"
                                                            ></v-icon>
                                                        </template>
                                                    </v-tooltip>
                                                    <small v-else-if="item.status === '2'" class="text-blue-grey-darken-1">ยกเลิกแล้ว</small>
                                                    <span v-else>-</span>
                                                </td>
                                            </tr>
                                        </template>
                                    </v-data-table>

                                    <!-- Mobile -->
                                     <v-data-table
                                        density="compact"
                                        :items="bills"
                                        class="d-block d-lg-none"
                                     >
                                        <template v-slot:headers></template>
                                        <template v-slot:item="{ item }">
                                            <tr>
                                                <td>
                                                    <v-row class="pa-4 ma-0">
                                                        <v-col cols="6" class="pa-0 pb-2">
                                                            <p class="text-subtitle-1 font-weight-bold text-grey-lighten-1">เลขที่</p>
                                                            <p class="mb-0 cursor-pointer text-pink-lighten-2 text-subtitle-2"
                                                                @click="showBillDetail(
                                                                    item.billId, 
                                                                    setDateTH(item.createdDt), 
                                                                    item.betAmount,
                                                                    item.gameRoundId.lotteryId.name,
                                                                    $dateFormat(item.gameRoundId.name.split(' ')[1]),
                                                                    item.status,
                                                                    item.sumResult
                                                                )">
                                                                {{ item.billId }}
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="6" class="pa-0 pb-2">
                                                            <p class="text-subtitle-1 font-weight-bold text-grey-lighten-1">วันที่</p>
                                                            {{ $dateFormat(item.createdDt) }} <small>{{ $timeFormat(item.createdDt) }}</small>
                                                        </v-col>
                                                        <v-col cols="6" class="pa-0 pb-2">
                                                            <p class="text-subtitle-1 font-weight-bold text-grey-lighten-1">ประเภท</p>
                                                            {{ item.gameRoundId.lotteryId.name }}
                                                        </v-col>
                                                        <v-col cols="6" class="pa-0 pb-2">
                                                            <p class="text-subtitle-1 font-weight-bold text-grey-lighten-1">งวดวันที่</p>
                                                            {{ $dateFormat(item.gameRoundId.name.split(' ')[1]) }}
                                                        </v-col>
                                                        <v-col cols="6" class="pa-0 pb-2">
                                                            <p class="text-subtitle-1 font-weight-bold text-grey-lighten-1">ยอด (฿)</p>
                                                            {{ $numberFormat(item.betAmount) }}.-
                                                        </v-col>
                                                        <v-col cols="6" class="pa-0 pb-2">
                                                            <p class="text-subtitle-1 font-weight-bold text-grey-lighten-1">ผลลัพท์</p>
                                                            {{ item.sumResult ?? '-' }}
                                                        </v-col>
                                                        <v-col cols="12" class="pa-0 text-end">
                                                            <v-tooltip v-if="item.status === '0'" text="ยกเลิกโพย">
                                                                <template v-slot:activator="{ props }">
                                                                    <v-icon 
                                                                        v-bind="props" 
                                                                        size="x-large"
                                                                        color="error" 
                                                                        icon="mdi-delete-circle-outline"
                                                                        class="cursor-pointer"
                                                                        @click="confirmCancelPoy(item.billId)"
                                                                    ></v-icon>
                                                                </template>
                                                            </v-tooltip>
                                                            <span v-else-if="item.status === '2'" class="text-blue-grey-darken-2">ยกเลิกแล้ว</span>
                                                            <span v-else>-</span>
                                                        </v-col>
                                                    </v-row>
                                                </td>
                                            </tr>
                                        </template>
                                     </v-data-table>
                                </v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </template>
                </v-card>

                <v-dialog 
                    v-model="_billDetail"
                    max-width="800"
                >
                    <HistoryBillDetail
                        :billDetail="billDetail"
                        :billHeader="billDetailHeader"
                        @bill-detail-close="_billDetail = false"
                    >
                    </HistoryBillDetail>
                </v-dialog>
            </v-col>
        </v-row>
        <v-overlay
            :model-value="overlay"
            class="align-center justify-center"
        >
            <v-progress-circular
                color="primary"
                size="64"
                indeterminate
            ></v-progress-circular>
        </v-overlay>

        <v-dialog
            v-model="confirm"
            max-width="400"
        >
            <v-card>
                <template v-slot:title>
                    <v-row>
                        <v-col cols="10">
                            <span class="text-mitr-400">ยืนยันการยกเลิกโพย?</span>
                        </v-col>
                        <v-col cols="2" class="text-end">
                            <v-icon icon="mdi-close" title="ยกเลิก" @click="confirm = false"></v-icon>
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:text>
                    <v-card variant="outlined" color="grey-darken-1">
                        <template v-slot:text>
                            <v-row class="border-b">
                                <v-col cols="4" class="font-weight-bold">เลขที่</v-col>
                                <v-col cols="8" class="text-end">{{ cancel_bill.billId }}</v-col>
                            </v-row>
                            <v-row class="border-b">
                                <v-col cols="4" class="font-weight-bold">งวดวันที่</v-col>
                                <v-col cols="8" class="text-end">{{ $dateFormat(cancel_bill.gameRoundId.name.split(' ')[1]) }}</v-col>
                            </v-row>
                            <v-row class="border-b">
                                <v-col cols="4" class="font-weight-bold">วันที่ซื้อ</v-col>
                                <v-col cols="8" class="text-end">{{ $dateFormat(cancel_bill.createdDt) }} <small>{{ $timeFormat(cancel_bill.createdDt) }}</small></v-col>
                            </v-row>
                            <v-row class="border-b">
                                <v-col cols="4" class="font-weight-bold">ยอดซื้อ (฿)</v-col>
                                <v-col cols="8" class="text-end">{{ $numberFormat(cancel_bill.betAmount) }}.-</v-col>
                            </v-row>
                        </template>
                    </v-card>
                </template>
                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="confirm = false">
                        ยกเลิก
                    </v-btn>

                    <v-btn @click="cancelPoy(cancel_bill.billId)" class="text-red-darken-4">
                        ยืนยัน
                    </v-btn>
                </template>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialog_result"
            width="auto"
        >
            <v-card
                max-width="400"
                :prepend-icon="dialog.icon"
                :color="dialog.color"
                :title="dialog.title"
            >
                <template v-slot:actions>
                    <v-btn
                        class="ms-auto"
                        text="Ok"
                        @click="dialog_result = false"
                    ></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const { data } = useAuth()
const username = data.value.user.username
const bills = ref([])
const startdate = ref('')
const enddate = ref('')
const _billDetail = ref(false)
const billDetail = ref([])
const billDetailHeader = ref('')
const btnSearchLoading = ref(false)
const billLoading = ref(false)
const overlay = ref(false)
const confirm = ref(false)
const dialog_result = ref(false)
const dialog = ref({'title': '', 'color': '', 'icon': ''})
const dateSelection = ref()
const _selection = ['วันนี้', 'เมื่อวาน', 'สัปดาห์นี้', 'สัปดาห์ที่แล้ว', 'เดือนนี้', 'เดือนที่แล้ว']
const bill_headers = ref([
            { title: 'เลขที่', sortable: false, align: 'start' },
            { title: 'วันที่ซื้อ', sortable: false, align: 'start' },
            { title: 'ประเภท', sortable: false, align: 'start' },
            { title: 'งวดวันที่', sortable: false, align: 'start' },
            { title: 'ยอด (฿)', sortable: false, align: 'center' },
            { title: 'ผลลัพท์', sortable: false, align: 'center' },
            { title: 'จัดการ', sortable: false, align: 'center' }
        ])
const date_now = new Date()
const cancel_bill = ref('')

onMounted(async() => {
    await setDateNow()
    await getBill()
})

watch(dateSelection, async (selected) => {
    const dateList = dateSelectionList(selected)
    startdate.value = dateList.startdate
    enddate.value = dateList.enddate

    await getBill()
})

const dateSelectionList = (selected) => {
    const dateList = [
        { 
            "startdate": `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${String(date_now.getDate()).padStart(2, '0')}`, 
            "enddate": `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${String(date_now.getDate()).padStart(2, '0')}`
        }, // วันนี้
        { 
            "startdate": `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${date_now.getDate() - 1 === 0 ? getLastDatOfMonth(date_now.getFullYear(), date_now.getMonth()) : date_now.getDate() - 1}`,
            "enddate": `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${date_now.getDate() - 1 === 0 ? getLastDatOfMonth(date_now.getFullYear(), date_now.getMonth()) : date_now.getDate() - 1}`
        }, // เมื่อวาน
        { 
            "startdate": currentWeek(1, 0),
            "enddate": currentWeek(1, 6)
        }, // สัปดาห์นี้
        { 
            "startdate": currentWeek(2, 0),
            "enddate": currentWeek(2, 6)
        }, // สัปดาห์ที่แล้ว
        { 
            "startdate": `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-01`, 
            "enddate": `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${String(getLastDatOfMonth(date_now.getFullYear(), date_now.getMonth() + 1)).padStart(2, '0')}`
        }, // เดือนนี้
        { 
            "startdate": `${date_now.getFullYear()}-${String(date_now.getMonth()).padStart(2, '0')}-01`, 
            "enddate": `${date_now.getFullYear()}-${String(date_now.getMonth()).padStart(2, '0')}-${String(getLastDatOfMonth(date_now.getFullYear(), date_now.getMonth())).padStart(2, '0')}`
        }, // เดือนที่แล้ว
    ]

    return dateList[selected]
}

function currentWeek(wNeg = 1, dPlus = 0) {  
    const year = +new Date(date_now.getFullYear(), 0, 1)
    const today = +new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate())
    const dateOfYear = ((today - year + 1) / 86400000)
    const week = Math.ceil(dateOfYear / 7)

    const d = (1 + (week - wNeg) * 7)
    const _date = new Date(date_now.getFullYear(), 0, d + dPlus)
    return `${_date.getFullYear()}-${String(_date.getMonth() + 1).padStart(2, '0')}-${String(_date.getDate()).padStart(2, '0')}`
}

function getLastDatOfMonth(y, m) {
    return new Date(y, m, 0).getDate()
}

async function setDateNow() {
    startdate.value = enddate.value = `${date_now.getFullYear()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${String(date_now.getDate()).padStart(2, '0')}`
}

function setDateFormat(date) {
    const _date = date.split('-')
    return `${_date[2]}-${_date[1]}-${_date[0]}`
}

async function searchBill() {
    btnSearchLoading.value = billLoading.value = true
    await getBill()
}

const setDateTH = (date) => {
    const _date = new Date(date)
    const _time = `${String(_date.getHours()).padStart(2, '0')}:${String(_date.getMinutes()).padStart(2, '0')}`
    return _date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + _time
}

async function getBill() {
    overlay.value = true
    try {
        const res = await $fetch('/api/history/findBillByUserId', {
            method: 'POST',
            body: {
                'username': username,
                'startdate': setDateFormat(startdate.value),
                'enddate': setDateFormat(enddate.value),
                'page': '0',
                'size': '40'
            }
        })

        if(res !== undefined) bills.value = res.data.data
        else bills.value = []
    }
    catch(error) {
        navigateTo('/expired')
        console.log(error)
    }
    finally {
        overlay.value = false
    }

    btnSearchLoading.value = billLoading.value = false
}

async function showBillDetail(bill_id, dateTime, amount, type, type_date, status, sum) {
    await getBillDetail(bill_id)
    const bills = {billId: bill_id, dateTime: dateTime, amount: amount, type: type, date: type_date, status: status, sumResult: sum}
    billDetailHeader.value = bills
    _billDetail.value = true
}

async function confirmCancelPoy(bill_id) {
    cancel_bill.value = bills.value.find(b => { return b.billId === bill_id })
    confirm.value = true
}

async function cancelPoy(bill_id) {
    try {
        const res = await $fetch('/api/history/cancelPoy', {
            method: 'POST',
            body: { 'billId': bill_id }
        })

        if(res.status === 'OK') {
            dialog_result.value = true
            dialog.value.title = 'ลบโพยเรียบร้อย...'
            dialog.value.color = 'green-darken-1'
            dialog.value.icon = 'mdi-check'
        }
    }
    catch(error) {
        dialog_result.value = true
        dialog.value.title = 'ไม่สามารถยกเลิกโพยได้...'
        dialog.value.color = 'red-lighten-2'
        dialog.value.icon = 'mdi-close'
    }
    finally {
        confirm.value = false
        getBill()
    }
}

async function getBillDetail(bill_id) {
    overlay.value = true
    try {
        const res = await $fetch('/api/history/findBillDetail', {
            method: 'POST',
            body: {
                'bill': bill_id,
                'page': '0',
                'size': '20'
            }
        })

        // console.log(res.data.data)
        const _group = setGroupBillDetail(res.data.data)
        billDetail.value = _group
    }
    catch(error) {
        console.log(error)
        // emit('sometingWrong', 'red-accent-4', 'เกิดข้อผิดพลาด กรุณาลองใหม่...')
    }
    finally {
        overlay.value = false
    }
}
function setGroupBillDetail(data) {
    let _data = []

    data.forEach(item => {
        _data.push({
            betTagId: item.betTagId, 
            amount: item.amount, 
            numbers: item.number, 
            winloss: item.winloss, 
            payout: item.payout,
            predict: item.predict,
            status: item.status
        })
    })

    return _data
}
</script>