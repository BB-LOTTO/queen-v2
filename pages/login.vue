<template>
    <Head>
        <Title>เข้าสู่ระบบ - {{ useRuntimeConfig().public.webName }}</Title>
    </Head>
    <v-card
        :loading="isSignin"
        class="mx-auto pa-3 pb-5 mt-5 pt-0"
        color="#F5F5F5"
        max-width="420"
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
            src="/banner/partner-yggdrasil.jpg"
            cover
            rounded
        >
        </v-img>

        <v-form ref="form" @submit.prevent="handleLogin">
            <v-container>
                <v-row dense>
                    <v-col cols="12">
                        <h2 class="text-mitr text-pink-accent-4">เข้าสู่ระบบ</h2>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="user.username"
                            :disabled="isSignin"
                            :rules="usernameRules"
                            color="blue-grey-lighten-2"
                            label="ชื่อผู้ใช้"
                            variant="underlined"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            type="password"
                            v-model="user.password"
                            :disabled="isSignin"
                            :rules="passwordRules"
                            color="blue-grey-lighten-2"
                            label="รหัสผ่าน"
                            variant="underlined"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        
            <small v-if="_fail" class="d-block text-center mb-1" style="color: #B71C1C;">ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง</small>

            <v-card-actions class="justify-center">
                <v-row>
                    <v-col cols="12" class="text-center">
                        <v-btn
                            type="submit"
                            variant="tonal"
                            :disabled="isSignin"
                            :loading="isSignin"
                            :variant="isSignin ? 'tonal' : undefined"
                            color="#B71C1C"
                            block
                        >
                            เข้าสู่ระบบ
                        </v-btn>
                    </v-col>

                    <v-col cols="12" class="text-center py-0">
                        <v-btn
                            href="/register"
                            class="ms-0"
                            :disabled="isSignin"
                            :loading="isSignin"
                            variant="plain"
                            color="#333"
                            append-icon="mdi-chevron-right"
                        >
                            ยังไม่มีบัญชีเข้าใช้งาน?
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-form>
    </v-card>

    <v-snackbar
        v-model="_singUp"
        :timeout="4000"
        location="center right"
        elevation="24"
        color="primary"
    >
        คุณได้สมัครสมาชิกเรียบร้อยแล้ว...
    </v-snackbar>
</template>

<script setup>
definePageMeta({
    middleware: 'guest'
})
const route = useRoute()

onMounted(() => {
    if(route.query.signUp === 'success') { _singUp.value = true }
})

const { signIn } = useAuth()
const isSignin = ref(false)
const _fail = ref(false)
const _singUp = ref(false)
const user = ref({username: '', password: ''})
const form = ref(null)
const usernameRules = [
            v => !!v || 'กรุณาระบุชื่อผู้ใช้',
        ]
const passwordRules = [
            v => !!v || 'กรุณาระบุรหัสผ่าน',
        ]

async function handleLogin() {
    const { valid } = await form.value.validate()
    if(valid) {
        isSignin.value = true
        try{
            await signIn(user.value, { callbackUrl: '/dashboard/profile' })
            user.value.username = user.value.password = ''
            _fail.value = false
            const _tp = useCookie('_tp')
            _tp.value = '1'
        }
        catch(e) {
            _fail.value = true
        }
        isSignin.value = false
    }
}
</script>