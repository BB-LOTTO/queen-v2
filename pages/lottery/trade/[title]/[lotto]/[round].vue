<template>
    <NuxtLayout name="header">
        <template #sub-title>
            <div class="mb-2">
                งวดวันที่ {{ $dateFormat(lotto_date) }} 
                <span v-if="lotto_status === 1">
                    ปิดรับ {{ lotto_time }}
                </span>
                <span v-else>ปิดรับแล้ว</span>
            </div>
        </template>
        <template #title>{{ route.params.title }}</template>
    </NuxtLayout>
    <v-container class="mt-n10 main-container">
        <v-row>
            <v-col cols="3" class="d-none d-lg-block">
                <SideBarTradeLeftBar/>
            </v-col>
            <v-col cols="12" lg="9">
                <v-row>
                    <v-col cols="12 mb-6">
                        <LotteryTradeTypeList
                            :lottoLists="Object.entries(lottoList)"
                            :lottoCount="lottoCount"
                            @to-add-poy-list="addPoyList"
                        ></LotteryTradeTypeList>
                        <v-card
                            variant="flat"
                            class="rounded-xl"
                        >
                            <!-- <template v-slot:title>
                                <v-tabs
                                    v-model="tab"
                                    color="#c6137f"
                                    show-arrows
                                >
                                    <v-tab :value="1">สองตัว</v-tab>
                                    <v-tab :value="2">สามตัว</v-tab>
                                    <v-tab :value="3">เลขวิ่ง</v-tab>
                                    <v-tab :value="4">19 ประตู</v-tab>
                                    <v-tab :value="5">6 กลับ</v-tab>
                                    <v-tab :value="6">ตัวช่วย</v-tab>
                                </v-tabs>
                            </template> -->

                            <template v-slot:text>
                                <!-- <v-window v-model="tab">
                                    <v-window-item :value="1"
                                        class="mt-3"
                                    >
                                        <LotteryTradeSelect
                                            type="2 ตัว"
                                            :betLimit="lottoList"
                                            @to-add-number="addNumber"
                                            @someting-wrong="setSnackBar"
                                        >
                                        </LotteryTradeSelect>
                                    </v-window-item>
                                    <v-window-item :value="2"
                                        class="mt-3 px-5"
                                    >
                                        <LotteryTradeSelect
                                            type="3 ตัว"
                                            :betLimit="lottoList"
                                            @to-add-number="addNumber"
                                            @someting-wrong="setSnackBar"
                                        >
                                        </LotteryTradeSelect>
                                    </v-window-item>
                                    <v-window-item :value="3"
                                        class="mt-3 px-5"
                                    >
                                        <LotteryTradeSelect
                                            type="วิ่ง"
                                            :betLimit="lottoList"
                                            @to-add-number="addNumber"
                                            @someting-wrong="setSnackBar"
                                        >
                                        </LotteryTradeSelect>
                                    </v-window-item>
                                    <v-window-item :value="4"
                                        class="mt-3 px-5"
                                    >
                                        <LotteryTradeSelect
                                            type="19 ประตู"
                                            :betLimit="lottoList"
                                            @to-add-number="addNumber"
                                            @someting-wrong="setSnackBar"
                                        >
                                        </LotteryTradeSelect>
                                    </v-window-item>
                                    <v-window-item :value="5"
                                        class="mt-3 px-5"
                                    >
                                        <LotteryTradeSelect
                                            type="6 กลับ"
                                            :betLimit="lottoList"
                                            @to-add-number="addNumber"
                                            @someting-wrong="setSnackBar"
                                        >
                                        </LotteryTradeSelect>
                                    </v-window-item>
                                    <v-window-item :value="6"
                                        class="mt-3 px-5"
                                    >
                                        <LotteryTradeHelper
                                            :betLimit="lottoList"
                                            @to-add-poy="addPoyNumber"
                                            @someting-wrong="setSnackBar"
                                        ></LotteryTradeHelper>
                                    </v-window-item>
                                </v-window> -->

                                <v-card variant="tonal" color="light-blue-darken-3 mb-5">
                                    <template v-slot:title>
                                        <v-row>
                                            <v-col cols="6">
                                                <h3>{{ route.params.title }}</h3>
                                            </v-col>
                                            <v-col cols="6" class="text-end">
                                                <h6>งวดวันที่ {{ $dateFormat(lotto_date) }}</h6>
                                            </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                    </template>
                                    
                                    <template v-slot:text style="min-height: 200px;">
                                        <div v-for="(item, i) in poy" :key="i" class="number-selected-list px-3 mb-5">
                                            <div class="number-selected-header mb-1">
                                                <span class="me-3 text-medium-emphasis">{{ item.name }} x {{ item.price }}</span>
                                                <span class="text-subtitle-2 me-2">
                                                    <LotteryTradeCheckoutPoy
                                                        :n="item"
                                                        :k="i"
                                                        @checkout-edit="checkoutEdit"
                                                        @number-edit="checkoutNumberEdit"
                                                    ></LotteryTradeCheckoutPoy>
                                                </span>
                                                <span>
                                                    <v-tooltip
                                                        location="top"
                                                    >
                                                        <template v-slot:activator="{ props }">
                                                            <v-icon v-bind="props" 
                                                                icon="mdi-close-box-outline"
                                                                class="text-red-accent-4 cursor-pointer mt-n1"
                                                                @click="removeNumberSelected(i)"
                                                            >
                                                            </v-icon>
                                                        </template>
                                                        <span>ลบรายการ</span>
                                                    </v-tooltip>
                                                </span>
                                            </div>
                                            <div class="number-list-item d-flex flex-wrap">
                                                <div v-for="(number, k) in item.number.sort()" :key="k" class="number-selected">
                                                    <span v-html="poyNumberLimit(number, item.type)" 
                                                        class="me-5 text-subtitle-1 font-weight-bold text-high-emphasis">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                    <v-divider></v-divider>
                                    <template v-slot:actions>
                                        <v-row>
                                            <v-col cols="6">
                                                <p class="text-mitr-400">ยอดรวม</p>
                                            </v-col>
                                            <v-col cols="6" class="text-end">
                                                <p class="text-mitr-400">{{ $numberFormat(_sumPrice) }} ฿</p>
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-card>

                                <v-sheet class="text-center">
                                    <v-form>
                                        <!-- <v-text-field
                                            density="compact"
                                            variant="outlined"
                                            v-model="note"
                                            label="note"
                                        ></v-text-field> -->
                                        <v-btn 
                                            v-if="!sending" 
                                            :disabled="poy.length === 0 && lotto_status !== '1'"
                                            prepend-icon="mdi-invoice-text-send-outline" 
                                            color="orange-darken-1" 
                                            @click="checkout = true"
                                        >
                                            ส่งโพย
                                        </v-btn>
                                        <v-progress-circular
                                            v-else
                                            color="pink-darken-3"
                                            indeterminate
                                        ></v-progress-circular>
                                    </v-form>
                                </v-sheet>
                            </template>
                        </v-card>
                    </v-col>

                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" lg="6" class="pb-0">
                                <v-card
                                    variant="flat"
                                    class="mb-4 rounded-xl"
                                >
                                    <template v-slot:title>
                                        <h6>
                                            <v-icon icon="mdi-lock-alert-outline"></v-icon>
                                            รายการตัด-อั้น
                                        </h6>
                                    </template>

                                    <template v-slot:text>
                                        <LotteryTradeNumberLimit
                                            :number="numberLimit"
                                            :lotto="lottoList"
                                        ></LotteryTradeNumberLimit>
                                    </template>
                                </v-card>

                                <v-card
                                    v-if="_result"
                                    variant="flat"
                                    class="mb-4 rounded-xl"
                                >
                                    <template v-slot:title>
                                        <h6>
                                            <v-icon icon="mdi-chart-line"></v-icon>
                                            ประกาศผลงวดประจำวันที่ {{ $dateFormat(lotto_date) }}
                                        </h6>
                                    </template>

                                    <template v-slot:text>
                                        <LotteryTradeResultRound
                                            :result="lottoResult"
                                        ></LotteryTradeResultRound>
                                    </template>
                                </v-card>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-card
                                    variant="flat"
                                    class="mb-4 rounded-xl d-none"
                                >
                                    <template v-slot:title>
                                        <h6>
                                            <v-icon icon="mdi-invoice-list-outline"></v-icon>
                                            รายการบิลล่าสุด ( {{ perPage }} รายการล่าสุด )
                                        </h6>
                                    </template>

                                    <template v-slot:text>
                                        <HistoryLastBill
                                            :username="username"
                                            :lotto="lottoList"
                                            :perPage="perPage"
                                            @someting-wrong="setSnackBar"
                                            ref="billReload"
                                        ></HistoryLastBill>
                                    </template>
                                </v-card>

                                <v-card
                                    variant="flat"
                                    class="mb-4 rounded-xl"
                                >
                                    <template v-slot:title>
                                        <h6>
                                            <v-icon icon="mdi-star-outline"></v-icon>
                                            อัตราจ่าย
                                        </h6>
                                    </template>

                                    <template v-slot:text>
                                        <LotteryTradeBetLimit
                                            :lottoList="lottoList"
                                        >
                                        </LotteryTradeBetLimit>
                                    </template>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-snackbar
            :timeout="4000"
            :color="_snackbar.color"
            elevation="24"
            location="center top"
            v-model="_snackbar.status"
        >
            <span class="text-light">{{ _snackbar.message }}</span>
        </v-snackbar>

        <v-dialog
            v-model="dialog.status"
            width="auto"
        >
            <v-card
                max-width="400"
                :prepend-icon="dialog.icon"
                :text="dialog.text"
                :title="dialog.title"
            >
                <template v-slot:prepend>
                    <div class="pe-4">
                        <v-icon :color="dialog.icolor" size="x-large"></v-icon>
                    </div>
                </template>
                <template v-slot:actions>
                    <v-btn
                        class="ms-auto"
                        text="Ok"
                        @click="dialog.status = false"
                    ></v-btn>
                </template>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="checkout"
            max-width="400"
            persistent
        >
            <v-card
                prepend-icon="mdi-check-circle-outline"
            >
                <template v-slot:title>
                    <h4 class="text-h5">ยืนยันการส่งโพย</h4>
                </template>
                <template v-slot:text>
                    <v-row>
                        <v-col cols="12" class="px-3">
                            <h6 class="text-h6">เลขที่คุณเลือก</h6>
                            <v-list lines="one" class="pt-0 border rounded px-1">
                                <v-list-item
                                    v-for="(n, k) in poy"
                                    class="border-b"
                                >
                                    <template v-slot:title>
                                        <p class="text-subtitle-1 font-weight-bold">
                                            {{ n.name }}
                                            <span class="text-caption">
                                                x{{ n.price }} ฿
                                                <LotteryTradeCheckoutPoy
                                                    :n="n"
                                                    :k="k"
                                                    @checkout-edit="checkoutEdit"
                                                    @number-edit="checkoutNumberEdit"
                                                ></LotteryTradeCheckoutPoy>
                                            </span>
                                        </p>
                                    </template>
                                    <template v-slot:subtitle>
                                        <div class="d-flex justify-space-between align-center">
                                            <div class="is-number-selected">
                                                <span v-for="number in n.number" class="me-3">
                                                    <strong class="font-weight-bold text-subtitle-2 text-green-darken-4">{{ number }}</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="12">
                            <v-card>
                                <v-card-item>
                                    <v-card-title>
                                        <h6 class="text-h6">สรุป</h6>
                                    </v-card-title>
                                    <v-card-subtitle>รายละเอียด</v-card-subtitle>
                                </v-card-item>

                                <v-card-text>
                                    <div class="d-flex justify-space-between">
                                        <p>ยอดเงินของคุณ</p>
                                        <p>
                                            <small class="font-weight-bold">{{ $numberFormat(_balance) }}</small> ฿
                                        </p>
                                    </div>
                                    <div class="d-flex justify-space-between border-b mb-1 pb-1">
                                        <p>ยอดรวมโพย</p>
                                        <p>
                                            <small class="font-weight-bold">{{ $numberFormat(_sumPrice) }}</small> ฿
                                        </p>
                                    </div>
                                    <div class="d-flex justify-space-between">
                                        <p>ยอดเงินคงเหลือ</p>
                                        <p>
                                            <small class="font-weight-bold">{{ $numberFormat(amountSummary(_balance, _sumPrice)) }}</small> ฿
                                        </p>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>

                <br/>

                <template v-slot:actions>
                    <v-divider></v-divider>

                    <v-btn @click="checkout = false">
                        <span class="text-danger">ยกเลิก</span>
                    </v-btn>

                    <v-btn :disabled="_sumPrice > _balance" @click="sendPoy">
                        ยืนยัน
                    </v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-container>
    
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const { data } = useAuth()
const route = useRoute()

