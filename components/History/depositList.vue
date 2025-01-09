<template>
    <v-list lines="two">
        <v-list-item
            v-for="item in props.deposits"
            :key="item.id"
        >
            <template v-slot:title>
                <div style="line-height: 10px;">
                    <small class="text-caption text-pink-darken-1 mb-0">
                        {{ item.id }}
                        <span class="text-grey-darken-1 text-caption">
                            <v-icon v-if="item.state === 1" color="green-darken-3 pb-1">mdi-check-bold</v-icon>
                            <!-- <v-icon color="green-darken-3 pb-1">mdi-menu-left-outline</v-icon> -->
                            <!-- [{{ item.refBank.shortName }}] {{ item.refAccountNumber }} | {{ item.refAccountName }} -->
                        </span>
                    </small>
                    <p class="mb-0 text-subtitle-1" v-html="setDateTH(item.completedOn)"></p>
                </div>
            </template>
            <template v-slot:subtitle>
                <!-- <small>[{{ item.refBank.shortName }}] {{ item.refAccountNumber }} | {{ item.refAccountName }}</small> -->
            </template>

            <template v-slot:append>
                <p class="font-weight-bold">{{ $numberFormat(item.amount) }} ฿</p>
            </template>

            <v-divider></v-divider>
        </v-list-item>
    </v-list>
</template>

<script setup>
const props = defineProps(['deposits'])

const setDateTH = (date) => {
    const _date = new Date(date)
    const _time = `${String(_date.getHours()).padStart(2, '0')}:${String(_date.getMinutes()).padStart(2, '0')}`
    return _date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + `<small>${_time}</small>`
}
</script>