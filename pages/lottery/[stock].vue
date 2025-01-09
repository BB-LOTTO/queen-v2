<template>
    <v-card>
        <template v-slot:title>
            <h2 class="text-mitr-400">{{ route.params.stock }}</h2>
        </template>

        <template v-slot:text>
            <LotteryStockSelect></LotteryStockSelect>
        </template>
    </v-card>
</template>

<script setup>
import { useLotteryStore } from '~/store/lottery';
const route = useRoute()
const store = useLotteryStore()

</script>