const tab = ref()
const numberSelected = ref([])
const poy = ref([])
const note = ref('')
const lottoList = ref([])
const lottoCount = ref([])
const numberLimit = ref([])
const username = data.value.user.username
const sending = ref(false)
const _snackbar = ref({status: false, message: '', color: ''})
const perPage = ref(10)
const discount = ref([0])
const lotto_date = useCookie('lotto_date')
const lotto_time = useCookie('lotto_time')
const lotto_status = useCookie('l_s')
const billReload = ref(null)
const dialog = ref({status: false, icon: '', icolor: '', title: '', text: ''})
const lottoResult = ref([])
const _result = ref(false)
const checkout = ref(false)
const _balance = ref(await useBalance(username))

const sumPrice = computed(() => {
    let sum = 0
    let _discount = discount.value.reduce((a,b) => { return a + b })
    numberSelected.value.forEach(item => { sum += parseInt(item.price) })
    return sum - _discount
})

const _sumPrice = computed(() => {
    let sum = 0
    let discount = 0
    poy.value.forEach(p => { 
        sum += parseInt(p.price) * p.number.length
        if(p.limit.length > 0) {
            p.limit.forEach(l => { if(l.type === 2) discount += parseInt(p.price) })
        }
    })

    return sum - discount
})

onMounted(() => {
    getBetRound()
    getNumberLimit()
    getRoundResult()
})

