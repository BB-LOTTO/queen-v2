<template>
  <v-layout >
    <v-app-bar height="70" class="bg-pink-darken-4">
      <template #prepend  >
        <v-btn v-if="!mdAndUp"
          class="mx-2"
          icon="mdi-menu"
          variant="elevated"
        >
        <v-menu activator="parent">
          <v-list>
            <v-list-item v-for="item in menus" :to="item.to" :value="item">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
           
          </v-list>
        </v-menu>
        </v-btn>
        <LogoDefault v-if="!mdAndUp" />
      </template>

      <template  v-if="mdAndUp" >
        <LogoDefault />

        <NuxtLink :to="item.to" class="text-white" v-for="item in menus">
          <v-btn :key="item.title" :text="item.title" variant="text"></v-btn>
        </NuxtLink>
        
      </template>

      <template
        v-if="mdAndUp"
        #append
      >
        
      </template>
    </v-app-bar>

    <v-main />
  </v-layout>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { data } = useAuth()

onMounted(() => {
  if(data.value === undefined) {
    menus.value.push({title:'เข้าสู่ระบบ',to:'/login'})
    menus.value.push({title:'สมัครสมาชิก',to:'/register'})
  }
  else {
    menus.value.push({title:'ข้อมูลผู้ใช้',to:'/dashboard/profile'})
  }
})

const { mdAndUp } = useDisplay()
const menus = ref([
  {title:'ผลหวย',to:'/lottery/result'},
  {title:'อัตราจ่าย',to:'/rate'},
  {title:'แทงหวย',to:'/lottery/bet'},
])
</script>
