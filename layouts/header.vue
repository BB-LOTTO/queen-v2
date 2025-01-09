<template>
    <v-container fluid class="pa-0">
        <v-sheet color="#880e4f"  class="pa-6 pt-0">
            <v-row>
                <v-col v-if="_props.actions" cols="12" lg="7" offset-lg="1" class="mt-4">
                    <h2 class="mb-0" style="line-height: 36px;">
                        สุดยอดแห่งราชินีหวย อัตราสูง เล่นหวยและเกมออนไลน์ต้องที่นี่ที่เดียว
                    </h2>
                    <p class="mt-0 mb-6 text-body-2 text-lg-body-1">
                        เว็บหวยออนไลน์ ครบวงจรไม่ว่าจะเป็นหวยยอดนิยมอย่าง หวยรัฐบาลไทย, หวยฮานอย, หวยหุ้นไทย, หวยหุ้นต่างประเทศ, หวยลาวพัฒนา, หวยฮานอย หวยยี่กี และเรายังรวมการออกรางวัลจากหวยยี่กีจากเว็บต่าง ๆ มาให้เดิมพันภายในเว็บของเรา นอกจากนี้เรายังเป็น แหล่งรวมเกมชั้นนำ คัดสรรมาเพื่อนักเดิมพันโดยเฉพาะ มองหาเกมเดิมพันหรือเกมต้องที่นี่เท่านั้น
                    </p>
                    <v-row>
                        <v-col cols="6" md="3">
                            <v-btn
                                class="text-none text-white mb-4 rounded-xl"
                                color="#c6137f"
                                variant="flat"
                                block
                            >
                                เข้าเล่นเกม
                            </v-btn>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-btn
                                class="text-none text-white rounded-xl"
                                color="#c6137f"
                                variant="outlined"
                                block
                                to="/lottery/result"
                            >
                                ดูผลหวย
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col v-else cols="12" lg="7" class="mb-4" offset-lg="1">
                    <p class="text-subtitle-1 text-lg-h6 text-mitr-400 mb-0">
                        <slot name="sub-title"></slot>
                    </p>
                    <h1 class="text-h4 text-lg-h2 font-weight-regular">
                        <slot name="title"></slot>
                    </h1>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>


<script setup>
const { status } = useAuth()
const _props = useAttrs()

watch(status, (_status) => {
    if(_status === 'unauthenticated') navigateTo('/login')
})
</script>