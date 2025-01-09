<template>
    <v-card class="card-bill-detail">
        <template v-slot:title>
            <div class="d-flex flex-column justify-space-between mb-1 align-start flex-lg-row align-lg-end">
                <div class="d-flex flex-row align-end align-lg-start flex-lg-column" style="line-height: 10px;">
                    <h5 class="mb-0 text-h5 font-weight-medium">{{ props.billHeader.type }}</h5>
                    <small class="text-subtitle-2 ms-2 ms-lg-0">งวดวันที่ {{ props.billHeader.date }}</small>
                </div>
                <div class="text-start text-lg-end mt-2 mt-lg-0 w-100" style="line-height: 10px;">
                    <v-divider class="mb-2 d-block d-lg-none"></v-divider>
                    <p class="mb-0 text-caption">เลขที่ 
                        <span class="font-weight-bold text-pink-lighten-2">{{ props.billHeader.billId }}</span>
                    </p>
                    <small class="text-body-2 me-0">วันที่ทำรายการ {{ props.billHeader.dateTime }}</small>
                </div>
            </div>
            <v-card variant="tonal" color="#c6137f" class="mb-3 py-4">
                <v-card-text>
                    <v-row>
                        <v-col cols="6" class="text-center text-grey-darken-4">
                            <p class="text-h5 text-lg-h3">
                                <strong class="text-grey-darken-4 text-mitr">{{ $numberFormat(props.billHeader.amount) }}</strong>
                                <small class="text-subtitle-1">฿</small>
                            </p>
                            <p class="subtitle-1">ยอดแทง</p>
                        </v-col>
                        <v-col cols="6" class="text-center text-grey-darken-4">
                            <p v-if="props.billHeader.status === '0'" class="text-h5 mt-2 mt-lg-4">
                                รอสรุปผล
                            </p>
                            <p v-else-if="props.billHeader.status === '1'" class="text-h5 text-lg-h3">
                                <strong class="text-danger text-mitr">
                                    {{ props.billHeader.sumResult === null ? 
                                        `-${$numberFormat(props.billHeader.amount)}` : 
                                        $numberFormat(props.billHeader.sumResult) 
                                    }}
                                </strong>
                                <small class="text-subtitle-1">฿</small>
                            </p>
                            <p v-if="props.billHeader.status === '1'" class="subtitle-1">ผลได้เสีย</p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </template>
        <template v-slot:text>
            <v-data-iterator :items="setBillDetail()" :page="page" :items-per-page="itemsPerPage">
                <template v-slot:default="{ items }">
                    <template
                        v-for="(item, i) in items"
                        :key="i"
                    >
                        <v-card
                            variant="flat"
                            color="grey-lighten-3"
                            class="mb-3"
                        >
                            <v-card-text>
                                <v-row class="border-b">
                                    <v-col cols="12" class="d-flex justify-space-between">
                                        <div class="mb-0">#{{ item.raw.sort }}</div>
                                        <div class="mb-0">
                                            สถานะ : 
                                            <span 
                                                :class="[item.raw.status === '1' ? 'text-success text-decoration-underline' : '']" 
                                                class="font-weight-bold"
                                            >
                                                {{ status(item.raw.status) }}
                                            </span>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6" lg="4" class="text-center border-e">
                                        <p class="subtitle-1">{{ setBetTag(item.raw.betTagId) }}</p>
                                        <p class="text-h4 text-mitr font-weight-bold">{{ item.raw.numbers }}</p>
                                    </v-col>
                                    <v-col cols="6" lg="4" class="text-center">
                                        <p class="subtitle-1">เลขที่ออก</p>
                                        <p class="text-h4 text-mitr">{{ item.raw.status !== '0' ? item.raw.numbers : '-' }}</p>
                                    </v-col>
                                    <v-col cols="12" lg="4">
                                        <v-divider class="mb-2 d-block d-lg-none"></v-divider>
                                        <div class="d-flex justify-space-around justify-lg-space-between border-b border-dashed border-t-0 border-s-0 border-e-0 -result-amount">
                                            <p class="mb-0">ราคาจ่าย</p>
                                            <p class="mb-0">{{ $numberFormat(item.raw.predict) }}<span class="ms-1">฿</span></p>
                                        </div>
                                        <div class="d-flex justify-space-around justify-lg-space-between border-b border-dashed border-t-0 border-s-0 border-e-0 -result-amount">
                                            <p class="mb-0">ราคาแทง</p>
                                            <p class="mb-0">{{ $numberFormat(item.raw.amount) }}<span class="ms-1">฿</span></p>
                                        </div>
                                        <div class="d-flex justify-space-around justify-lg-space-between border-b border-dashed border-t-0 border-s-0 border-e-0 -result-amount">
                                            <p class="mb-0">ผลได้เสีย</p>
                                            <p v-if="item.raw.status === '0'" class="mb-0">-</p>
                                            <p v-else-if="item.raw.status === '1'" class="mb-0 text-success">{{ $numberFormat(item.raw.payout) }}<span class="ms-1">฿</span></p>
                                            <p v-else-if="item.raw.status === '2'" class="mb-0 text-danger">-{{ $numberFormat(item.raw.amount) }}<span class="ms-1">฿</span></p>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                    </template>
                </template>

                <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                    <div class="d-flex align-center justify-end pa-4">
                        <v-btn
                            :disabled="page === 1"
                            density="comfortable"
                            icon="mdi-arrow-left"
                            variant="tonal"
                            rounded
                            @click="prevPage"
                        ></v-btn>

                        <div class="mx-2 text-caption">
                            หน้า <strong>{{ page }}</strong> จากทั้งหมด <strong>{{ pageCount }}</strong> หน้า
                        </div>

                        <v-btn
                            :disabled="page >= pageCount"
                            density="comfortable"
                            icon="mdi-arrow-right"
                            variant="tonal"
                            rounded
                            @click="nextPage"
                        ></v-btn>
                    </div>
                </template>
            </v-data-iterator>
        </template>
        <v-card-actions>
            <v-spacer></v-spacer>
        
            <v-btn
                text="ปิด"
                variant="text"
                @click="emit('billDetailClose')"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import lottoList from '../../assets/json/lotto-list.json'
import numberStatus from '../../assets/json/number-status.json'
import sample from '../../assets/json/sample/lotto.json'

const props = defineProps(['billDetail', 'billHeader'])
const emit = defineEmits(['billDetailClose'])
const page = ref(1)
const itemsPerPage = ref(4)
const pageCount = ref(props.billDetail.length)

const setBetTag = (tag) => {
    const _lotto = lottoList.find(l => { return l.index === tag })
    return _lotto ? _lotto.name : tag
}
const status = (status) => {
    const _status = numberStatus.find(s => { return s.status === status })
    return _status ? _status.text : status
}
const setBillDetail = () => {
    let _bills = props.billDetail
    _bills.forEach((b, i) => { _bills[i].sort = i+1 })
    return _bills
}
</script>

<style scoped>
.detail-number .v-list-item:last-child span.number-space {
    display: none;
}
.detail-number-list {
    min-height: 30px;
}
.-result-amount {
    padding: 1px 0;
}

/* Scrollbars Style */
.card-bill-detail::-webkit-scrollbar {
  width: 7px;
}
.card-bill-detail::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}
.card-bill-detail::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 5px;
}
.card-bill-detail::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>