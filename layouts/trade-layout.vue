<template>
  <div>
    <v-app id="inspire">
      <v-parallax src="@/assets/main-bg_2.jpg">
        <HeaderDefault />
        <v-main class="mb-10">
          <v-container fluid>
            <v-layout>
              <SideBarTradeLeftBar />
              <v-main class="mx-2 v-main-style mt-10 mt-md-0">
                <slot></slot>
              </v-main>
            </v-layout>
          </v-container>
        </v-main>

        <FooterBottomNav />
      </v-parallax>
    </v-app>
  </div>
</template>
