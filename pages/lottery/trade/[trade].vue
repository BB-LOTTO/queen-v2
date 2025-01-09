<template>
    <v-layout>
        <v-navigation-drawer
            permanent
        >
            <template v-slot:prepend>
                <v-list-item
                    lines="two"
                    prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                    subtitle="Logged in"
                    title="Jane Smith"
                ></v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
                <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main class="mx-2" style="height: 90vh;">
            <div class="d-flex align-end">
                <h2 class="text-mitr-400 me-2">{{ route.params.trade }}</h2>
                <span class="text-mitr-400 pb-1">งวดวันที่ {{ `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}` }}</span>
            </div>
            <v-row>
                <v-col cols="12" lg="6">
                    <v-card
                        variant="flat"
                    >
                        <template v-slot:title>
                            <v-tabs
                                v-model="tab"
                                color="#c6137f"
                            >
                                <v-tab :value="1">สองตัว</v-tab>
                                <v-tab :value="2">สามตัว</v-tab>
                                <v-tab :value="3">เลขวิ่ง</v-tab>
                                <v-tab :value="4">19 ประตู</v-tab>
                                <v-tab :value="5">6 กลับ</v-tab>
                                <v-tab :value="6">ตัวช่วย</v-tab>
                            </v-tabs>
                        </template>

                        <template v-slot:text>
                            <v-window v-model="tab">
                                <v-window-item :value="1"
                                    class="mt-3"
                                >
                                    <LotteryTradeSelect
                                        type="2 ตัว"
                                        @to-add-number="addNumber"
                                    >
                                    </LotteryTradeSelect>
                                </v-window-item>
                                <v-window-item :value="2"
                                    class="mt-3 px-5"
                                >
                                    <LotteryTradeSelect
                                        type="3 ตัว"
                                        @to-add-number="addNumber"
                                    >
                                    </LotteryTradeSelect>
                                </v-window-item>
                                <v-window-item :value="3"
                                    class="mt-3 px-5"
                                >
                                    <LotteryTradeSelect
                                        type="วิ่ง"
                                        @to-add-number="addNumber"
                                    >
                                    </LotteryTradeSelect>
                                </v-window-item>
                                <v-window-item :value="4"
                                    class="mt-3 px-5"
                                >
                                    <LotteryTradeSelect
                                        type="19 ประตู"
                                        @to-add-number="addNumber"
                                    >
                                    </LotteryTradeSelect>
                                </v-window-item>
                            </v-window>

                            <v-card variant="tonal" color="light-blue-darken-3 mb-5">
                                <template v-slot:title>
                                    <v-row>
                                        <v-col cols="6">
                                            <h3>{{ route.params.trade }}</h3>
                                        </v-col>
                                        <v-col cols="6" class="text-end">
                                            <h6>งวดวันที่ {{ `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}` }}</h6>
                                        </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                </template>
                                
                                <template v-slot:text style="min-height: 200px;">
                                    <v-list 
                                        v-for="(item, i) in numberSelected"
                                        density="compact"
                                        expand-icon="mdi-delete-outline"
                                    >
                                        <v-list-subheader>
                                            <span class="me-3">{{ item.type }} {{ item.trade }}</span>
                                            <v-btn 
                                                density="compact"
                                                size="small" 
                                                color="red-accent-4" 
                                                icon="mdi-close"
                                                @click="numberSelected.splice(i, 1)"
                                            ></v-btn>
                                        </v-list-subheader>
                                        <div class="number-list-item d-flex flex-wrap">
                                            <v-list-item
                                                v-for="number in item.numbers"
                                                color="primary"
                                            >
                                                <v-list-item-title v-text="number"></v-list-item-title>
                                            </v-list-item>
                                        </div>
                                    </v-list>
                                </template>

                                <v-divider></v-divider>
                                <template v-slot:actions>
                                    <v-row>
                                        <v-col cols="6">
                                            <p class="text-mitr-400">ยอดรวม</p>
                                        </v-col>
                                        <v-col cols="6" class="text-end">
                                            <p class="text-mitr-400">{{ sumPrice }} ฿</p>
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-card>

                            <v-sheet class="text-center">
                                <v-form @submit.prevent>
                                    <v-text-field
                                        density="compact"
                                        variant="outlined"
                                        v-model="note"
                                        label="note"
                                    ></v-text-field>
                                    <v-btn prepend-icon="mdi-invoice-text-send-outline" type="submit" color="orange-darken-1">ส่งโพย</v-btn>
                                </v-form>
                            </v-sheet>
                        </template>
                    </v-card>
                </v-col>
                <v-col cols="12" lg="6">
                    <v-card
                        variant="flat"
                    >
                        <template v-slot:title>
                            
                        </template>

                        <template v-slot:text>
                            <p>Hello....</p>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-main>
    </v-layout>
    
</template>

<script setup>
definePageMeta({
    layout: 'trade-layout',
    middleware: 'auth'
})

import { useLotteryStore } from '~/store/lottery';
const route = useRoute()
const store = useLotteryStore()

const tab = ref()
const d = new Date();
const numberSelected = ref([])
const note = ref('')

const sumPrice = computed(() => {
    let sum = 0
    numberSelected.value.forEach(item => { sum += parseInt(item.price) })
    return sum
})

function addNumber(numbers, number_on, number_bottom, type) {
    if(numbers.length > 0) {
        if(number_on.value !== '' || number_bottom.value !== '') {
            const result = checkTrade(numbers, number_on, number_bottom, type)
            const _type = checkType(type)
            let nsi = numberSelected.value.findIndex(item => { return item.type === _type && item.trade === result[0] })
            if(nsi >= 0) {
                numbers.forEach(num => { numberSelected.value[nsi].numbers.push(num) })
                numberSelected.value[nsi].price += result[1]
            }
            else {
                numberSelected.value.push({
                    numbers: numbers,
                    type: _type,
                    trade: result[0],
                    price: result[1]
                })
            }
        }
        else console.log('undefined')
    }
    else console.log('numbers length')
}

function checkTrade(numbers, on, bottom, type) {
    let trade = ''
    let price = 0
    let _type = type === '3 ตัว' ? 'โต๊ด' : 'ล่าง'
    if(on !== '' && bottom !== '') {
        trade = `บน x ${_type} : ${on} x ${bottom}`
        let sum = parseInt(on) + parseInt(bottom)
        price = numbers.length * sum
    }
    if(on !== '' && bottom === '') {
        trade = `บน : ${on}`
        price = numbers.length * parseInt(on)
    }
    if(on === '' && bottom !== '') {
        trade = `${_type} : ${bottom}`
        price = numbers.length * parseInt(bottom)
    }

    return Array(trade, price)
}

function checkType(type) {
    if(type === '19 ประตู') return '2 ตัว'
    else return type
}

</script>