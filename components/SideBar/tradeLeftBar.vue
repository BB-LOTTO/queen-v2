<template>
        <div class="web-logo py-2 d-block d-lg-none text-center">
            <LogoDefault class="web-logo-default"/>
        </div>

        <div class="user-list-leftbar">
            <v-list lines="one" class="mb-3 rounded-xl">
                <v-list-item prepend-icon="mdi-account-circle" title="ชื่อผู้ใช้">
                    <template v-slot:append>
                        <p class="font-weight-bold">{{ profile.name || '-' }}</p>
                    </template>
                </v-list-item>

                <v-list-item prepend-icon="mdi-credit-card-outline" title="ยอดเงิน">
                    <template v-slot:append>
                        <p class="font-weight-bold">
                            <span class="text-success">{{ $numberFormat(_balance) }}</span> ฿
                        </p>
                    </template>
                </v-list-item>

            </v-list>

            <v-divider class="d-block d-lg-none"></v-divider>

            <v-list lines="one" class="mb-3 rounded-xl" color="#c6137f">
                <v-list-item prepend-icon="mdi-invoice-text-multiple-outline" title="โพยหวย" class="list-item-trade-sidebar" to="/lottery/bill" @click="isOnMobile"></v-list-item>
                <v-list-item prepend-icon="mdi-text-box-search-outline" class="list-item-trade-sidebar" title="ตรวจรางวัล" to="/lottery/result"></v-list-item>
                <v-list-item prepend-icon="mdi-alert-octagon-outline" class="list-item-trade-sidebar" title="กฎกติกา" to="/rule" @click="isOnMobile"></v-list-item>
            </v-list>
        </div>
</template>

<script setup>
const { signOut, data } = useAuth()
const user = data.value.user
const profile = data.value.user.userProfile
const isLogged = ref(data.value)
const _balance = await useBalance(user.username)

const drawer = ref(null)
const isMobile = ref(null)
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

async function getBalance() {
    try {
        const res = await $fetch('/api/balance/getBalance', {
            query: {
                "user" : user.username
            }
        })

        console.log(res)
    } catch(error) {
        console.log(error)
    }
}
</script>

<style scoped>
.list-item-trade-sidebar:hover {
    background: #FCE4EC;
    --v-hover-opacity: 0;
    color: #333;
}
</style>