function addPoyList(payload) {
    let _num = []
    
    const _isHas = poy.value.findIndex(p => { return p.type === payload.type && p.price === parseInt(payload.price) })
    const _lotto = Object.entries(lottoList.value).find(l => { return l[0] === payload.type })
    if(_isHas < 0) {
        payload.number.forEach(n => { _num.push(n) })
        poy.value.push({
            'type': payload.type, 
            'number': _num, 
            'price': parseInt(payload.price), 
            'name': _lotto[1].name, 
            'multiply': _lotto[1].multiply,
        })

        addPoyNumberLimit()
    }
    else {
        payload.number.forEach(n => { poy.value[_isHas].number.push(n) })
        addPoyNumberLimit(_isHas)
    }
    
}

function addPoyNumberLimit(index = null) {
    const nLimit = Object.entries(numberLimit.value)
    const Indx = index !== null ? index : poy.value.findIndex(p => { return p.limit === undefined })
    poy.value[Indx].limit = []
    const limit = nLimit.find(nl => { return nl[0] === poy.value[Indx].type })
    if(limit) {
        poy.value[Indx].number.forEach(pn => {
            const _limit = limit[1].find(l1 => { return l1.type !== 0 && l1.number === pn })
            if(_limit) poy.value[Indx].limit.push({limit: _limit.number, type: _limit.type})
        })
    }
}

