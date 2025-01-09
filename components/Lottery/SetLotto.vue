<template>
    <div>
        <v-sheet class="d-flex align-center mx-auto px-4 py-4" elevation="4" height="auto" width="100%" rounded>
            <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <div>
                        <h2 class="text-h5 font-weight-black text-mitr"><v-icon large color="green darken-2">
                            mdi-web-box
                        </v-icon>หวยหุ้นต่างประเทศ</h2>

                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" v-for="item in items">
                    <LotteryCardV2 :title="item.title" :icon="item.icon"></LotteryCardV2>
                </v-col>
            </v-row>
        </v-container>
        </v-sheet>
    </div>
</template>

<script setup>
const items = [   
    {title:'หุ้นเกาหลี',icon:'/icon/flags/south-korea.png'},
    {title:'นิเคอิรอบเช้า',icon:'/icon/flags/japan.png'},
    {title:'ฮั่งเส็งรอบเช้า',icon:'/icon/flags/hong-kong.png'},
    {title:'หุ้นไต้หวัน',icon:'/icon/flags/taiwan.png'},
    {title:'หุ้นสิงคโปร์',icon:'/icon/flags/singapore.png'},
    {title:'หุ้นอียิปต์',icon:'/icon/flags/egypt.png'},
    {title:'หุ้นเยอรมัน',icon:'/icon/flags/german.png'},
    {title:'หุ้นอังกฤษ',icon:'/icon/flags/england.png'},
    {title:'หุ้นรัสเซีย',icon:'/icon/flags/russia.png'}
]
</script>
