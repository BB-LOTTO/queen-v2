<template>
    <v-card class="mx-auto bg-grey-lighten-4" hover>
        <v-card-item class="py-0">
            <v-card-title class="text-md-h7 text-h7 py-2 text-mitr ">
                <v-avatar>
                    <v-img
                      :alt="title"
                      :src="icon"
                    ></v-img>
                  </v-avatar> {{ title }}
            </v-card-title>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text class="mb-2">
            <v-row>
                <v-col cols="6" class="text-center py-0">
                    <strong>3ตัวบน</strong>
                    <div
                        class="text-center bg-grey-lighten-4 rounded-lg  text-h6 text-pink-accent-4 text-mitr">
                        253
                    </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6" class="text-center py-0">
                    <strong>2ตัวล่าง</strong>
                    <div class="text-center bg-grey-lighten-4 rounded-lg  text-h6 text-mitr">
                        900
                    </div>
                </v-col>

            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    props: ['title','icon']
}
</script>