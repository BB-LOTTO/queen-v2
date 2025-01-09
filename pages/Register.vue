<template>
    <v-card
        :loading="isSignup"
        class="mx-auto pa-3 pb-5 mt-5 pt-0"
        color="#F5F5F5"
        max-width="900"
        elevation="8"
    >
        <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                color="#B71C1C"
                height="4"
                indeterminate
            ></v-progress-linear>
        </template>

        <v-btn variant="plain"
            href="/"
            prepend-icon="mdi-home-circle-outline"
            class="ps-0"
        >
            กลับหน้าหลัก
        </v-btn>

        <v-img
            height="240"
            src="/banner/partner-spribe.jpg"
            rounded
            cover
        >
        </v-img>

        <div v-if="!_isAuthen()">
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <h2 class="text-mitr text-pink-accent-4">สมัครสมาชิก</h2>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row dense class="border rounded pa-3">
                                <v-col cols="12">
                                    <h4 class="text-mitr">บัญชีผู้ใช้งาน</h4>
                                </v-col>
                                
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="user.mobile"
                                        :disabled="isSignup"
                                        :rules="mobileRules"
                                        type="number"
                                        color="blue-grey-lighten-2"
                                        label="หมายเลขโทรศัพท์มือถือ"
                                        variant="underlined"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        :type="visible.p ? 'text' : 'password'"
                                        :append-inner-icon="visible.p ? 'mdi-eye-off' : 'mdi-eye'"
                                        v-model="user.password"
                                        :disabled="isSignup"
                                        :rules="passwordRules.concat([validatePasswordPattern, validatePasswordNonCharecter])"
                                        color="blue-grey-lighten-2"
                                        label="รหัสผ่าน ( ตัวเลขและตัวอักษร 6 ตัวขึ้นไป )"
                                        variant="underlined"
                                        @click:append-inner="visible.p = !visible.p"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        :type="visible.c ? 'text' : 'password'"
                                        :append-inner-icon="visible.c ? 'mdi-eye-off' : 'mdi-eye'"
                                        v-model="user.confirm_password"
                                        :disabled="isSignup"
                                        :rules="cPasswordRules.concat(validateConfirmPassword)"
                                        color="blue-grey-lighten-2"
                                        label="ยืนยันรหัสผ่าน"
                                        variant="underlined"
                                        @click:append-inner="visible.c = !visible.c"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row dense class="border rounded pa-3">
                                <v-col cols="12">
                                    <h4 class="text-mitr">ข้อมูลส่วนตัว</h4>
                                </v-col>
                                
                                <v-col cols="12">
                                    <v-select
                                        v-model="bank.bankId"
                                        :disabled="isSignup"
                                        :rules="bankNameRule"
                                        :items="bankList"
                                        :item-props="bankProps"
                                        item-value="id"
                                        label="ธนาคาร"
                                        variant="underlined"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        v-model="bank.bankAcc"
                                        :disabled="isSignup"
                                        :rules="bankAccountRule"
                                        color="blue-grey-lighten-2"
                                        label="ชื่อบัญชีธนาคาร"
                                        variant="underlined"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        v-model="bank.bankNo"
                                        :disabled="isSignup"
                                        :rules="bankNumberRule"
                                        color="blue-grey-lighten-2"
                                        label="เลขที่บัญชี (ตัวเลขเท่านั้น)"
                                        variant="underlined"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>

            <small v-if="_fail" class="d-block text-center mb-1" style="color: #B71C1C;">เกิดข้อผิดพลาด กรุณาลองใหม่...</small>
            <v-divider></v-divider>

            <v-card-actions class="justify-space-between">
                <v-btn
                    href="/login"
                    class="ms-0"
                    variant="plain"
                    color="#333"
                    prepend-icon="mdi-chevron-left"
                >
                    เข้าสู่ระบบ?
                </v-btn>
                <v-btn
                    variant="tonal"
                    :disabled="isSignup"
                    :loading="isSignup"
                    :variant="isSignup ? 'tonal' : undefined"
                    color="#B71C1C"
                    @click="signup"
                >
                    สมัครสมาชิก
                </v-btn>
            </v-card-actions>
        </div>

        <div v-else>
            <v-card-text>
                Hello : {{ store._username }}
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn
                    :disabled="isSignup"
                    :loading="isSignup"
                    :variant="isSignup ? 'tonal' : undefined"
                    color="#B71C1C"
                    @click="signout"
                >
                    ออกจากระบบ
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script setup>
definePageMeta({
    middleware: 'guest'
})

