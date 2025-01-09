<template>
    <v-row>
        <!-- Desktop -->
        <v-col cols="12" class="d-none d-lg-block">
            <v-table density="compact">
                <thead>
                    <tr style="background-color: #eee;">
                        <th class="text-center text-mitr-400">
                            ชื่อหวย
                        </th>
                        <th class="text-center text-mitr-400">
                            เลขที่ออก
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(result, i) in props.result">
                        <td class="text-center">{{ result.name }}</td>
                        <td class="text-center">{{ result.number }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>

        <!-- Mobile -->
        <v-col cols="12" class="d-block d-lg-none">
            <v-row v-for="(result, i) in props.result" class="border-b">
                <v-col cols="7" class="font-weight-bold text-body-1 pb-0">{{ result.name }}</v-col>
                <v-col cols="5">
                    <p class="text-subtitle-2 font-weight-bold text-grey-lighten-1">
                        เลขที่ออก <strong class="text-grey-darken-4">{{ result.number }}</strong>
                    </p>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps(['result'])
</script>