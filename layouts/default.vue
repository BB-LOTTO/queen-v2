<template>
  <v-app id="inspire">
    <v-layout>
      <v-navigation-drawer
        v-model="leftMenu"
        width="320"
        temporary
        class="position-fixed"
      >
        <SideBarTradeLeftBar v-if="status === 'authenticated'"/>
      </v-navigation-drawer>
      <v-parallax src="@/assets/main-bg_2.jpg">
        <!-- <HeaderDefault /> -->
        <HeaderNav />
        <v-main class="pb-15 pb-lg-0">
            <slot></slot>
        </v-main>
      </v-parallax>
    </v-layout>
    <FooterBottomNav 
      @to-more-menu="leftMenu = !leftMenu"
    />
  </v-app>
</template>

<script setup>
const { status } = useAuth()
const leftMenu = ref(false)
</script>