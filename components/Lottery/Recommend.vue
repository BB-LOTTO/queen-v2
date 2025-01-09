<template>
    <v-card variant="flat" class="my-5 pa-2 rounded-xl lotto-recommend-card">
        <template v-slot:title>
            <v-row class="mb-1">
                <v-col cols="6">
                    <h2 class="text-h6 text-lg-h4">หวยเด่นประจำวัน</h2>
                </v-col>
                <v-col cols="6" class="text-end">
                    <v-btn
                        v-if="props.btnActive"
                        class="text-none text-white rounded-xl"
                        color="#c6137f"
                        variant="flat"
                        to="/lottery/bet"
                    >
                        หวยทั้งหมด
                    </v-btn>
                </v-col>
            </v-row>
        </template>

        <template v-slot:text>
            <v-slide-group class="lotto-recommend-slide">
                <v-slide-group-item
                    v-for="(item, index) in lottos"
                    :key="index"
                >
                    <v-card
                        variant="flat"
                        class="mx-2 rounded-xl"
                        width="180"
                        height="228"
                        border
                    >
                        <v-img :src="'/lotto/' + item.img" class="rounded-xl" cover>
                            <v-toolbar color="transparent" class="text-center">
                                <template v-slot:title>
                                    <span class="text-mitr-400">{{ item.name }}</span>
                                </template>
                            </v-toolbar>
                        </v-img>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </template>
    </v-card>
</template>

<script setup>
const props = defineProps(['btnActive'])
const lottos = [
    {name: 'หวยรัฐบาลไทย', img: 'th-gov.png'},
    {name: 'หวยหุ้นใต้หวัน', img: 'stock-twse.png'},
    {name: 'หวยหุ้นนิคเคอิ', img: 'stock-nky.png'},
    {name: 'หวยหุ้นเกาหลีใต้', img: 'stock-krx.png'},
    {name: 'หวยหุ้นฮั่งเส็ง', img: 'stock-hsi.png'},
]
</script>

<style>
.lotto-recommend-slide .v-slide-group__next, 
.lotto-recommend-slide .v-slide-group__prev {
    flex: 0 1 30px;
    min-width: 30px;
}
</style>