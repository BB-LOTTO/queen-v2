<template>
        <div class="web-logo py-2 d-block d-lg-none text-center">
            <LogoDefault class="web-logo-default"/>
        </div>

        <div class="user-list-leftbar">
            <v-list lines="one" class="mb-3 rounded-xl">
                <v-list-item prepend-icon="mdi-account-circle" title="ชื่อผู้ใช้">
                    <template v-slot:append>
                        <p class="font-weight-bold">{{ user.username }}</p>
                    </template>
                </v-list-item>

                <v-list-item prepend-icon="mdi-card-account-details-outline" title="ระดับ">
                    <template v-slot:append>
                        <p class="font-weight-bold">{{ user.userLevel }}</p>
                    </template>
                </v-list-item>

                <v-list-item prepend-icon="mdi-credit-card-outline" title="ยอดเงิน">
                    <template v-slot:append>
                        <p class="font-weight-bold">
                            <span class="text-success">{{ $numberFormat(user.userFunds.balance) }}</span> ฿
                        </p>
                    </template>
                </v-list-item>

                <!-- <v-list-item>
                    <v-row class="user-actions">
                        <v-col cols="6" class="text-center pb-0">
                            <v-btn variant="tonal" color="#c6137f" prepend-icon="mdi-account" block to="/dashboard/profile" @click="isOnMobile">
                                <small>ข้อมูลผู้ใช้</small>
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="text-center pb-0">
                            <v-btn variant="tonal" color="#c6137f" prepend-icon="mdi-wallet" block to="/dashboard/wallet" @click="isOnMobile">
                                <small>กระเป๋าเงิน</small>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <v-dialog
                                v-model="_signOut"
                                max-width="400"
                                persistent
                            >
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn v-bind="activatorProps" 
                                        variant="tonal" 
                                        color="#c6137f" 
                                        prepend-icon="mdi-logout" 
                                        block
                                    >
                                        <small>ออกจากระบบ</small>
                                    </v-btn>
                                </template>
                                <v-card
                                    prepend-icon="mdi-logout"
                                    text="ยืนยันการออกจากระบบ..."
                                    title="ออกจากระบบ?"
                                >
                                    <template v-slot:actions>
                                        <v-spacer></v-spacer>

                                        <v-btn @click="logout">
                                            <span class="text-danger">ยืนยัน</span>
                                        </v-btn>

                                        <v-btn @click="_signOut = false">
                                            ยกเลิก
                                        </v-btn>
                                    </template>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-list-item> -->
            </v-list>

            <v-divider class="d-block d-lg-none"></v-divider>

            <v-list lines="one" class="mb-3 rounded-xl" color="#c6137f">
                <v-list-item prepend-icon="mdi-invoice-text-multiple-outline" title="โพยหวย" class="list-item-trade-sidebar" to="/lottery/bill" @click="isOnMobile"></v-list-item>
                <v-list-item prepend-icon="mdi-text-box-search-outline" class="list-item-trade-sidebar" title="ตรวจรางวัล"></v-list-item>
                <v-list-item prepend-icon="mdi-alert-octagon-outline" class="list-item-trade-sidebar" title="กฎกติกา" to="/rule" @click="isOnMobile"></v-list-item>
            </v-list>
        </div>
</template>

<script setup>
const { signOut, data } = useAuth()
const user = data.value.user
const isLogged = ref(data.value)

const drawer = ref(null)
const isMobile = ref(null)
const _signOut = ref(false)
let mql

watch(isLogged, (change) => {
    if(change) signOut
})

onMounted(() => {
    mql = window.matchMedia('(max-width: 960px)')
    drawer.value = !mql.matches
    isMobile.value = mql.matches
    mql.addEventListener('change', handleMqlChange)
})

onUnmounted(() => {
    mql.removeEventListener('change', handleMqlChange)
})

function handleMqlChange(e) {
    drawer.value = !e.matches
    isMobile.value = e.matches
}

function isOnMobile() {
    if(isMobile.value) drawer.value = !drawer.value
}

async function logout() {
    await signOut({
        callbackUrl: '/login',
        redirect: true
    })
}
</script>

<style scoped>
.list-item-trade-sidebar:hover {
    background: #FCE4EC;
    --v-hover-opacity: 0;
    color: #333;
}
</style>