function addNumber(numbers, number_on, number_bottom, type) {
    if(numbers.length > 0) {
        if(number_on !== '' || number_bottom !== '') {
            const result = checkTrade(numbers, number_on, number_bottom, type)
            const _type = checkType(type)

            result.forEach(_result => {
                const nsi = numberSelected.value.findIndex(item => { return item.type === _type && item.trade === _result.name })
                if(nsi >= 0) {
                    const _numbers = [...numberSelected.value[nsi].numbers, ...numbers]
                    const setNewNumbers = _numbers.filter((item, index) => _numbers.indexOf(item) === index);
                    const _price = parseInt(number_on !== '' ? number_on : 0) + parseInt(number_bottom !== '' ? number_bottom : 0)
                    numberSelected.value[nsi].numbers = setNewNumbers.sort()
                    numberSelected.value[nsi].price = _price * setNewNumbers.length

                    // let inx = numberSelected.value[nsi].numbers.findIndex(n => { return n === num })
                    // numbers.forEach(num => { numberSelected.value[nsi].numbers.push(num) })
                }
                else {
                    numberSelected.value.push({
                        numbers: numbers,
                        type: _type,
                        trade: _result.name,
                        price: _result.price,
                        bet: convertPoyType(_type, _result.id, number_on, number_bottom),
                    })

                    setNumberLimit()
                }

                discount.value = [0]
            })
        }
        else console.log('underfined')
    }
    else console.log('number length')
}

