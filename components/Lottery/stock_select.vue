<template>
    <!-- <v-menu
        min-width="200px"
        :close-on-content-click="false"
        rounded
    >
        <template v-slot:activator="{ props }">
            <div class="lotto-basket">
                <v-badge color="error" :content="_stock_count">
                    <v-btn
                        icon
                        v-bind="props"
                    >
                        <v-avatar
                            color="#880e4f"
                            size="large"
                        >
                            <v-icon>mdi-basket-outline</v-icon>
                        </v-avatar>
                    </v-btn>
                </v-badge>
            </div>
        </template>
        <v-card min-width="240">
            <template v-slot:title>
                <h4 class="text-mitr-400">รายการที่เลือก</h4>
            </template>

            <template v-slot:subtitle>
                <p v-if="_stock_count > 0" class="mb-0 font-weight-bold d-flex justify-space-between">
                    <span class="ms-1">{{ _stock_count }} รายการ</span>
                    <span class="text-danger ms-4 cursor-pointer" @click="clearNumber">
                        <v-icon icon="mdi-delete-circle-outline"></v-icon>
                        ล้างทั้งหมด
                    </span>
                </p>
                <p v-else>ไม่มีรายการ...</p>
            </template>
            
            <template v-slot:text>
                <v-list 
                    lines="one" 
                    density="compact"
                    class="lottery-selected-list-show"
                >
                    <div v-for="(_s, _i) in _stock" :key="_i">
                        <div v-if="_s.length > 0" class="mb-3">
                            <v-sheet class="font-weight-bold">
                                3 {{ _stock_type[_i] }}
                                <small class="ms-2 text-medium-emphasis">{{ _s.length }} รายการ</small>
                                <small class="ms-1">
                                    <v-tooltip
                                        activator="parent"
                                        location="top"
                                    >
                                        <template v-slot:activator="{ props }">
                                            <v-icon icon="mdi-delete-circle-outline text-danger cursor-pointer" @click="removeType(_i)"></v-icon>
                                        </template>
                                        <span>ล้างทุกรายการ</span>
                                    </v-tooltip>
                                </small>
                            </v-sheet>
                            <v-list-item
                                v-for="(n, i) in _s"
                                :key="i"
                            >
                                <template v-slot:title>
                                    <p class="mb-0 d-flex justify-space-between">
                                        <span class="lottery-number">
                                            <small class="me-2">{{ i+1 }}.</small>
                                            <span class="text-primary text-mitr-400">{{ n.number }}</span>
                                        </span>
                                        <span class="lottery-number-cancel">
                                            <small class="ms-2 d-inline-flex cursor-pointer" @click="removeNumber(n.index, _i)">
                                                <v-icon aria-hidden="false" color="#DD0000">mdi-close-circle-outline</v-icon>
                                            </small>
                                        </span>
                                    </p>
                                </template>
                            </v-list-item>
                            <v-divider></v-divider>
                        </div>
                    </div>
                </v-list>
            </template>
        </v-card>
    </v-menu> -->

    <v-row class="mt-1">
        <v-col cols="12" lg="3">
            <v-card class="card-number-selected">
                <template v-slot:title>
                    <h4 class="text-mitr-400">รายการที่เลือก</h4>
                </template>

                <template v-slot:subtitle>
                    <p v-if="_stock_count > 0" class="mb-0 font-weight-bold d-flex justify-space-between">
                        <span class="ms-1">{{ _stock_count }} รายการ</span>
                        <span class="text-danger ms-4 cursor-pointer" @click="clearNumber">
                            <v-icon icon="mdi-delete-circle-outline"></v-icon>
                            ล้างทั้งหมด
                        </span>
                    </p>
                    <p v-else>ไม่มีรายการ...</p>
                </template>
                
                <template v-slot:text>
                    
                    <v-list 
                        lines="one" 
                        density="compact"
                        class="lottery-selected-list-show"
                    >
                        <div v-for="(_s, _i) in _stock" :key="_i">
                            <div v-if="_s.length > 0" class="mb-3">
                                <v-sheet class="font-weight-bold">
                                    {{ _stock_type[_i] }}
                                    <small class="ms-2 text-medium-emphasis">{{ _s.length }} รายการ</small>
                                    <small class="ms-1">
                                        <v-tooltip
                                            activator="parent"
                                            location="top"
                                        >
                                            <template v-slot:activator="{ props }">
                                                <v-icon icon="mdi-delete-circle-outline text-danger cursor-pointer" @click="removeType(_i)"></v-icon>
                                            </template>
                                            <span>ล้างทุกรายการ</span>
                                        </v-tooltip>
                                    </small>
                                </v-sheet>
                                <v-list-item
                                    v-for="(n, i) in _s"
                                    :key="i"
                                >
                                    <template v-slot:title>
                                        <p class="mb-0 d-flex justify-space-between">
                                            <span class="lottery-number">
                                                <small class="me-2">{{ i+1 }}.</small>
                                                <span class="text-primary text-mitr-400">{{ n.number }}</span>
                                            </span>
                                            <span class="lottery-number-cancel">
                                                <small class="ms-2 d-inline-flex cursor-pointer" @click="removeNumber(n.index, _i)">
                                                    <v-icon aria-hidden="false" color="#DD0000">mdi-close-circle-outline</v-icon>
                                                </small>
                                            </span>
                                        </p>
                                    </template>
                                </v-list-item>
                                <v-divider></v-divider>
                            </div>
                        </div>
                    </v-list>
                    <LotteryStockAddPrice
                        :stock_count="_stock_count"
                        :stock="_stock"
                        :stock_type="_stock_type"
                        :lotto_list="lottoList"
                        @to-remove-type="removeType"
                        @to-remove-number="removeNumber"
                    ></LotteryStockAddPrice>
                </template>
            </v-card>
        </v-col>
        <v-col cols="12" lg="9">
            <v-tabs
                v-model="tab"
                align-tabs="start"
                color="#c6137f"
            >
                <v-tab :value="1">สามตัว</v-tab>
                <v-tab :value="2">สองตัว</v-tab>
                <v-tab :value="3">เลขวิ่ง</v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item :value="1"
                    class="text-center mt-3 px-5"
                >
                    <LotteryStockThreeDigit 
                        :type="threeDigit"
                        ref="updateLotteryThreeNumber"
                        @to-update-stock="updateStock"
                    ></LotteryStockThreeDigit>
                </v-window-item>
                <v-window-item :value="2"
                    class="text-center mt-3 px-5"
                >
                    <LotteryStockTwoDigit 
                        :type="twoDigit"
                        ref="updateLotteryTwoNumber"
                        @to-update-stock="updateStock"
                    ></LotteryStockTwoDigit>
                </v-window-item>
                <v-window-item :value="3"
                    class="text-center mt-3 px-5"
                >
                    <LotteryStockRunNumber
                        :type="runNumber"
                        ref="updateLotteryRunNumber"
                        @to-update-stock="updateStock"
                    >
                    </LotteryStockRunNumber>
                </v-window-item>
            </v-window>
        </v-col>
    </v-row>
