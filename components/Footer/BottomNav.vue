<template>
    <v-bottom-navigation
        v-if="status === 'authenticated'"
        color="pink-lighten-1"
        class="d-md-none"
        grow
    >
        <!-- <v-btn to="/">
            <v-icon>mdi-home-variant-outline</v-icon>
            หน้าหลัก
        </v-btn>

        <v-btn to="/games">
            <v-icon>mdi-gamepad-variant-outline</v-icon>
            เกม
        </v-btn> -->

        <v-btn to="/lottery/bet">
            <v-icon>mdi-slot-machine-outline</v-icon>
            หวย
        </v-btn>

        <!-- <v-btn to="/dashboard/wallet">
            <v-icon>mdi-credit-card-check-outline</v-icon>
            ฝาก-ถอน
        </v-btn> -->

        <v-btn @click="emit('toMoreMenu')" variant="plain" color="#333">
            <v-icon>mdi-dots-vertical</v-icon>
            เพิ่มเติม
        </v-btn>
    </v-bottom-navigation>

    <v-bottom-navigation
        v-else
        color="pink-lighten-1"
        class="d-md-none"
        grow
    >
        <v-btn to="/register">
            <span class="text-subtitle-1">
                <v-icon>mdi-account-plus-outline</v-icon>
                สมัครสมาชิก
            </span>
        </v-btn>

        <v-btn to="/login">
            <span class="text-subtitle-1">
                <v-icon>mdi-login-variant</v-icon>
                เข้าสู่ระบบ
            </span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup>
const { status, signOut } = useAuth()
const emit = defineEmits(['toMoreMenu'])

watch(status, (_status) => {
    if(_status === 'unauthenticated') signOut
})
</script>