function removeNumberSelected(index) {
    // discount.value = [0]
    poy.value.splice(index, 1)
}

function setNumberLimit() {
    const Indx = numberSelected.value.findIndex(num => { return num.limit === undefined })
    let _numberSelected = numberSelected.value[Indx]
    _numberSelected.bet.forEach(bet => {
        let nbLimit = setTypeLimit(bet.name)
        if(nbLimit) {
            let limit = checkNumberLimit(_numberSelected.numbers, nbLimit)
            _numberSelected.limit = limit
        }
        else _numberSelected.limit = []
    })
}

function setTypeLimit(type) {
    const number = Object.entries(numberLimit.value)
    const result = number.find(item => { return item[0] === type })
    if(result) return result
    return false
}

function checkNumberLimit(number, nbLimit) {
    let _limit = []
    number.forEach(num => {
        const getLimit = nbLimit[1].find(l => { return num === l.number })
        if(getLimit) _limit.push({ limit: getLimit.number, type: getLimit.type })
    })
    return _limit
    // const getNumber = number.find(num => { return num === nbLimit[1].number })
    // if(getNumber) return [{ limit: nbLimit[1].number, type: nbLimit[1].type }]
    // else return []
}

function setTypeLimit_v2(type, number) {
    const _number = Object.entries(numberLimit.value)
    const result = _number.find(item => { return item[0] === type && item[1].find(_n => { return _n.number === number }) })
    if(result) return result[1].find(r => { return r.number === number })
    return false
}

function checkoutEdit(key) {
    const input = document.querySelector(`#_input-${key}`)
    const number = poy.value[key]
    // const _trade = `${number.trade.split('x')[0]}x ${input.value}`
    
    const isIndex = poy.value.findIndex((n) => { return n.type === number.type && n.price === parseInt(input.value) })
    if(isIndex >= 0) {
        // const _newPrice = number.number.length * parseInt(input.value)
        number.number.forEach((n) => { poy.value[isIndex].number.push(n) })
        // poy.value[isIndex].price += _newPrice
        poy.value.splice(key, 1)
    }
    else {
        number.price = parseInt(input.value)
        // let newPrice = number.price = input.value
        // let _sumPrice = number.number.length * newPrice
        
        // number.trade = `${number.trade.split('x')[0]}x ${newPrice}`
        // number.type = 
        // number.price = _sumPrice
    }
}

