<template>
    <div class="position-relative">
    <v-card
        :disabled="props.status !== '1'"
        class="gradient-background lotto-list rounded-xl py-2 position-static"
        :style="`background-image: linear-gradient( -45deg, ${color} 40% , #FAFAFA 40%), url(${props.bg});`"
        :to="`/lottery/trade/${props.title}/${props.lotteryId}/${props.roundId}`"
        @click="setDateTimeCookie"
    >
        <span v-if="props.status === '1'" 
            class="time-coundown-mobile d-block d-lg-none position-absolute"
        >
            <v-badge
                color="success"
                :content="countdown"
                inline
            ></v-badge>
        </span>

        <template v-slot:title>
            <h3 class="text-mitr-400 text-h5 text-lg-h6 text-center text-lg-start">{{ props.title }}</h3>
        </template>

        <template v-slot:subtitle>
            <p class="text-mitr-400 d-block d-lg-flex text-center text-lg-start text-grey-darken-4">
                <p class="me-2">งวดวันที่</p> 
                <p>{{ $dateFormat(lotteryDate(props.subtitle)) }}</p>
            </p>
        </template>

        <!-- <template v-slot:append>
            <v-avatar color="#DDD" class="d-none d-lg-block">
                <v-img
                    :alt="props.title"
                    src="/lotto/th-gov.png"
                ></v-img>
            </v-avatar>
        </template> -->

        <template v-slot:text>
            <v-img
                :aspect-ratio="1"
                class="bg-white mb-2 rounded-xl"
                src="/lotto/th-gov.png"
                width="300"
                cover
            ></v-img>
            <div v-if="props.status === '1'" class="text-center text-lg-start">
                <v-row>
                    <v-col cols="12" lg="6" class="px-2">
                        <v-icon class="me-1" icon="mdi-timer-sand-complete"></v-icon>
                        <span class="time font-weight-bold">ปิดรับ {{ props.time }}</span>
                    </v-col>
                    <v-col cols="6" class="d-none d-lg-block text-end px-2">
                        <span class="time-coundown">
                            <v-badge
                                color="success"
                                :content="countdown"
                                inline
                            ></v-badge>
                        </span>
                    </v-col>
                </v-row>
            </div>
            <div v-if="props.status === '2'" class="text-center text-lg-start">
                <v-icon class="me-2" color="error" icon="mdi-close-circle"></v-icon>
                <span class="time text-red-darken-4 font-weight-bold">ปิดรับแล้ว</span>
            </div>
        </template>
    </v-card>
</div>
</template>


<script setup>
const props = defineProps(['title', 'subtitle', 'image', 'time', 'bg', 'color', 'roundId', 'lotteryId', 'status', 'closeDate'])
const color = props.color ?? 'transparent'
const countdown = ref('')

onMounted(() => {
    if(props.status === '1') {
        setInterval(() => { dateTimeCountdown(props.closeDate) }, 1000)
    }
})

function setDateTimeCookie() {
    const lotto_date = useCookie('lotto_date')
    const lotto_time = useCookie('lotto_time')
    const lotto_status = useCookie('l_s')

    lotto_date.value = props.subtitle
    lotto_time.value = props.time
    lotto_status.value = props.status
}

const lotteryDate = (date) => {
    const _date = date.split(' ')
    return _date[1]
}

const dateTimeCountdown = (date) => {
    let countDownDate = new Date(date).getTime()
    let now = new Date().getTime()
    let distance = countDownDate - now

    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
    let minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
    let seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')

    countdown.value = `${days} วัน | ${hours}:${minutes}:${seconds}`
}
</script>

<style scoped>
.lotto-list {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right top;
}
.time-coundown-mobile {
    top: -10px;
    right: 0;
}
</style>