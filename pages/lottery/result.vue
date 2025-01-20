<template>
    <NuxtLayout name="header">
        <template #sub-title>หวยออนไลน์</template>
        <template #title>ตรวจรางวัล</template>
    </NuxtLayout>
    <Head>
        <Title>โพยหวย - {{ useRuntimeConfig().public.webName }}</Title>
    </Head>
    <v-container class="mt-n10 main-container">
        <v-row>
            <v-col cols="3" class="d-none d-lg-block">
                <SideBarTradeLeftBar/>
            </v-col>
            <v-col cols="12" lg="9">
                <v-card class="rounded-xl pa-3">
                    <template v-slot:text>
                        <div class="mb-3">
                            <span class="text-mitr-400 text-h6">ตรวจรางวัลของคุณ</span>
                            <v-select
                                v-model="round"
                                :items="rounds"
                                density="compact"
                                variant="outlined"
                                label="งวดวันที่"
                            ></v-select>
                        </div>

                        <v-card v-if="numbers !== ''" variant="outlined" class="mx-auto rounded-xl mb-6">
                            <v-card-item>
                                <v-card-title class="text-md-h4 text-h6 py-2 text-mitr">
                                    {{ betName }}
                                    <v-card-subtitle class="mt-1">
                                        งวดประจำวันที่ {{ $dateFormat(betRound) }}
                                    </v-card-subtitle>
                                </v-card-title>
                            </v-card-item>

                            <v-card-text class="px-md-7 mb-5">
                                <v-row>
                                    <v-col cols="12" md="6" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.teng_lang_nha_3.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.teng_lang_nha_3.number }}
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.tode_3.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.tode_3.number }}
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.teng_bon_1.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.teng_bon_1.number }}
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.teng_bon_2.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.teng_bon_2.number }}
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.teng_bon_3.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.teng_bon_3.number }}
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.teng_lang_1.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.teng_lang_1.number }}
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.teng_lang_2.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.teng_lang_2.number }}
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">{{ numbers.teng_lang_3.name }}</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            {{ numbers.teng_lang_3.number }}
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <v-card variant="outlined" class="mx-auto rounded-xl d-none">
                            <v-card-item>
                                <v-card-title class="text-md-h4 text-h6 py-2 text-mitr">
                                    <v-avatar>
                                        <v-img alt="" src="/icon/thai_lottery.png"></v-img>
                                    </v-avatar>
                                    รางวัลสลากกินแบ่งรัฐบาล
                                    <v-card-subtitle>
                                        งวดประจำวันที่ {{ round || rounds[rounds.length-1] }}
                                    </v-card-subtitle>
                                </v-card-title>
                            </v-card-item>

                            <v-card-text class="px-md-7 mb-5">
                                <v-row>
                                    <v-col cols="12" md="12" class="text-center">
                                        <span class="text-h6 text-mitr">รางวัลที่ 1</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h4 text-pink-accent-4 text-mitr">
                                            2 5 3 6 0 3
                                        </div>
                                    </v-col>
                                    <v-col cols="5" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">เลขหน้า 3 ตัว</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            900 975
                                        </div>
                                    </v-col>
                                    <v-col cols="5" md="4" class="text-center">
                                        <span class="text-md-h6 text-mitr">เลขท้าย 3 ตัว</span>
                                        <div
                                            class="pa-4 text-center bg-grey-lighten-4 rounded-lg rounded-be-0 text-h7 text-md-h4 text-mitr">
                                            382 704
                                        </div>
                                    </v-col>
                                    <v-col cols="2" md="4" class="text-center">
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
                </v-card>
            </v-col>
        </v-row>

        <v-overlay
            :model-value="overlay"
            class="align-center justify-center"
        >
            <v-progress-circular
                color="primary"
                size="64"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
    </v-container>
</template>


<script setup>
const rounds = ref(['1 พฤศจิกายน 2567', '16 พฤศจิกายน 2567', '1 ธันวาคม 2567', '16 ธันวาคม 2567', '1 มกราคม 2568', '17 มกราคม 2568'])
const round = ref(null)
const betName = ref('')
const betRound = ref('')
const numbers = ref('')
const overlay = ref(false)
const type = ['teng_bon_1', 'teng_bon_2', 'teng_bon_3', 'teng_lang_1', 'teng_lang_2', 'teng_lang_3', 'teng_lang_nha_3', 'tode_3']

onMounted(async() => {
    await getResultNumber()
})

async function getResultNumber() {
    overlay.value = true
    try {
        const res = await $fetch('/api/lottery/resultNumbersRoundList')

        if(res.status === 'OK') {
            betName.value = res.data[0].betName
            betRound.value = res.data[0].betRound
            numbers.value = res.data[0].datas
        }
        else numbers.value = ''
    } catch(err) {
        console.log(err)
    }
    finally {
        overlay.value = false
    }
}
</script>