async function checkoutNumberEdit(_key, _index) {
    const input = document.querySelector(`#_input-number-${_index}`)
    const number = poy.value[_key]
    const _number = number.number[_index]
    if(number.price != input.value) {
        // const _trade = `${number.trade.split('x')[0]}x ${input.value}`
        const isNumber = poy.value.findIndex((n) => { return n.type === number.type && n.price === parseInt(input.value) })
        if(isNumber >= 0) {
            const getNumber = poy.value[isNumber]
            getNumber.number.push(_number)
            // getNumber.price = parseInt(input.value)
        }
        else {
            let newNumber = []
            // newNumber.bet = [{'multiply': number.bet[0].multiply, 'name': number.bet[0].name, 'price': parseInt(input.value)}]
            newNumber.limit = number.limit
            newNumber.number = []
            newNumber.number.push(_number)
            newNumber.price = parseInt(input.value)
            // newNumber.trade = _trade
            newNumber.type = number.type
            newNumber.name = number.name

            poy.value.push(newNumber)
        }

        number.number.splice(_index, 1)
        // number.price = number.price - number.price
    }

    // console.log(poy.value)
}

const poyNumberLimit = (number, type) => {
    const limit = Object.entries(numberLimit.value)
    const _limit = limit.find(l => { return l[0] === type })
    if(_limit) {
        const _num = _limit[1].find(n => { return n.number === number && n.type !== 0 })
        if(_num) {
            return _num.type === 2 ? 
                    `<s class="text-num-close">${number}</s>` : 
                    `<u class="text-num-half">${number}</u>`
        }
    }

    return number
}

const isNumberLimit = (number, bet) => {
    let _bType = ''
    let _bet = []
    bet.forEach(b => {
        let result = setTypeLimit_v2(b.name, number)
        if(_bType === '' && result) {
            _bType = result
            _bet = b
        }
    })

    if(_bType !== '') {
        if(number === _bType.number) {
            if(_bType.type === 2) discount.value.push(parseInt(_bet.price))
            return _bType.type === 2 ? 
                    `<s class="text-num-close">${number}</s>` : 
                    `<u class="text-num-half">${number}</u>`
        }
        else return number
    }
    else return number
}

const amountSummary = (balance, total) => {
    return parseFloat(balance) - parseFloat(total)
}

function checkTrade(numbers, on, bottom, type) {
    let _trade = []
    // let trade = ''
    // let price = 0
    let _type = type === '3 ตัว' ? 'โต๊ด' : 'ล่าง'

    if(on !== '') {
        _trade.push({ id: 'บน', name: `บน x ${on}`, price: numbers.length * parseInt(on) })
    }
    if(bottom !== '') {
        _trade.push({ id: 'ล่าง', name: `${_type} x ${bottom}`, price: numbers.length * parseInt(bottom) })
    }

    // if(on !== '' && bottom !== '') {
    //     trade = `บน x ${_type} : ${on} x ${bottom}`
    //     let sum = parseInt(on) + parseInt(bottom)
    //     price = numbers.length * sum
    // }
    // if(on !== '' && bottom === '') {
    //     trade = `บน : ${on}`
    //     price = numbers.length * parseInt(on)
    // }
    // if(on === '' && bottom !== '') {
    //     trade = `${_type} : ${bottom}`
    //     price = numbers.length * parseInt(bottom)
    // }

    // console.log(_trade)

    // return Array(trade, price)
    return _trade
}

function checkType(type) {
    if(type === '19 ประตู') return '2 ตัว'
    if(type === '6 กลับ') return '3 ตัว'
    else return type
}

async function checkBalanceSupport() {
    const balance = await useBalance(username)
    return _sumPrice.value <= balance ? true : false
}

