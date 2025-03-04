<template>
    <v-card 
        variant="flat"
        class="rounded-xl mb-4 py-3"
    >
        <v-tabs
            v-model="tab"
            color="#c6137f"
        >
            <v-tab v-for="lotto in props.lottoLists" :value="lotto[0]">{{ lotto[1].name }}</v-tab>
        </v-tabs>

        <v-window 
            v-model="tab"
        >
            <v-window-item
                v-for="_lotto in props.lottoLists"
                :key="_lotto[0]"
                :value="_lotto[0]"
            >
                <v-container fluid>
                    <v-row class="pt-2 px-2">
                        <v-col cols="12">
                            <p class="mb-2 text-mitr-400">ระบุเลขที่ต้องการแทง</p>
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                v-model="l_number"
                                :label="_lotto[1].name"
                                type="number"
                                id="input-number" 
                                :min="0"
                                hide-details
                                @keyup="setLottoNumber()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-window-item>
        </v-window>

        <div class="px-6">
            <v-card variant="tonal" color="grey-lighten-1" class="mb-4">
                <template v-slot:subtitle>
                    <v-row>
                        <v-col cols="9" md="11">
                            <strong style="color: #000;" class="me-3">จำนวน {{ tab_numbers.length }} รายการ</strong>
                        </v-col>
                        <v-col cols="3" md="1" class="text-end">
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
                        variant="flat"
                        color="#c6137f"
                        class="px-4 me-2 mb-1"
                        v-for="(n, key) in tab_numbers.sort()"
                        :key="key"
                        :text="n.number"
                        @click="clearTabNumber(key)"
                    ></v-chip>
                </template>

                <template v-if="tab_numbers.length > 0" v-slot:actions>
                    <div class="bg-white text-end d-flex justify-end align-center w-100 border-t-sm py-2">
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            v-model="l_price"
                            label="ใส่ราคา"
                            type="number"
                            class="me-3"
                            id="on-number"
                            hide-details
                            @keyup.enter="addPoyPrice()"
                        ></v-text-field>
                        <v-btn 
                            :disabled="l_price === ''"
                            prepend-icon="mdi-plus" 
                            color="green-darken-2 font-weight-medium" 
                            @click="addPoyPrice()"
                        >
                            เพิ่มรายการ
                        </v-btn>
                    </div>
                </template>
            </v-card>
        </div>
    </v-card>
</template>


<script setup>
const props = defineProps(['lottoLists', 'lottoCount'])
const emit = defineEmits(['toAddPoyList'])
const tab = ref(0)
const numbers = ref([])
const tab_numbers = ref([])
const l_number = ref('')
const l_price = ref('')
const add_poy_list = ref([])

watch(tab, (n_tab) => { 
    tab_numbers.value = numbers.value.filter(l => { return l.type === n_tab })
    l_number.value = l_price.value = '' 
})

function setLottoNumber() {
    const _index = tab.value === 0 ? 0 : props.lottoLists.findIndex(l => { return l[0] === tab.value })
    const _count = props.lottoCount.find((l, i) => { return i === _index })
    
    if(l_number.value.length >= _count) {
        if(l_number.value.length == _count) {
                const numberDup = numbers.value.findIndex(n => { return n.type === props.lottoLists[_index][0] && n.number == l_number.value })
                if(numberDup < 0) numbers.value.push({ 'type': props.lottoLists[_index][0], 'number': l_number.value })
            }
        else
            numbers.value.push(l_number.value.slice(0, _count))
        
        tab.value = props.lottoLists[_index][0]
        tab_numbers.value = numbers.value.filter(l => { return l.type === props.lottoLists[_index][0] })
        l_number.value = ''
    }
}

function clearTabNumber(key) {
    const num = tab_numbers.value[key]
    const idx = numbers.value.findIndex(item => { return item.type === tab.value && item.number === num.number })
    tab_numbers.value.splice(key, 1)
    numbers.value.splice(idx, 1)
}

function clearNumbers() {
    tab_numbers.value = []
    let removeIndex = []

    if(tab.value === 0) numbers.value = []
    else {
        numbers.value.forEach((n, i) => { if(n.type === tab.value) removeIndex.push(i) })

        for (let i = removeIndex.length - 1; i >= 0; i--) {
            let index = removeIndex[i]
            if (index >= 0 && index < numbers.value.length) {
                numbers.value.splice(index, 1)
            }
        }
    }
}

function addPoyPrice() {
    if(l_price.value !== '') {
        let _num = []

        const numberSelected = numbers.value.filter(item => { return tab.value === item.type })
        numberSelected.forEach(n => { _num.push(n.number) })
        let poyList = {'type': tab.value, 'number': _num, 'price': parseInt(l_price.value)}

        // const _isHas = add_poy_list.value.findIndex(a => { return a.type === tab.value && a.price === parseInt(l_price.value) })
        // if(_isHas < 0) {
        //     numberSelected.forEach(n => { _num.push(n.number) })
        //     add_poy_list.value.push({'type': tab.value, 'number': _num, 'price': parseInt(l_price.value)})
        // }
        // else
        //     numberSelected.forEach(n => { add_poy_list.value[_isHas].number.push(n.number) })

        l_price.value = ''
        emit('toAddPoyList', poyList)

        clearNumbers()
    }

    // console.log(add_number.value)
}

</script>