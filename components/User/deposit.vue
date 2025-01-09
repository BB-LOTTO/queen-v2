<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
        transition="dialog-top-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                variant="text"
                color="#B71C1C"
                v-bind="activatorProps"
                rounded="xl"
                border
            >
                ฝากเงิน
            </v-btn>
        </template>

        <v-card
            prepend-icon="mdi-cash-plus"
            title="ฝากเงิน"
        >
            <template v-slot:text>
                <div v-if="!loadQR">
                    <v-text-field
                        v-model="deposit.amount"
                        :counter="1"
                        :rules="amountRules"
                        label="ยอดเงิน* (฿)"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="deposit.remark"
                        label="รายละเอียด (ถ้ามี)"
                    ></v-text-field>
                </div>
                <div v-else>
                    <v-sheet class="mt-3 text-center">
                        <v-progress-circular
                            v-if="!qrGet"
                            color="#880e4f"
                            indeterminate
                        ></v-progress-circular>
                        <div v-else>
                            <p class="text-center mb-2 text-h6 font-weight-bold">แสกน QR เพื่อฝากเงิน</p>
                            <v-card 
                                variant="outlined"
                                color="#1A237E"
                                class="pa-4 card-at-qrcode"
                            >
                                <QrcodeVue :value="qr.data.qrcode" size="250" level="M" />
                                <v-card-title>
                                    <p class="text-center">
                                        <span class="text-h4 font-weight-bold text-secondary">{{ Number(deposit.amount).toFixed(2) }}</span>
                                        <span class="text-h6 ms-2 color-secondary">บาท</span>
                                    </p>
                                    <p class="text-center text-subtitle-1">
                                        <v-icon>mdi-clock-outline</v-icon> {{ timeNow }}
                                    </p>
                                    <p class="text-center mb-1 d-none">
                                        <small class="cursor-pointer text-primary text-caption" @click="loadQR = false">
                                            <v-icon class="me-1">mdi mdi-cash-edit</v-icon>
                                            แก้ไขยอดเงิน
                                        </small>
                                    </p>
                                </v-card-title>
                                <v-card-subtitle v-if="deposit.remark">
                                    รายละเอียด : {{ deposit.remark }}
                                </v-card-subtitle>
                                
                                <v-card-text>
                                    <v-sheet
                                        border="md"
                                        class="pa-6 text-white mx-auto"
                                        color="#141518"
                                        max-width="400"
                                        rounded="2"
                                    >
                                    <p class="mb-0">ห้ามใช้ QR ซ้ำ สแกน 1 ครั้ง ต่อ 1 QR เท่านั้น ไม่เช่นนั้นยอดเงินจะไม่เข้า</p>
                                    </v-sheet>
                                </v-card-text>

                                <p class="border-b font-weight-bold" style="color: #B71C1C;">โอนเสร็จกดยืนยันการโอน</p>
                                <template v-slot:actions>
                                    <v-btn
                                        :disabled="depositConfirm"
                                        :loading="depositConfirm"
                                        class="text-none mb-4"
                                        color="indigo-darken-3"
                                        size="x-large"
                                        variant="flat"
                                        elevation="16"
                                        block
                                        @click="checkDeposit()"
                                    >
                                        ยืนยันการโอน
                                    </v-btn>
                                </template>
                            </v-card>
                        </div>
                        
                    </v-sheet>
                </div>
            </template>

            <template v-slot:actions>
                <v-divider></v-divider>

                <v-btn 
                    v-if="!loadQR" 
                    @click="getDeposit">
                    ยืนยัน
                </v-btn>

                <v-btn 
                    color="#C62828"
                    @click="clearDialog" 
                >
                    ยกเลิก
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'
const props = defineProps(['username'])
const emit = defineEmits(['toUpdateWallet'])
const loadQR = ref(false)
const qr = ref()
const qrGet = ref(false)
const dialog = ref(false)
const deposit = ref({ amount: '', remark: '' })
const depositConfirm = ref(false)
const timeNow = ref()
const amountRules = [
            v => {
                if (v?.length > 0 && /[0-9-]+/.test(v)) return true
                return 'กรุณาระบุยอดเงิน'
            }
        ]

async function getDeposit() {
    const v = await frmValid(deposit.value.amount)
    if(v) {
        loadQR.value = true
        qrGet.value = false
        try{
            qr.value = await $fetch('/api/payment/deposit', {
                method: 'POST',
                body: {
                    "username": props.username,
                    "amount": deposit.value.amount,
                    "remark": deposit.value.remark
                }
            })
            qrGet.value = true
            const today = new Date()
            timeNow.value = `${today.getHours()}:${String(today.getMinutes()).padStart(2, '0')}`
            // console.log(qr.value)
        }
        catch(error) {
            console.log(error)
        }
    }
}

async function frmValid(v) {
    if(v.length > 0 && /[0-9-]+/.test(v)) return true
    return false
}

async function checkDeposit() {
    try {
        depositConfirm.value = true
        const res = await $fetch('/api/payment/depositCheck', {
            method: 'POST',
            body: {
                "username": props.username,
                "depositId": qr.value.data.depositId
            }
        })

        if(res.data === 1) {
            clearDialog()
            emit('toUpdateWallet')
        }
        else depositConfirm.value = true
    }
    catch(error) {
        console.log(error)
    }
    finally {
        setTimeout(() => (depositConfirm.value = false), 2000)
    }
}

function clearDialog() {
    dialog.value = false
    loadQR.value = false
    deposit.value.amount = ''
    deposit.value.remark = ''
}
</script>

<style scoped>
.card-at-qrcode canvas {
    width: 100% !important;
    height: auto !important;
}
</style>