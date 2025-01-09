<template>
    <div class="text-center mt-1 mb-4">
        <v-dialog v-model="dialog" max-width="1200" persistent>
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-if="props.stock_count > 0" v-bind="activatorProps" prepend-icon="mdi-cash-plus"
                    class="text-none mb-0" color="#4caf50" variant="tonal" block>
                    ใส่ราคา
                </v-btn>
            </template>

            <template v-slot:default="{ dialog }">
                <v-card class="add-price-dialog">
                    <template v-slot:title>
                        <v-row>
                            <v-col cols="8">
                                <h4>ใส่ราคา</h4>
                            </v-col>
                            <v-col cols="4" class="text-end">
                                <v-icon @click="closeDialog">mdi-close</v-icon>
                            </v-col>
                        </v-row>

                        <v-divider class="my-3"></v-divider>
                    </template>


                    <template v-slot:text>
                        <v-list lines="one" density="compact" class="lottery-selected-list-show">
                            <form ref="htmlFormRef">
                                <div v-for="(_s, _i) in props.stock" :key="_i">

                                    <div v-if="_s.length > 0" class="mb-5">
                                        <v-sheet class="font-weight-bold">
                                            {{ props.stock_type[_i] }}
                                            <small class="ms-2 text-medium-emphasis">{{ _s.length }} รายการ</small>
                                            <small class="ms-1">
                                                <v-tooltip activator="parent" location="top">
                                                    <template v-slot:activator="{ props }">
                                                        <v-icon
                                                            icon="mdi-delete-circle-outline text-danger cursor-pointer"
                                                            @click="emit('toRemoveType', _i)"></v-icon>
                                                    </template>
                                                    <span>ล้างทุกรายการ</span>
                                                </v-tooltip>
                                            </small>
                                        </v-sheet>

                                        <v-table density="compact">
                                            <thead>
                                                <tr>
                                                    <th class="text-left font-weight-bold" style="width: 15%;">ตัวเลข
                                                    </th>
                                                    <th class="text-left"></th>
                                                    <th class="text-center font-weight-bold">อัตราคูณ</th>
                                                    <th class="text-center font-weight-bold">แสดงผล</th>
                                                    <th class="text-left"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(n, i) in _s" :key="i">
                                                    <td>
                                                        <small class="me-2">{{ i + 1 }}. </small>
                                                        <span class="text-primary text-mitr-400">{{ n.number }}</span>
                                                    </td>
                                                    <td class="py-2">
                                                        <v-text-field :name="_i + i" model-value="10" density="compact"
                                                            variant="outlined" type="number" label="ราคา" required>
                                                        </v-text-field>

                                                    </td>
                                                    <td class="text-center">
                                                        {{ n.multiply }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ n.multiply * 10 }}
                                                    </td>
                                                    <td class="text-center">
                                                        <small class="ms-2 d-inline-flex cursor-pointer"
                                                            @click="emit('toRemoveNumber', n.index, _i)">
                                                            <v-icon aria-hidden="false"
                                                                color="#DD0000">mdi-close-circle-outline</v-icon>
                                                        </small>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-table>

                                        <v-divider></v-divider>
                                        <v-divider :thickness="10" class="border-opacity-0"></v-divider>
                                    </div>
                                </div>
                            </form>
                        </v-list>
                    </template>


                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="ยกเลิก" variant="text" @click="closeDialog"></v-btn>

                        <v-btn color="surface-variant" text="ส่งโพย" variant="flat" @click="submitForm"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const htmlFormRef = ref(null)
const data = ref({})
const props = defineProps(['stock_count', 'stock', 'stock_type', 'lotto_list', 'username'])
let cf = 0
//console.log(props.stock)
const emit = defineEmits(['toRemoveType', 'toRemoveNumber'])
const dialog = ref(false)
// const prices = ref([])
const formData = ref({
    fields: []
})

for (const key in props.stock) {
    let poys = props.stock[key]
    for (let i in poys) {
        let lotto_number = poys[i]
        formData.value.fields.push(key + lotto_number.number)
    }
}

const submitForm = () => {
    //console.log(htmlFormRef.value)
    const formFields = new FormData(htmlFormRef.value)

    const allData = {}
    let i = 0;
    formFields.forEach((value, key) => {
        allData[i] = parseInt(value)
        i++
    })

    //console.log('Form Data:', allData)
    sendPoy(allData)

    // ทำการส่งข้อมูลไปยัง API หรือประมวลผลตามที่ต้องการ
}

async function sendPoy(allData) {

    let newArr = [];
    let i = 0
    for (const key in props.stock) {

        let poys = props.stock[key]
        let arr = [];
        for (let i in poys) {
            let lotto_number = poys[i]
            arr.push({
                'number': lotto_number.number,
                'multiply': lotto_number.multiply,
                'price': allData[i]
            });
            i++
        }

        if (arr.length > 0) {
            newArr[key] = arr;
        }
       
    }

    console.log(JSON.stringify(Object.assign({}, newArr)))
    try {
        const data = await $fetch('/api/lottery/sendPoy', {
            method: 'POST',
            body: {
                "username": "user",
                "roundId": "9b2781a8-ad07",
                "poyList": JSON.parse(JSON.stringify(Object.assign({}, newArr)))
            }
        })
        closeDialog()
        
        console.log('Form submitted successfully:', { data })

    }
    catch (error) {
        console.log(error)
    }


}

function closeDialog() {
    dialog.value = false
}
</script>

<style scoped>
/* width */
.add-price-dialog::-webkit-scrollbar {
    width: 7px;
}

/* Track */
.add-price-dialog::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.add-price-dialog::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

/* Handle on hover */
.add-price-dialog::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.text-danger {
    color: #B71C1C;
}
</style>