async function sendPoy() {
    sending.value = true
    if(checkBalanceSupport()) {
        try {
            const res = await $fetch('/api/lottery/sendPoy', {
                method: 'POST',
                body: {
                    'username': username,
                    'roundId': route.params.round,
                    'poyList': setPoyList()
                }
            })

            if(res.status === 'OK') {
                setDialog('mdi-check-circle-outline', 'green-accent-4', 'ทำรายการสำเร็จ', 'ส่งโพยของคุณเรียบร้อยแล้ว...ขอให้โชคดี!')
                poy.value = []
                billReload.value.getBill()
                // discount.value = [0]
            }
            else {
                setSnackBar('red-accent-4', 'เกิดข้อผิดพลาด กรุณาลองใหม่...')
            }
        }
        catch (error) {
            console.log(error)
            setSnackBar('red-accent-4', 'เกิดข้อผิดพลาด กรุณาลองใหม่...')
        }
    }
    else setSnackBar('red-accent-4', 'ยอดเงินของคุณไม่พอ...')

    sending.value = false
    checkout.value = false
}

function setPoyList() {
    let poylist = []
    poy.value.forEach(item => {
        item.number.forEach(num => {
            let limit = item.limit.length > 0 ? item.limit.findIndex(l => { return l.limit === num && l.type === 2}) : -1
            if(limit < 0) {
                poylist.push({
                    name: item.type,
                    number: num,
                    multiply: item.multiply,
                    price: item.price
                })
                // item.bet.forEach(bet => {
                //     poylist.push({
                //         name: bet.name,
                //         number: num,
                //         multiply: bet.multiply,
                //         price: bet.price
                //     })
                // })
            }
        })
    })

    const poyGroup = poylist.reduce((group, poy) => {
        const { name } = poy
        group[name] = group[name] ?? []
        group[name].push(poy)
        return group
    }, {})

    return poyGroup
}


function convertPoyType(type, id, on, bottom) {
    const lotto = lottoList.value
    const _lotto = Object.keys(lotto).length
    if(type === 'วิ่ง') {
        if(on !== '' && id === 'บน') return [{ name: 'teng_bon_1',  multiply: _lotto > 0 ? lotto.teng_bon_1.multiply : 0, price: on }]
        if(bottom !== '' && id === 'ล่าง') return [{ name: 'teng_lang_1', multiply: _lotto > 0 ? lotto.teng_lang_1.multiply : 0, price: bottom }]

        // if(on !== '' && bottom !== '') {
        //     return [
        //         { name: 'teng_bon_1',  multiply: lotto.teng_bon_1.multiply, price: on },
        //         { name: 'teng_lang_1', multiply: lotto.teng_lang_1.multiply, price: bottom }
        //     ]
        // }
        // else {
        //     if(on !== '') return [{ name: 'teng_bon_1',  multiply: lotto.teng_bon_1.multiply, price: on }]
        //     if(bottom !== '') return [{ name: 'teng_lang_1', multiply: lotto.teng_lang_1.multiply, price: bottom }]
        // }
        
    }

    if(type === '2 ตัว') {
        if(on !== '' && id === 'บน') return [{ name: 'teng_bon_2', multiply: _lotto > 0 ? lotto.teng_bon_2.multiply : 0, price: on }]
        if(bottom !== '' && id === 'ล่าง') return [{ name: 'teng_lang_2', multiply: _lotto > 0 ? lotto.teng_lang_2.multiply : 0, price: bottom }]

        // if(on !== '' && bottom !== '') {
        //     return [
        //         { name: 'teng_bon_2', multiply: lotto.teng_bon_2.multiply, price: on },
        //         { name: 'teng_lang_2', multiply: lotto.teng_lang_2.multiply, price: bottom }
        //     ]
        // }
        // else {
        //     if(on !== '') return [{ name: 'teng_bon_2', multiply: lotto.teng_bon_2.multiply, price: on }]
        //     if(bottom !== '') return [{ name: 'teng_lang_2', multiply: lotto.teng_lang_2.multiply, price: bottom }]
        // }
    }

    if(type === '3 ตัว') {
        if(on !== '' && id === 'บน') return [{ name: 'teng_bon_3', multiply: _lotto > 0 ? lotto.teng_bon_3.multiply : 0, price: on }]
        if(bottom !== '' && id === 'ล่าง') return [{ name: 'tode_3', multiply: _lotto > 0 ? lotto.tode_3.multiply : 0, price: bottom }]
        // if(on !== '' && bottom !== '') {
        //     return [
        //         { name: 'teng_bon_3', multiply: lotto.teng_bon_3.multiply, price: on },
        //         { name: 'tode_3', multiply: lotto.tode_3.multiply, price: bottom }
        //     ]
        // }
        // else {
        //     if(on !== '') return [{ name: 'teng_bon_3', multiply: lotto.teng_bon_3.multiply, price: on }]
        //     if(bottom !== '') return [{ name: 'tode_3', multiply: lotto.tode_3.multiply, price: bottom }]
        // }
    }

    // miss ---------
    // "3 ตัวหลังตรง (3 ตัวล่าง)" teng_lang_3
    // "3 ตัวหน้าตรง (3 ตัวหน้า)" teng_lang_nha_3
}

