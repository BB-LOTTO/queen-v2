<template>
    <v-row>
        <!-- Desktop -->
        <v-col cols="12" class="d-none d-lg-block">
            <v-table density="compact">
                <thead>
                    <tr style="background-color: #eee;">
                        <th class="text-center text-mitr-400 w-25">
                            ชื่อหวย
                        </th>
                        <th class="text-center text-mitr-400">
                            ปิดรับ
                        </th>
                        <th class="text-center text-mitr-400">
                            ครึ่งราคา
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(num, i) in props.number">
                        <td class="text-center">{{ lottoName(i) }}</td>
                        <td class="text-center">
                            <strong 
                                v-for="n in setNumberType(num, 2)"
                                class="text-num-close me-1"
                            >
                                {{ n }}<span class="is-comma">,</span>
                            </strong>
                        </td>
                        <td class="text-center">
                            <strong 
                                v-for="n in setNumberType(num, 1)"
                                class="text-num-half me-1"
                            >
                                {{ n }}<span class="is-comma">,</span>
                            </strong>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>

        <!-- Mobile -->
        <v-col cols="12" class="d-block d-lg-none">
            <v-row v-for="(num, i) in props.number" class="border-b">
                <v-col cols="12" class="font-weight-bold text-body-1 pb-0">{{ lottoName(i) }}</v-col>
                <v-col cols="6">
                    <p class="text-subtitle-2 font-weight-bold text-grey-lighten-1">เลขปิดรับ</p>
                    <strong 
                        v-for="n in setNumberType(num, 2)"
                        class="text-num-close text-subtitle-1 font-weight-bold me-1"
                    >
                        {{ n }}<span class="is-comma">,</span>
                    </strong>
                </v-col>
                <v-col cols="6">
                    <p class="text-subtitle-2 font-weight-bold text-grey-lighten-1">เลขครึ่งราคา</p>
                    <strong 
                        v-for="n in setNumberType(num, 1)"
                        class="text-num-half text-subtitle-1 font-weight-bold me-1"
                    >
                        {{ n }}<span class="is-comma">,</span>
                    </strong>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps(['number', 'lotto'])

const lottoName = (i) => {
    let result = Object.entries(props.lotto)
    let lotto = result.find(item => { return item[0] === i })

    if(lotto) {
        return lotto[1].name
    }   
}

const setNumberType = (number, type) => {
    let _number = []
    number.forEach(n => { if(n.type === type) _number.push(n.number) })
    return _number
}
</script>

<style scoped>
.text-num-close:last-child .is-comma,
.text-num-half:last-child .is-comma {
    display: none;
}
</style>