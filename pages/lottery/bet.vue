<template>
    <NuxtLayout name="header">
        <template #sub-title>หวยออนไลน์</template>
        <template #title>หวยประจำวัน</template>
    </NuxtLayout>
    <Head>
        <Title>หวยเด่นประจำวัน - {{ useRuntimeConfig().public.webName }}</Title>
    </Head>
    <v-container class="mt-n16 main-container">
        <LotteryRecommend></LotteryRecommend>
        <div class="d-flex align-end">
            <h2 class="text-mitr-400 me-2">แทงหวย</h2>
        </div>
        <v-card
            class="mx-auto px-2 pa-lg-4 pb-5 mb-8 rounded-xl"
        >
            <v-card-title class="px-0">
                <h2 class="text-mitr pb-1">หวยไทย</h2>
            </v-card-title>

            <v-row>
                <v-col v-for="lotto in cardList.filter(c => c.status === '1' || c.status === '2')" cols="6" md="3" xl="3">
                    <LotteryBet
                        :title="lotto.lotterys.name"
                        :openDate="lotto.roundFinalDt"
                        :time="$timeFormat(lotto.closeDate)"
                        :closeDate="lotto.closeDate"
                        :bg="lotto.bg"
                        :image="lotto.image"
                        :roundId="lotto.roundId"
                        :lotteryId="lotto.lotteryId"
                        :status="lotto.status"
                    ></LotteryBet>
                </v-col>
            </v-row>
        </v-card>

        <v-card
            class="mx-auto px-2 pa-lg-4 pb-5 mb-8 rounded-xl"
        >
            <v-card-title class="px-0">
                <h2 class="text-mitr pb-1">หวยยี่กี่</h2>
            </v-card-title>

            <v-row>
                <v-col v-for="yeekee in yeekeeList.filter(y => y.status === '1' || y.status === '2')" cols="6" md="3" xl="3">
                    <LotteryBet
                        :title="yeekee.betName"
                        :openDate="yeekee.roundFinalDt"
                        :time="$timeFormat(yeekee.closeDate)"
                        :closeDate="yeekee.closeDate"
                        :bg="yeekee.bg"
                        :image="yeekee.image"
                        :roundId="yeekee.roundId"
                        :lotteryId="yeekee.lotteryId"
                        :status="yeekee.status"
                    ></LotteryBet>
                </v-col>
            </v-row>
        </v-card>

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
definePageMeta({
    middleware: 'auth'
})

const cardList = ref([])
const yeekeeList = ref([])
const overlay = ref(false)

onMounted(async() => {
    await getCardList()
})

async function getCardList() {
    overlay.value = true
    try {
        const res = await $fetch('/api/lottery/cardList')

        cardList.value = res.data.lottery.length > 0 ? sortCardList(res.data.lottery) : []
        yeekeeList.value = res.data.yeekee.length > 0 ? sortCardList(res.data.yeekee) : []

    } catch(error) {
        navigateTo('/expired')
        console.log(error)
    }
    finally {
        overlay.value = false
    }
}

function sortCardList(lottery) {
    let open = []
    let _lottery = []
    lottery.sort((a, b) => { 
        return new Date(b.betName.split(' ')[1]) - new Date(a.betName.split(' ')[1])
    })

    lottery.forEach(l => { 
        if(l.status === '1') open.push(l) 
        else _lottery.push(l) 
    })

    if(open.length > 0) open.forEach(o => { _lottery.unshift(o) })

    return _lottery
}
</script>