function addPoyNumber(numbers, on, bottom, tod) {
    let _numbers = { one: [], two: [], three: [] }
    numbers.forEach(n => {
        if(n.length === 1) _numbers.one.push(n)
        if(n.length === 2) _numbers.two.push(n)
        if(n.length === 3) _numbers.three.push(n)
    })

    if(_numbers.one.length > 0) addNumber(_numbers.one, on, bottom, 'วิ่ง')
    if(_numbers.two.length > 0) addNumber(_numbers.two, on, bottom, '2 ตัว')
    if(_numbers.three.length > 0) addNumber(_numbers.three, on, tod, '3 ตัว')
}

async function getBetRound() {
    try {
        const res = await $fetch('/api/lottery/roundList', {
            method: 'POST',
            body: {
                "username": username,
                "lotteryId": route.params.lotto,
                "roundId": route.params.round
            }
        })

        lottoList.value = res.data.datas
        const _l = Object.entries(lottoList.value)
        _l.forEach(item => { 
            const _i = item[0].split('_')
            lottoCount.value.push(_i[_i.length -1])
        })
    } catch(error) {
        console.log(error)
    }
}

async function getNumberLimit() {
    try {
        const res = await $fetch('/api/lottery/numberLimit', {
            method: 'POST',
            body: {
                "username": username,
                "roundId": route.params.round
            }
        })

        if(res.data) numberLimit.value = res.data
        else numberLimit.value = []
    } catch(error) {
        // console.log(error)
    }
}

async function getRoundResult() {
    try {
        const res = await $fetch('/api/lottery/resultRoundList', {
            query: {
                "lotteryId": route.params.lotto,
                "roundId": route.params.round
            }
        })
        
        // console.log(res)
        if(res.status === 'OK') {
            lottoResult.value = res.data.datas
            _result.value = true
        }
        else {
            lottoResult.value = []
            _result.value = false
        }
    } catch(error) {
        console.log(error)
    }
}

function setSnackBar(color, message) {
    _snackbar.value.status = true
    _snackbar.value.color = color
    _snackbar.value.message = message

    setTimeout(() => { _snackbar.value.status = false }, 4500)
}

function setDialog(icon, icolor, title, text) {
    dialog.value.status = true
    dialog.value.icon = icon
    dialog.value.icolor = icolor
    dialog.value.title = title
    dialog.value.text = text
}
</script>


<style>
.text-num-close {
    color: #E53935;
}
.text-num-half {
    color: #AA00FF;
}
.bill-table .v-data-table-footer {
  display: none;
}
</style>