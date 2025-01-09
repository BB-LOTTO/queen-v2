<template>
    <v-row class="mb-4 row-chip-group-19">
        <v-chip-group
            selected-class="pink-accent-3"
            v-model="chipHelperOption"
            column
        >
            <v-col cols="12" md="4" class="col-chip py-0 mb-2">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    value="f"
                >
                    รูดหน้า
                    <v-icon class="ms-2">mdi-arrow-collapse-left</v-icon>
                </v-chip>
            </v-col>
            <v-col cols="12" md="4" class="col-chip py-0 mb-2">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    value="r"
                >
                    รูดหลัง
                    <v-icon class="ms-2">mdi-arrow-collapse-right</v-icon>
                </v-chip>
            </v-col>
            <v-col cols="12" md="4" class="col-chip py-0 mb-2">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    value="a"
                >
                    19 ประตู
                    <v-icon class="ms-2">mdi-sort-numeric-ascending</v-icon>
                </v-chip>
            </v-col>
            <v-col cols="12" md="6" class="col-chip py-0">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    value="p"
                >
                    วางโพย
                    <v-icon class="ms-2">mdi-file-document-edit-outline</v-icon>
                </v-chip>
            </v-col>
            <v-col cols="12" md="6" class="col-chip py-0">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    value="w"
                >
                    จับวิน
                    <v-icon class="ms-2">mdi-gesture-tap-button</v-icon>
                </v-chip>
            </v-col>
        </v-chip-group>
    </v-row>

    <v-row class="mb-0">
        <v-col v-if="chipHelperOption !== 'p'" cols="12">
            <v-chip-group
                v-model="rushNumbers"
                selected-class="bg-number-selected"
                multiple
                class="helper-number-list"
            >
                <v-chip
                    v-for="(n, i) in _number"
                    :key="i"
                    :text="n"
                    class="px-4"
                    @click="chipHelperOption === 'w' ? setNumberWin(n) : setNumberRush(n)"
                ></v-chip>
            </v-chip-group>
        </v-col>
        <v-col v-if="chipHelperOption === 'w'" cols="12">
            <v-row>
                <v-col cols="6" md="3" class="pb-0">
                    <v-btn variant="outlined" block @click="setNumber(2)">
                        วิน 2 ตัว
                    </v-btn>
                </v-col>
                <v-col cols="6" md="3" class="pb-0">
                    <v-btn variant="outlined" block @click="setNumber(2, 'w')">
                        วินเบิ้ล 2 ตัว
                    </v-btn>
                </v-col>
                <v-col cols="6" md="3" class="pb-0">
                    <v-btn variant="outlined" block @click="setNumber(3)">
                        วิน 3 ตัว
                    </v-btn>
                </v-col>
                <v-col cols="6" md="3" class="pb-0">
                    <v-btn variant="outlined" block @click="setNumber(3, 'w')">
                        วินเบิ้ล 3 ตัว
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4" offset-md="4">
                    <v-btn
                        variant="outlined"
                        append-icon="mdi-cached"
                        block
                        @click="winSwap()"
                    >
                        กลับเลข
                        <template v-slot:append>
                            <v-icon color="warning"></v-icon>
                        </template>
                    </v-btn>
                </v-col> 
            </v-row>
        </v-col>

        <v-col cols="12">
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
                                @click="clearNumbers()"
                            ></v-btn>
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:text>
                    <v-chip
                        v-for="(number, key) in numbers"
                        variant="flat"
                        :color="number.length <= 3 ? '#c6137f' : '#212121'"
                        class="px-4 me-2 mb-1"
                        :key="key"
                        :text="number"
                        @click="numbers.splice(key, 1)"
                    ></v-chip>
                </template>
            </v-card>
        </v-col>
        
        <v-col v-if="chipHelperOption === 'p'" cols="12">
            <v-textarea v-model="textPoy" label="วางโพย" variant="outlined" @keyup="setTextPoy()"></v-textarea>
        </v-col>
    </v-row>

    <v-row class="mt-0 mb-4">
        <v-col cols="12" :md="chipHelperOption === 'p' || chipHelperOption === 'w' ? '3' : '4'">
            <v-text-field
                density="compact"
                variant="outlined"
                v-model="price.on"
                label="บน"
                type="number"
                id="on-number"
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12" :md="chipHelperOption === 'p' || chipHelperOption === 'w' ? '3' : '4'">
            <v-text-field
                density="compact"
                variant="outlined"
                v-model="price.bottom"
                label="ล่าง"
                type="number"
                id="bottom-number"
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" :class="chipHelperOption === 'p' || chipHelperOption === 'w' ? '' : 'd-none'">
            <v-text-field
                density="compact"
                variant="outlined"
                v-model="price.tod"
                label="โต๊ด"
                type="number"
                id="tod-number"
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12" :md="chipHelperOption === 'p' || chipHelperOption === 'w' ? '3' : '4'">
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
const props = defineProps(['betLimit'])
const emit = defineEmits(['toAddPoy', 'sometingWrong'])
const _number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const numbers = ref([])
const rushNumbers = ref([])
const winNumbers = ref([])
const _rushNumbers = ref([])
const chipHelperOption = ref('w')
const textPoy = ref()
const price = ref({on: '', bottom: '', tod: ''})

