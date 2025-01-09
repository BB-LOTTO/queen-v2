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
                ถอนเงิน
            </v-btn>
        </template>

        <v-form ref="form">
            <v-card
                prepend-icon="mdi-cash-minus"
                title="ถอนเงิน"
            >
                <template v-slot:text>
                    <v-text-field
                        v-model="withdraw.amount"
                        :counter="1"
                        :rules="amountRules"
                        label="ยอดเงิน* (฿)"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="withdraw.remark"
                        label="รายละเอียด (ถ้ามี)"
                    ></v-text-field>
                </template>

                <template v-slot:actions>
                    <v-divider></v-divider>

                    <v-btn 
                        @click="getWithdraw"
                    >
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
        </v-form>
    </v-dialog>
</template>

<script setup>
const props = defineProps(['username', 'balance'])
const emit = defineEmits(['toUpdateWallet', 'toUpdateWithdraw'])
const dialog = ref(false)
const form = ref(null)
const withdraw = ref({ amount: '', remark: '' })
const amountRules = [
                v => v?.length > 0 && /[0-9-]+/.test(v) || 'กรุณาระบุยอดเงิน',
                v => v && v <= props.balance || `ยอดถอนของคุณเกินจำนวนเงินที่คุณมี (${props.balance})`,
                v => v && !v.includes('.') || 'ยอดเงินต้องเป็นจำนวนเต็มเท่านั้น'
        ]

async function getWithdraw() {
    const { valid } = await form.value.validate()
    if(valid) {
        try{
            const res = await $fetch('/api/payment/withdraw', {
                method: 'POST',
                body: {
                    "username": props.username,
                    "amount": withdraw.value.amount,
                    "remark": withdraw.value.remark
                }
            })
            
            if(res) {
                dialog.value = false
                emit('toUpdateWallet')
                emit('toUpdateWithdraw')
            }
        }
        catch(error) {
            console.log(error)
        }
        finally {
            withdraw.value.amount = ''
            withdraw.value.remark = ''
        }
    }
}

function clearDialog() {
    dialog.value = false
    withdraw.value.amount = ''
    withdraw.value.remark = ''
}
</script>