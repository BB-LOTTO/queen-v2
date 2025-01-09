<template>
    <v-chip-group
        v-model="lotteryTypeSelection"
        variant="tonal"
        column
        multiple
        filter
        @click="lottoTypeSelect()"
    >
        <v-chip 
            v-for="(_type, i) in props.type"
            :key="i"
            :value="_type.id"
            color="#0D47A1"
            style="height: 50px;"
            class="w-48"
            label
        >
            <p class="mb-0 d-flex align-center justify-space-between position-relative">
                <span class="lotto-type text-subtitle-1 font-weight-bold">{{ _type.name }}</span>
                <span class="text-end text-success bg-white ms-3 right-0 px-1 rounded font-weight-bold">{{ _type.multiply }}</span>
            </p>
        </v-chip>
    </v-chip-group>

    <v-row>
        <v-col cols="12" lg="9">
            <v-text-field 
                label="ค้นหาตัวเลข" 
                variant="outlined" 
                density="compact" 
                v-model="search_number"
                @keyup="numberSearch"
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
            <v-chip-group
                v-model="numberConvert"
                variant="tonal"
                column
                filter
            >
                <!-- <v-chip
                    text="กลับตัวเลข"
                    variant="outlined"
                    filter
                    @click="setNumberConvert"
                ></v-chip> -->
            </v-chip-group>
        </v-col>
    </v-row>

    <v-chip-group
        v-model="lottoSelected"
        selected-class="bg-primary"
        column
        multiple
        class="lottery-bet-chips w-100 mb-5 pb-5"
    >
        <div v-for="(ns, i) in numbers"
            class="tab-chunk-100"
        >
            <v-chip
                v-for="(n, i) in ns"
                :key="n"
                :value="n"
                ref="two_chips"
                variant="outlined"
                class="mx-2 justify-center chip-lists"
                style="width: 55px;"
                :class="chipClass[i]"
                selected-class="v-chip--selected"
                :disabled="chip_disabled || lottoSelected.includes(n)"
                @click="numberSelected(n)"
            >
                {{ n }}
            </v-chip>
        </div>
    </v-chip-group>

    <v-row v-for="(item, key) in props.type" :key="key" 
        :class="{ 'd-none' : (lotteryTypeActive.indexOf(item.id) + 1) === 0 }">
        <v-col cols="12">
            <v-card variant="tonal" color="indigo">
                <v-card-title class="d-flex align-center font-weight-bold">{{ item.name }} | จ่าย : {{ item.multiply }}</v-card-title>
                <v-card-text>
                    <v-list lines="one" density="compact" class="py-0">
                        <v-list-item class="text-start py-0 list-lotto-detail">แทงขั้นต่ำต่อครั้ง : {{ item.betMin }}</v-list-item>
                        <v-list-item class="text-start py-0 list-lotto-detail">แทงสูงสุดต่อครั้ง : {{ item.betMax }}</v-list-item>
                        <v-list-item class="text-start py-0 list-lotto-detail">แทงสูงสุดต่อเลข : {{ item.betMaxCustomer }}</v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useLotteryStore } from '~/store/lottery';
const store = useLotteryStore()

const props = defineProps(['type'])
const emit = defineEmits(['toUpdateStock'])
const type_1 = 'on'
const type_2 = 'tod'
const type_3 = 'bottom'
const type_4 = 'front'

const two_chips = ref([])
const chip_disabled = ref(true)
const number = ref(Array.from({length: 100}, (_, index) => index.toString().padStart(2, '0')))
const lotteryType = ref()

const lotteryTypeSelection = ref([])
const lotteryTypeActive = ref([])
const lottoSelected = ref([])
const search_number = ref()
const chipClass = ref([])
const chunkSize = 100
const numbers = ref([])
const numberTab = ref(0)
const numberConvert = ref()

onMounted(async () => {
    await updateChunk()
    await store.getLotteryNumber('_stock')
    await updateLotteryTwoNumber()
})

async function updateChunk() {
    for (let i = 0; i < number.value.length; i += chunkSize) {
        const chunk = number.value.slice(i, i + chunkSize)
        numbers.value.push(chunk)
    }
}

async function updateLotteryTwoNumber() {
    lottoSelected.value = []
    // const type = props.type[0].id.split('_')
    // const id = type[type.length - 1]
    const id = '2'
    store.lottoNumber.forEach((n) => {
        const _type = n.type[0].split('_')
        const _id = _type[_type.length - 1]
        if(id === _id) lottoSelected.value.push(n.number) 
    })
    updateLotteryTypeActive()
}

function numberSearch() {
    if(search_number.value.length > 0) {
        two_chips.value.forEach((chip, index) => {
            chipClass.value[index] = 'd-none'
            if(chip.value.toString().includes(search_number.value.toString())) {
                chipClass.value[index] = ''
            }
        })
    }
    else chipClass.value = []
}

function setNumberConvert() {
    numberConvert.value = numberConvert.value === 0 ? null : 0
    if(numberConvert.value !== null) {
        const t = lotteryTypeSelection.value.findIndex(l => { return l === type_2 })
        if(t >= 0) {
            lotteryTypeSelection.value.splice(t, 1)
            lottoTypeSelect()
        }
    }
}

function lottoTypeSelect() {
    if(lotteryTypeSelection.value.length > 0) {
        chip_disabled.value = false
        const t = lotteryTypeSelection.value.findIndex(l => { return l === type_2 })
        if(t >= 0) numberConvert.value = null
    }
    else {
        chip_disabled.value = true
    }
}

async function numberSelected(_n) {
    await store.updateNumberSelect('_stock', lotteryTypeSelection.value, _n, numberConvert.value)
    updateLotteryTypeActive()
    emit('toUpdateStock')

    // let num = String(_n).split('').map((n) => { return Number(n) })
    // // num = num.filter((n, i) => { return num.indexOf(n) === i })
    // const array = Array.apply(Array, { length: 3}).map(function (_, i) {
    //     return Array.apply(Array, { length: 3}).map(function (__, j) {
    //         return num[(i + j) % 3]
    //     })
    // })

    // console.log(array)
}

function updateLotteryTypeActive() {
    lotteryTypeActive.value = []
    store.lottoNumber.forEach((n) => { 
        n.type.map(type => { 
            if((lotteryTypeActive.value.indexOf(type)+1) === 0) {
                lotteryTypeActive.value.push(type)
            }
        })
    })
}

defineExpose({
    updateLotteryTwoNumber
})
</script>

<style scoped>
    .d-none {
        display: none;
    }
    .lottery-selected-list-show .v-list-item {
        min-height: 0;
    }
    .text-danger {
        color: #B71C1C;
    }
    .w--100 {
        width: 100px;
    }
    .right-0 {
        right: 0;
    }
    .list-lotto-detail {
        min-height: 22px !important;
        padding-inline: 8px !important;
    }
    .w-48 {
        width: 48%;
    }
    .v-chip--selected {
        opacity: 1;
    }
</style>