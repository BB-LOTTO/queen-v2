<template>
    <v-row>
        <v-col cols="12" md="12" class="cursor-pointer">
            <lottery-card-v1 title="รางวัลสลากกินแบ่งรัฐบาล" icon="/icon/thai_lottery.png"></lottery-card-v1>
        </v-col>

        <v-col cols="12" md="12" class="cursor-pointer d-none">
            <lottery-card-v1 title="สลากออมทรัพย์ ธกส" icon="/icon/agricultural.png"></lottery-card-v1>
        </v-col>

    </v-row>

    <v-row class="d-none">
        <v-col>
            <lottery-set-lotto></lottery-set-lotto>
        </v-col>
    </v-row>
</template>

