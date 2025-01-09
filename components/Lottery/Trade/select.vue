<template>
    <lotteryTradeOption 
        :type="props.type"
        @set-number-double="setDouble"
        @set-number-swap="setSwap"
        @set-number-Rush="setRushType"
    />
    <v-card variant="tonal" color="grey-lighten-1" class="mb-4">
        <template v-slot:subtitle>
            <v-row>
                <v-col cols="6">
                    <strong style="color: #000;">จำนวน {{ numbers.length }} รายการ</strong>
                </v-col>
                <v-col cols="6" class="text-end">
                    <v-btn 
                        density="default" 
                        size="x-small" 
                        color="red-accent-4" 
                        icon="mdi-delete-outline"
                        @click="numbers = []"
                    ></v-btn>
                </v-col>
            </v-row>
            
        </template>
        <template v-slot:text>
            <v-chip
                variant="flat"
                color="#c6137f"
                class="px-4 me-2 mb-1"
                v-for="(number, key) in numbers.sort()"
                :key="key"
                :text="number"
                @click="numbers.splice(key, 1)"
            ></v-chip>
        </template>
    </v-card>

    <v-row class="mb-4">
        <v-col cols="12" md="3">
            <v-text-field
                density="compact"
                variant="outlined"
                v-model="number"
                label="ใส่เลข"
                type="number"
                id="input-number" 
                :min="0"
                hide-details
                @keyup="setNumber()"
            ></v-text-field>
        </v-col>
        <v-col cols="12" :md="props.type === '6 กลับ' ? '6' : '3'">
            <v-text-field
                density="compact"
                variant="outlined"
                v-model="number_on"
                label="บน"
                type="number"
                id="on-number"
                hide-details
                @change="checkMinValue()"
            ></v-text-field>
        </v-col>
        <v-col v-if="props.type !== '6 กลับ'" cols="12" md="3">
            <v-text-field
                density="compact"
                variant="outlined"
                v-model="number_bottom"
                :label="_numberType()"
                type="number"
                id="bottom-number"
                hide-details
                @change="checkMinValue()"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
            <v-btn 
                :disabled="numbers.length === 0"
                prepend-icon="mdi-plus" 
                color="green-darken-2 font-weight-light" 
                block 
                @click="addNumber()"
            >
                เพิ่มรายการ
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
const emit = defineEmits(['toAddNumber', 'sometingWrong'])
const props = defineProps(['type', 'betLimit'])
const number = ref('')
const number_on = ref('')
const number_bottom = ref('')
const numbers = ref([])
let rush = 'a'
const _betLimit = Object.entries(props.betLimit)

function numType(set) {
    if(set === 'number') {
        if(props.type === '2 ตัว') return 2
        if(props.type === '3 ตัว' || props.type === '6 กลับ') return 3
        if(props.type === 'วิ่ง' || props.type === '19 ประตู') return 1
    }
    if(set === 'double') {
        if(props.type === '2 ตัว') return 11
        if(props.type === '3 ตัว') return 111
    }
}

const betLimit = (lType) => {
    const _getByType = _betLimit.filter(r => { return r[1].name.search(props.type) >= 0 })
    const _getByLottoType = _getByType.find(t => { return t[1].name.search(lType) >= 0 })
    if(_getByLottoType) return _getByLottoType[1]
    return { betMin: 1, betMax: 500 }
}

function checkMinValue() {
    setPatternValue(betLimit('บน').betMin, betLimit('ล่าง').betMin, '<')

    if(props.type === '3 ตัว') setPatternValue(betLimit('บน').betMax, betLimit('โต๊ด').betMax, '>')
    else setPatternValue(betLimit('บน').betMax, betLimit('ล่าง').betMax, '>')
}

