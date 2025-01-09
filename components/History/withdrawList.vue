<template>
    <v-list lines="two">
        <v-list-item
            v-for="(item, index) in props.withdraws"
            :key="item.id"
        >
            <template v-slot:title>
                <div style="line-height: 10px;">
                    <small class="text-caption text-pink-darken-1 mb-0">
                        {{ item.id }}
                        <v-tooltip
                            v-if="item.state === 0"
                            activator="parent"
                            location="top"
                        >
                            <template v-slot:activator="{ props }">
                                <v-icon color="grey-darken-4" class="me-1">mdi-timer-sand</v-icon>
                            </template>
                            <span>รอตรวจสอบ</span>
                        </v-tooltip>
                        
                        <v-btn 
                            v-if="item.state === 0" 
                            size="x-small" 
                            variant="flat" 
                            color="red-accent-4"
                            style="font-weight: 100;"
                            @click="confirmCancel(index)"
                        >
                            ยกเลิก
                        </v-btn>
                        <small v-else-if="item.state === 4" class="text-grey-darken-4">ยกเลิกแล้ว</small>
                    </small>
                    <p class="mb-0 text-subtitle-1" v-html="setDateTH(item.completedOn !== null ? item.completedOn : item.createdOn)"></p>
                </div>
            </template>
            <template v-slot:subtitle>
                <!-- <small>[{{ item.refBank.shortName }}] {{ item.refAccountNumber }} | {{ item.refAccountName }}</small> -->
            </template>

            <template v-slot:append>
                <p class="font-weight-bold">{{ $numberFormat(item.totalAmount) }} ฿</p>
            </template>

            <v-divider></v-divider>
        </v-list-item>
    </v-list>

    <v-dialog
        v-model="dialogConfirm"
        width="auto"
    >
        <v-card
            max-width="400"
            prepend-icon="mdi-alert-circle-outline"
            title="ยืนยันการยกเลิกการถอนเงิน?"
        >
            <template v-slot:text>
                <div class="text-center">
                    <p>ยืนยันการยกเลิกการถอนเงิน</p>
                    <p>เลขที่ : <span class="text-pink-darken-1">{{ withdrawCancel.id }}</span></p>
                    <p>จำนวนเงิน : <span class="font-weight-bold text-green-darken-4">{{ withdrawCancel.totalAmount }}</span> ฿</p>
                </div>
            </template>

            <v-divider></v-divider>

            <template v-slot:actions>
                <v-btn
                    class="mx-auto"
                    text="ยืนยัน"
                    color="red-accent-4"
                    @click="cancelWithdraw()"
                ></v-btn>
                <v-btn
                    class="mx-auto"
                    text="ยกเลิก"
                    @click="dialogConfirm = false"
                ></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps(['username', 'withdraws'])
const emit = defineEmits(['toUpdateWallet', 'toUpdateWithdraw'])
const dialogConfirm = ref(false)
const withdrawIndex = ref('')
const withdrawCancel = ref('')

const setDateTH = (date) => {
    const _date = new Date(date)
    const _time = `${String(_date.getHours()).padStart(2, '0')}:${String(_date.getMinutes()).padStart(2, '0')}`
    return _date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + `<small>${_time}</small>`
}

function confirmCancel(index) {
    dialogConfirm.value = true
    withdrawIndex.value = index
    withdrawCancel.value = props.withdraws.find((w, i) => { return i === index })
}  

async function cancelWithdraw() {
    try {
        const res = await $fetch('/api/payment/cancelWithdraw', {
            method: 'POST',
            body: {
                'id': withdrawCancel.value.id,
                'username': props.username,
                'totalAmount': withdrawCancel.value.totalAmount
            }
        })

        if(res.status === 'OK') {
            dialogConfirm.value = false
            emit('toUpdateWallet')
            emit('toUpdateWithdraw')
        }
    }
    catch(error) {
        console.log(error)
    }
}
</script>