</template>

<script setup>
import { useLotteryStore } from '~/store/lottery';
const store = useLotteryStore()
const tab = ref(null)
const _stock = ref([])
const _stock_count = ref(0)
const updateLotteryThreeNumber = ref(null)
const updateLotteryTwoNumber = ref(null)
const updateLotteryRunNumber = ref(null)
const lottoryTypeId = {}
const _stock_type = {}
const threeDigit = ref([])
const twoDigit = ref([])
const runNumber = ref([])
const lottoList = ref({})

onMounted(async () => {
    await getBetRound()
    _stock.value = await stockGroup(localStorage.getItem('_stock'))
})

async function updateStock() {
    _stock.value = await stockGroup(localStorage.getItem('_stock'))
}

const stockGroup = async (_stock) => {
    if(_stock) {
        const result = setStockArray()
        setStockArray()
        _stock_count.value = 0
        JSON.parse(_stock).forEach((item, i) => {
            item.type.forEach(t => {
                _stock_count.value++
                result[t].push({
                    'number': item.number, 
                    'index': i, 
                    'betMin': lottoList.value[t].betMin,
                    'betMax': lottoList.value[t].betMax,
                    'betMaxCustomer': lottoList.value[t].betMaxCustomer,
                    'multiply': lottoList.value[t].multiply
                })
            })
        })

        return result
    }
}

function setStockArray() {
    let _type = {}
    for(let type in _stock_type) { _type[type] = [] }
    return _type
}

async function removeNumber(i, type) {
    await store.removeNumber('_stock', i, type)
    await updateStock()
    await updateLotteryNumber()
}

async function removeType(type) {
    await store.removeType('_stock', type)
    await updateStock()
    await updateLotteryNumber()
}

async function clearNumber() {
    await store.clearNumber('_stock')
    _stock.value = []
    _stock_count.value = 0
    await updateLotteryNumber()
}

async function updateLotteryNumber() {
    if(updateLotteryThreeNumber.value !== null)
        updateLotteryThreeNumber.value.updateLotteryThreeNumber()
    if(updateLotteryTwoNumber.value != null)
        updateLotteryTwoNumber.value.updateLotteryTwoNumber()
    if(updateLotteryRunNumber.value != null)
        updateLotteryRunNumber.value.updateLotteryRunNumber()
}

async function getBetRound() {
    try {
        const res = await $fetch('/api/lottery/roundList', {
            method: 'POST',
            body: {
                "username": 'user',
                "lotteryId": '9b0d3b84-7e01-4140-b903-446e93f1ac93',
                "roundId": '9b2781a8-ad07'
            }
        })

        lottoList.value = {...res.data.datas}
        await setLotteryRound(res.data.datas)
    } catch(error) {
        console.log(error)
    }
}

async function setLotteryRound(datas) {
    for(let type in datas) {
        _stock_type[type] = datas[type].name
    }

    threeDigit.value = setRoundType(datas, 3)
    twoDigit.value = setRoundType(datas, 2)
    runNumber.value = setRoundType(datas, 1)
}

function setRoundType(datas, digit) {
    let result = []
    for(let type in datas) {
        const _type = type.split('_')
        if(_type[_type.length - 1] == digit) {
            datas[type].id = type
            result.push(datas[type])
        }
    }

    return result
}

</script>


<style scoped>
    .text-danger {
        color: #B71C1C;
    }
    .lotto-basket {
        position: fixed;
        right: 5%;
        top: 12%;
        z-index: 10;
    }
    .card-number-selected {
        height: 100vmin;
        overflow-y: auto;
    }
    
    /* width */
    .card-number-selected::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    .card-number-selected::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    /* Handle */
    .card-number-selected::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    /* Handle on hover */
    .card-number-selected::-webkit-scrollbar-thumb:hover {
        background: #555;
        border-radius: 10px;
    }
</style>