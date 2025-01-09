<template>
    <v-tabs
        v-model="tab"
        align-tabs="end"
        color="#6A1B9A"
    >
        <v-tab :value="1">เลือกจากแผง</v-tab>
        <v-tab :value="2">ใส่เลขเอง</v-tab>
    </v-tabs>
    <v-window v-model="tab">
        <v-window-item :value="1">
            <LotteryStockSelect></LotteryStockSelect>
        </v-window-item>
        <v-window-item :value="2">
            222222222222222
        </v-window-item>
    </v-window>
</template>

<script setup>
const tab = ref(null)
</script>