watch(chipHelperOption, (newOption) => {
    if(newOption) clearNumbers()
})

function setNumber(length, double = null) {
    if(chipHelperOption.value !== 'w') {
        let getNumber = []
        numbers.value.forEach(n => {
            let _num = _number.find((_n, _i) => { return n === _i })
            getNumber.push(_num)
        })
        numbers.value = []
        rushNumbers.value = []
        _rushNumbers.value = []
    }
    else {
        winNumbers.value.forEach((n, i) => {
            if(length === 2) {
                for(let _i = i; _i < winNumbers.value.length; _i++) {
                    if(double === 'w') numbers.value.push(n + winNumbers.value[_i])
                    else {
                        if(n !== winNumbers.value[_i]) numbers.value.push(n + winNumbers.value[_i])
                    }
                }
            }
            if(length === 3) {
                for(let _i = i; _i < winNumbers.value.length; _i++) {
                    for(let y = _i; y < winNumbers.value.length; y++) {
                        if(double === 'w') numbers.value.push(n + winNumbers.value[_i] + winNumbers.value[y])
                        else {
                            if(n !== winNumbers.value[_i]) {
                                if(winNumbers.value[_i] !== winNumbers.value[y]) {
                                    numbers.value.push(n + winNumbers.value[_i] + winNumbers.value[y])
                                }
                            }
                        }
                    }
                }
            }
        })

        rushNumbers.value = []
        _rushNumbers.value = []
        winNumbers.value = []
    }

    setNumberUnique()
}

function winSwap() {
    numbers.value.forEach(n => {
        if(n.length === 2) numbers.value.push(n.split('')[1] + n.split('')[0])
        if(n.length === 3) {
            const threeLoop = [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
            let _num = n.split('')
            if(!checkNumDuplicate(_num, 2)) {
                threeLoop.forEach(tl => {
                    numbers.value.push(`${_num[tl[0]]}${_num[tl[1]]}${_num[tl[2]]}`)
                })
            }
        }
    })

    setNumberUnique()
}

function checkNumDuplicate(num, length) {
    const duplicates = num.filter((item, index) => num.indexOf(item) !== index)
    if(duplicates.length === length) return true
    return false
}

function setNumberUnique() {
    let outputArray = numbers.value.filter(function (v, i, self) {
        return i == self.indexOf(v);
    })

    numbers.value = outputArray
}

function setNumberWin(number) {
    winNumbers.value.push(number)
    // console.log(winNumbers.value)
}

function clearNumbers() {
    numbers.value = []
    winNumbers.value = []
    rushNumbers.value = []
    _rushNumbers.value = []
    textPoy.value = ''
}

function setNumberRush(number) {
    let setRush = ''
    let rush = chipHelperOption.value
    let hasNumber = _rushNumbers.value.findIndex(n => { return n === number })
    if(hasNumber < 0) {
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
        _rushNumbers.value.push(number)
    }
    else {
        if(rush === 'a') {
            for(let i = 0; i<= 9; i++) numberSplice(number, i)
            for(let i = 0; i<= 9; i++) numberSplice(i, number)
        }
        else {
            for(let i = 0; i<= 9; i++) {
                if(rush === 'f') numberSplice(number, i)
                if(rush === 'r') numberSplice(i, number)
            }
        }
        let rInx = _rushNumbers.value.findIndex(r => { return r === number })
        _rushNumbers.value.splice(rInx, 1)
    }
}

function numberSplice(num1, num2) {
    let inx = numbers.value.findIndex(n => { return n === (num1 + num2) })
    numbers.value.splice(inx, 1)
}

function setTextPoy() {
    numbers.value = []
    const txt = textPoy.value.split('')
    let _number = ''
    txt.forEach((t) => {
        if(/^-?\d+$/.test(t)) _number += t
        else {
            if(_number !== '') {
                numbers.value.push(_number)
                _number = ''
            }
        }

        let inx = numbers.value.findIndex(n => { return n === _number })
        if(inx >= 0) numbers.value.splice(inx, 1)
    })

    if(_number !== '') numbers.value.push(_number)
}

function addNumber() {
    if(numbers.value.length > 0) {
        if(price.value.on > 0 || price.value.bottom > 0 || price.value.tod > 0) {
            const _on = price.value.on > 0 ? parseInt(price.value.on) : ''
            const _bottom = price.value.bottom > 0 ? parseInt(price.value.bottom) : ''
            const _tod = price.value.tod > 0 ? parseInt(price.value.tod) : ''
            emit('toAddPoy', numbers.value, _on, _bottom, _tod)

            price.value.on = price.value.bottom = price.value.tod = ''
            clearNumbers()
        }
        else emit('sometingWrong', 'blue-darken-2', 'กรุณาระบุราคา บน ล่าง / โต๊ด')
    }
    else emit('sometingWrong', 'blue-darken-2', 'กรุณาระบุตัวเลข')
}

</script>

<style scoped>
.bg-number-selected {
    background-color: #c6137f;
    color: #fff;
}
</style>