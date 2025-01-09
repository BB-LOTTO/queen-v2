<template>
    <v-row>
        <v-col cols="12">
            <!-- Desktop -->
            <v-table density="compact" class="d-none d-lg-block">
                <thead>
                    <tr class='text-caption' style="background-color: #eee;">
                        <th class="text-mitr-400 w-25">
                            ชื่อหวย
                        </th>
                        <th class="text-center text-mitr-400">
                            อัตราจ่าย
                        </th>
                        <th class="text-center text-mitr-400">
                            แทงขั้นต่ำ/ครั้ง
                        </th>
                        <th class="text-center text-mitr-400">
                            แทงสูงสุด/ครั้ง
                        </th>
                        <th class="text-center text-mitr-400">
                            แทงสูงสุด/เลข
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in lotto()">
                        <td>{{ item.name }}</td>
                        <td class="text-center">{{ $numberFormat(item.multiply) }}</td>
                        <td class="text-center">{{ $numberFormat(item.betMin) }}</td>
                        <td class="text-center">{{ $numberFormat(item.betMax) }}</td>
                        <td class="text-center">{{ $numberFormat(item.betMaxCustomer) }}</td>
                    </tr>
                </tbody>
            </v-table>

            <!-- Mobile -->
             <div class="d-block d-lg-none">
                <v-row v-for="item in lotto()" class="border-b">
                    <v-col cols="12" class="pb-0"><p class="font-weight-bold text-body-1">{{ item.name }}</p></v-col>
                    <v-col cols="6" class="pb-0">
                        <p class="text-subtitle-2 font-weight-bold text-grey-lighten-1">อัตราจ่าย</p>
                        <p class="text-subtitle-1">{{ $numberFormat(item.multiply) }}</p>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <p class="text-subtitle-2 font-weight-bold text-grey-lighten-1">แทงขั้นต่ำ/ครั้ง</p>
                        <p class="text-subtitle-1">{{ $numberFormat(item.betMin) }}</p>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                        <p class="text-subtitle-2 font-weight-bold text-grey-lighten-1">แทงสูงสุด/ครั้ง</p>
                        <p class="text-subtitle-1">{{ $numberFormat(item.betMax) }}</p>
                    </v-col>
                    <v-col cols="6" class="pt-0">
                        <p class="text-subtitle-2 font-weight-bold text-grey-lighten-1">แทงสูงสุด/เลข</p>
                        <p class="text-subtitle-1">{{ $numberFormat(item.betMaxCustomer) }}</p>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps(['lottoList'])

const lotto = () => {
    let _lotto = []
    let result = Object.entries(props.lottoList)
    result.forEach(r => { _lotto.push(r[1]) })
    return _lotto
}
</script>