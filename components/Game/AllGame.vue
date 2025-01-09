<template>
    <v-card variant="flat" class="my-5 pa-2 rounded-xl">
        <template v-slot:title>
            <h2 class="text-h6 text-lg-h4">เกมยอดนิยม</h2>
        </template>
        <template v-slot:subtitle>
            <p class="text-subtitle-1 text-pink-darken-3">คัดสรรมาเพื่อคุณโดยเฉพาะ</p>
        </template>

        <!-- Desktop -->
        <v-card-text class="text-h3 py-3 text-mitr d-none d-md-block">
            <v-row>
                <v-col cols="12" md="12">
                    <v-row>
                        <v-col cols="6" md="2" v-for="(item, index) in games">
                            <v-fab-transition appear>
                                <v-img :src="'/games/' + item" class="rounded-xl cursor-pointer"/>
                            </v-fab-transition>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- Mobile -->
        <v-card-text class="d-block d-md-none pt-0">
            <v-slide-group>
                <v-slide-group-item
                    v-for="(item, index) in games"
                    :key="index"
                    class="px-0 "
                >
                    <v-card
                        variant="flat"
                        class="mx-1 rounded-xl"
                        height="230"
                        width="150"
                    >
                        <div class="d-flex fill-height align-center justify-center">
                            <v-scale-transition>
                                <v-img :src="'/games/' + item" class="rounded-xl" />
                            </v-scale-transition>
                        </div>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-card-text>
    </v-card>
    
</template>

<script setup>
const games = [
    'cover-allbet.jpg',
    'cover-asia-gaming.jpg',
    'cover-bng.jpg',
    'cover-dream-gaming.jpg',
    'cover-evolution.jpg',
    'cover-ezg.jpg',
    'cover-ez-sportbook.jpg',
    'cover-habanero.jpg',
    'cover-joker.jpg',
    'cover-kagaming.jpg',
    'cover-microgaming.jpg',
    'cover-onlyplay.jpg'
]
</script>