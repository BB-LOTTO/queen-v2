<template>
    <v-row v-if="status === 'unauthenticated'">
        <v-col cols="4"></v-col>
        <v-col cols="4" class="d-none d-lg-flex align-center">
            <v-btn
                class="text-none text-white rounded-xl"
                color="#c6137f"
                variant="outlined"
                block
                to="/register"
            >
                สมัครสมาชิก
            </v-btn>
        </v-col>
        <v-col cols="4" class="d-none d-lg-flex align-center">
            <v-btn
                class="text-none text-white rounded-xl"
                color="#c6137f"
                variant="flat"
                block
                to="/login"
            >
                เข้าสู่ระบบ
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="status === 'authenticated'">
        <v-col cols="10">
            <v-list density="compact" bg-color="transparent" class="main-menu-desktop">
                <div class="d-flex justify-end">
                    <!-- <v-list-item to="/" class="rounded-xl">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-home-variant-outline"></v-icon>
                        </template>
                        <v-list-item-title>หน้าหลัก</v-list-item-title>
                    </v-list-item> -->

                    <!-- <v-list-item to="/games" class="rounded-xl">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-gamepad-variant-outline"></v-icon>
                        </template>
                        <v-list-item-title>เกม</v-list-item-title>
                    </v-list-item> -->

                    <v-list-item to="/lottery/bet" class="rounded-xl">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-slot-machine-outline"></v-icon>
                        </template>
                        <v-list-item-title>หวย</v-list-item-title>
                    </v-list-item>

                    <!-- <v-list-item to="/dashboard/wallet" class="rounded-xl">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-credit-card-check-outline"></v-icon>
                        </template>
                        <v-list-item-title>ฝาก-ถอน</v-list-item-title>
                    </v-list-item> -->

                    <v-list-item to="/dashboard/profile" class="rounded-xl">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-account-circle"></v-icon>
                        </template>
                        <v-list-item-title>ข้อมูลผู้ใช้</v-list-item-title>
                    </v-list-item>
                </div>
            </v-list>
        </v-col>
    </v-row>
</template>

<script setup>
const { status } = useAuth()
</script>