onMounted(() => {
    getBank()
})

import { useAuthenStore } from '@/store/authen'
const store = useAuthenStore()

const { signUp } = useAuth()

store.isAuthen()
const isSignup = ref(false)
const _fail = ref(false)
const visible = ref({p: false, c: false})
const user = ref({ mobile: '', password: '', confirm_password: '' })
const bank = ref({ bankId: '', bankAcc: '', bankNo: ''})
const form = ref(null)
const bankList = ref([])
const mobileRules = [
            v => !!v || 'ต้องใส่หมายเลขโทรศัพท์',
            v => (v && v.length === 10) || 'หมายเลขโทรศัพท์ต้องมี 10 หลัก'
        ]
const passwordRules = [
            v => !!v || 'ต้องใส่รหัสผ่าน',
            v => (v && v.length >= 6) || 'รหัสผ่านต้องมากกว่า หรือ เท่ากับ 6 ตัว'
        ]
const cPasswordRules = [
            v => !!v || 'กรุณายืนยันรหัสผ่าน',
        ]
const bankNameRule = [
            v => !!v || 'กรุณาเลือกธนาคาร',
        ]
const bankAccountRule = [
            v => !!v || 'กรุณาระบุชื่อบัญชี',
        ]
const bankNumberRule = [
            v => !!v || 'กรุณาระบุเลขที่บัญชี',
            v => (v && v.search('-') < 0) || 'ไม่ต้องใส่ - ',
            v => (v && /^\d+$/.test(v)) || 'ตัวเลขเท่านั้น',
            v => (v && v.length === 10) || 'หมายบัญชีต้องมี 10 หลัก'
        ]

function validateConfirmPassword(value) {
    return (value === user.value.password) || "รหัสผ่านไม่ตรงกัน..."
}
function validatePasswordPattern(value) {
    let num = value.replace(/[^0-9]/g, "")
    let cha = value.replace(/[^A-Za-z]/g, "")
    return (num !== '' && cha !== '') || 'รหัสผ่านจะต้องประกอบด้วยตัวเลขและตัวอักษรภาษาอังกฤษ 6 ตัวขึ้นไป'
}
function validatePasswordNonCharecter(value) {
    let non = value.replace(/\W/g, '@')
    return (non.search('@') < 0) || 'รหัสผ่านจะต้องประกอบด้วยตัวเลข และ ภาษาอังกฤษ เท่านั้น...'
}

async function signup() {
    const { valid } = await form.value.validate()
    if (valid){
        isSignup.value = true
        const _user = {
            username: user.value.mobile,
            password: {
                password: user.value.password,
                confirm: user.value.confirm_password
            },
            bankId: bank.value.bankId,
            bankAccount: bank.value.bankAcc,
            bankNumber: setBankNumber(bank.value.bankNo)
        }

        try {
            await signUp(_user, { callbackUrl: '/login', redirect: true }, { preventLoginFlow: true })
            user.value.mobile = user.value.username = user.value.password = user.value.confirm_password = ''
            bank.value.bankId = bank.value.bankAcc = bank.value.bankNo = ''
            _fail.value = false
            await navigateTo({
                path: '/login',
                query: {
                    signUp: 'success'
                }
            })
        }
        catch(error) {
            _fail.value = true
            console.log(error)
        }
        isSignup.value = false
    }
}

function setBankNumber(bNumber) {
    const _p = [3, 5, 11]
    let n = bNumber
    _p.forEach((p) => { n = n.slice(0, p) + '-' + n.slice(p) })
    return n
}

const _isAuthen = () => {
    if(store._isAuth) {
        isSignup.value = false
    }
    return store._isAuth
}

const bankProps = (bank) => {
    return {
        title: bank.bankNameTh,
        subtitle: bank.bankNameEn,
    }
}

async function getBank() {
    try {
        const res = await $fetch('/api/bank/findAll')
        bankList.value = res.data
    }
    catch (error) {
        console.log(error)
    }
}

async function signout() {
    store.logout()
}
</script>