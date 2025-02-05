<template>
    <v-tooltip
        location="top"
    >
        <template v-slot:activator="{ props }">
            <v-icon v-bind="props" 
                icon="mdi-square-edit-outline"
                class="text-orange-darken-4 cursor-pointer mt-n1"
            >
            </v-icon>
            <v-menu
                activator="parent"
                location="end"
                transition="fade-transition"
                :close-on-content-click="false"
            >
                <v-card min-width="280" min-height="60" class="py-2">
                    <v-responsive
                        class="mx-auto"
                        max-width="240"
                    >
                        <strong>แก้ไขยอดแทง {{ _number.type }}{{ _number.trade.split('x')[0] }}</strong>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            hide-details="auto"
                            type="number"
                            label="ยอดแทง (฿)"
                            hide-spin-buttons
                            :model-value="_number.bet[0].price"
                            :id="`_input-${_k}`"
                            class="py-2 border-b-md"
                        >
                            <template v-slot:append>
                                <v-btn variant="outlined" size="small" prepend-icon="mdi-checkbox-outline" @click="updateCheckout(_k)">
                                    <template v-slot:prepend>
                                        <v-icon color="success"></v-icon>
                                    </template>
                                    แก้ไข
                                </v-btn>
                            </template>
                        </v-text-field>
                        <div v-if="_number.numbers.length > 1">
                            <p class="text-subtitle-2 font-weight-bold">แก้ไขยอดแทงตามหมายเลข</p>
                            <div class="mt-1 pb-3 pt-2 number-lists">
                                
                                <v-row v-if="rowReload" 
                                    v-for="(number, i) in _number.numbers.sort()" 
                                    class="border-b" 
                                    :id="`_row-number-${i}`"
                                >
                                    <v-col cols="3" class="py-1 d-flex justify-center align-center">{{ number }}</v-col>
                                    <v-col cols="9" class="py-1 d-flex align-center">
                                        <span class="me-2 text-caption">x</span>
                                        <v-text-field
                                            density="compact"
                                            variant="outlined"
                                            hide-details="auto"
                                            type="number"
                                            label="ยอดแทง (฿)"
                                            hide-spin-buttons
                                            :model-value="_number.bet[0].price"
                                            :id="`_input-number-${i}`"
                                            class="py-1"
                                        >
                                            <template v-slot:append>
                                                <v-icon color="success" @click="updateNumberCheckout(_k, i)">mdi-checkbox-outline</v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                    </v-responsive>
                </v-card>
            </v-menu>
        </template>
        <span>แก้ไขยอดแทง</span>
    </v-tooltip>
</template>


<script setup>
const props = defineProps(['n', 'k'])
const emit = defineEmits(['checkoutEdit', 'numberEdit'])

const _number = ref(props.n)
const _k = ref(props.k)
const rowReload = ref(true)

async function updateCheckout(k) {
    emit('checkoutEdit', k)
    await reloadRow()
}

async function updateNumberCheckout(k, i) {
    emit('numberEdit', k, i)
    await reloadRow()
}

async function reloadRow() {
    rowReload.value = false
    await nextTick()
    rowReload.value = true
}
</script>


<style>
.number-lists {
    max-height: 285px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
}
.number-lists::-webkit-scrollbar {
  width: 5px;
}
.number-lists::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.number-lists::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
.number-lists::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>