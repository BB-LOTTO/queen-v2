<template>
    <v-card class="mx-auto" hover>
        <v-card-item>
            <v-card-title class="text-md-h4 text-h6 py-2 text-mitr ">
                <v-avatar>
                    <v-img alt="" :src="icon"></v-img>
                </v-avatar>
                {{ title }}
                <v-card-subtitle>
                    งวดประจำวันที่ 1 มีนาคม 2567
                </v-card-subtitle>
            </v-card-title>
        </v-card-item>

        <v-card-text class="px-md-7 mb-5">
            <v-row>
                <v-col cols="12" md="4" class="">
                    <span class="text-h6 text-mitr">รางวัลที่ 1</span>
                    <div
                        class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h4 text-pink-accent-4 text-mitr">
                        2 5 3 6 0 3
                    </div>
                </v-col>
                <v-col cols="5" md="3" class="text-center">
                    <span class="text-md-h6 text-mitr">เลขหน้า 3 ตัว</span>
                    <div
                        class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                        900 975
                    </div>
                </v-col>
                <v-col cols="5" md="3" class="text-center">
                    <span class="text-md-h6 text-mitr">เลขท้าย 3 ตัว</span>
                    <div
                        class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                        382 704
                    </div>
                </v-col>
                <v-col cols="2" md="2" class="text-center">
                    <span class="text-md-h6 text-mitr">เลขท้าย 2 ตัว</span>
                    <div
                        class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                        79
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['title', 'icon']
}
</script>