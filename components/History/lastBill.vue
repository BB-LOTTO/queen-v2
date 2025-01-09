<template>
    <v-data-table
        density="compact"
        :headers="bill_headers"
        :items="bills"
        class="bill-table"
    >
        <template v-slot:item="{ item }">
            <tr>
                <td class="cursor-pointer" 
                    @click="showBillDetail(item.billId, setDateTH(item.createdDt), item.betAmount)"
                >
                    {{ $dateFormat(item.createdDt) }} <small>{{ $timeFormat(item.createdDt) }}</small>
                </td>
                <td class="text-center">{{ $numberFormat(item.betAmount) }}</td>
                <td class="text-center">{{ item.winloss }}</td>
                <td class="text-center">
                    <v-btn 
                        density="compact"
                        size="small" 
                        color="red-accent-4" 
                        icon="mdi-close"
                    ></v-btn>
                </td>
            </tr>
        </template>
    </v-data-table>

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
</template>

<script setup>
const props = defineProps(['username', 'lotto', 'perPage'])
const emit = defineEmits(['sometingWrong'])
const bills = ref([])
const billDetail = ref([])
const billDetailHeader = ref({title: '', amount: ''})
const _billDetail = ref(false)
const bill_headers = ref([
            { title: 'วันที่', sortable: false, align: 'start' },
            { title: 'ยอด (฿)', sortable: false, align: 'center' },
            { title: 'ชนะ/แพ้', sortable: false, align: 'center' },
            { title: 'ลบ', sortable: false, align: 'center' }
        ])

onMounted(() => {
    getBill()
})

const setDateTH = (date) => {
    const _date = new Date(date)
    const _time = `${String(_date.getHours()).padStart(2, '0')}:${String(_date.getMinutes()).padStart(2, '0')}`
    return _date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + _time
}

async function showBillDetail(bill_id, dateTime, amount) {
    await getBillDetail(bill_id)
    billDetailHeader.value.title = dateTime
    billDetailHeader.value.amount = amount
    _billDetail.value = true
}

async function getBill() {
    let date_now = new Date()
    let enddate = `${date_now.getDate()}-${String(date_now.getMonth() + 1).padStart(2, '0')}-${date_now.getFullYear()}`
    try {
        const res = await $fetch('/api/history/findBillByUserId', {
            method: 'POST',
            body: {
                'username': props.username,
                'startdate': '01-07-2024',
                'enddate': enddate,
                'page': '0',
                'size': '10'
            }
        })

        bills.value = res.data.data
    }
    catch(error) {
        console.log(error)
    }
}

async function getBillDetail(bill_id) {
    try {
        const res = await $fetch('/api/history/findBillDetail', {
            method: 'POST',
            body: {
                'bill': bill_id,
                'page': '0',
                'size': '20'
            }
        })

        billDetail.value = setGroupBillDetail(res.data.data)
    }
    catch(error) {
        emit('sometingWrong', 'red-accent-4', 'เกิดข้อผิดพลาด กรุณาลองใหม่...')
    }
}

function setGroupBillDetail(data) {
    let _data = []
    data.forEach(item => {
        if(_data.length === 0) _data.push({betTagId: item.betTagId, amount: item.amount, numbers: [item.number]})
        else {
            let dataInx = _data.findIndex(d => { return d.betTagId === item.betTagId && d.amount === item.amount })
            if(dataInx >= 0) _data[dataInx].numbers.push(item.number)
            else _data.push({betTagId: item.betTagId, amount: item.amount, numbers: [item.number]})
        }
    })

    return _data
}

defineExpose({
    getBill
})
</script>

<style scoped>
.detail-number-list {
    min-height: 25px !important;
}
</style>