function setPatternValue(_on, _bottom, operator) {
    if(operator === '<') {
        if(number_on.value !== '' && parseInt(number_on.value) < _on) number_on.value = _on
        if(number_bottom.value !== '' && parseInt(number_bottom.value) < _bottom) number_bottom.value = _bottom
    }
    if(operator === '>') {
        if(number_on.value !== '' && parseInt(number_on.value) > _on) number_on.value = _on
        if(number_bottom.value !== '' && parseInt(number_bottom.value) > _bottom) number_bottom.value = _bottom
    }
}

function setNumber() {
    number.value = number.value >= 0 ? number.value : 0

    let _num = numType('number')
    
    if(props.type === '19 ประตู') {
        if(number.value !== '') {
            setNumberRush(number.value)
            number.value = ''
        }
    }
    else {
        if(number.value.length >= _num) {
            if(number.value.length == _num) {
                numbers.value.push(number.value)
            }
            else
                numbers.value.push(number.value.slice(0, _num))
            
            if(props.type === '6 กลับ') setSwap(number.value)
            number.value = ''
        }
    }
    
    setNumberUnique()
}

function setNumberUnique() {
    let outputArray = numbers.value.filter(function (v, i, self) {
        return i == self.indexOf(v);
    })

    numbers.value = outputArray
}

function setDouble() {
    let _num = numType('double')
    let digit = _num > 100 ? -3 : -2
    let f = _num > 100 ? "00" : "0"
    for(let i = 0; i <= 9; i++) {
        let n = i * _num
        numbers.value.push((f + n).slice(digit))
    }

    setNumberUnique()
}

function setSwap(number = null) {
    if(number === null) {
        numbers.value.forEach(num => {
            if(props.type === '2 ตัว') swapTwoNumber(num)
            if(props.type === '3 ตัว') swapThreeNumber(num)
        })
    }
    else swapThreeNumber(number)
}

function swapTwoNumber(number) {
    let _num = number.split('')
    if(_num.length === 2) {
        if(!checkNumDuplicate(_num, 1)) {
            numbers.value.push(`${_num[1]}${_num[0]}`)
        }
    }

    setNumberUnique()
}

function swapThreeNumber(number) {
    const threeLoop = [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
    let _num = number.split('')
    if(_num.length === 3) {
        if(!checkNumDuplicate(_num, 2)) {
            threeLoop.forEach(tl => {
                numbers.value.push(`${_num[tl[0]]}${_num[tl[1]]}${_num[tl[2]]}`)
            })
        }
    }

    setNumberUnique()
}

function setRushType(type) {
    rush = type
}

function setNumberRush(number) {
    let setRush = ''
    if(rush === 'a') {
        for(let i = 0; i <= 9; i++) numbers.value.push((number + i).slice(-2))
        for(let i = 0; i <= 9; i++) numbers.value.push((i + number).slice(-2))
    }
    else {
        for(let i = 0; i <= 9; i++) {
            if(rush === 'f') setRush = number + i
            if(rush === 'r') setRush = i + number
            numbers.value.push((setRush).slice(-2))
        }
    }
}

function checkNumDuplicate(num, length) {
    const duplicates = num.filter((item, index) => num.indexOf(item) !== index)
    if(duplicates.length === length) return true
    return false
}

function addNumber() {
    if(numbers.value.length > 0) {
        if(number_on.value > 0 || number_bottom.value > 0) {
            const _on = number_on.value > 0 ? parseInt(number_on.value) : ''
            const _bottom = number_bottom.value > 0 ? parseInt(number_bottom.value) : ''
            emit('toAddNumber', numbers.value, _on, _bottom, props.type)
            numbers.value = []
            number_on.value = number_bottom.value = ''
        }
        else emit('sometingWrong', 'blue-darken-2', 'กรุณาระบุราคา บน ล่าง / โต๊ด')
    }
    else emit('sometingWrong', 'blue-darken-2', 'กรุณาระบุตัวเลข')
}

const _numberType = () => {
    return props.type === '3 ตัว' ? 'โต๊ด' : 'ล่าง'
}
</script>