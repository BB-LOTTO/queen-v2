<template>
    <v-row v-if="props.type === '2 ตัว' || props.type === '3 ตัว'" class="mb-4">
        <v-col cols="12" md="4">
            <v-btn
                variant="outlined"
                append-icon="mdi-cached"
                block
                @click="emit('setNumberSwap')"
            >
                กลับเลข
                <template v-slot:append>
                    <v-icon color="warning"></v-icon>
                </template>
            </v-btn>
        </v-col>
        <v-col cols="12" md="4">
            <v-btn
                variant="outlined"
                :append-icon="props.type === '2 ตัว' ? 'mdi-numeric-2-box-multiple-outline' : 'mdi-numeric-3-box-multiple-outline'"
                block
                @click="emit('setNumberDouble')"
            >
                {{ _numberType() }}
                <template v-slot:append>
                    <v-icon color="warning"></v-icon>
                </template>
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="props.type === '19 ประตู'" class="mb-4 row-chip-group-19">
        <v-chip-group
            selected-class="pink-accent-3"
            v-model="chipSelect"
            column
        >
            <v-col cols="12" md="4" class="col-chip py-0">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    append-icon="mdi-arrow-collapse-left"
                    value="f"
                    @click="emit('setNumberRush', 'f')"
                >
                    รูดหน้า
                </v-chip>
            </v-col>
            <v-col cols="12" md="4" class="col-chip py-0">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    append-icon="mdi-arrow-collapse-right"
                    value="r"
                    @click="emit('setNumberRush', 'r')"
                >
                    รูดหลัง
                </v-chip>
            </v-col>
            <v-col cols="12" md="4" class="col-chip py-0">
                <v-chip
                    variant="outlined"
                    color="pink-accent-3"
                    label
                    append-icon="mdi-sort-numeric-ascending"
                    value="a"
                    @click="emit('setNumberRush', 'a')"
                >
                    19 ประตู
                </v-chip>
            </v-col>
        </v-chip-group>
    </v-row>
</template>

<script setup>
const props = defineProps(['type'])
const emit = defineEmits(['setNumberDouble', 'setNumberSwap', 'setNumberRush'])
const chipSelect = ref('a')

const _numberType = () => {
    return props.type === '2 ตัว' ? 'เลขเบิ้ล' : 'เลขตอง'
}

</script>