<style>
.text-mitr{
  font-family: "mitr", sans-serif;
  font-weight: 700;
  font-style: normal;
}
</style>
<template>
  <div>
    <v-app id="inspire">
      <v-parallax src="@/assets/main-bg_2.jpg">
        <HeaderDefault />
        <v-main class="">
          <v-container class="">
            <v-row>
              <v-col cols="12" md="3">
                <SideBarLeft></SideBarLeft>
              </v-col>
              <v-col>
                <slot v-if="!loading"></slot>
              </v-col>
            </v-row>
            
          </v-container>
        </v-main>
      </v-parallax>
    </v-app>
  </div>
</template>

<script setup>
const { getSession } = useAuth()
const loading = ref(true)

onMounted(async() => {
    await getSession()
    loading.value = false
})
</script>