<template>
<v-app id="inspire">
    <v-layout>
        <v-parallax src="@/assets/main-bg_2.jpg">
            <v-main class="pb-15 pb-lg-0">
                <slot></slot>
            </v-main>
        </v-parallax>
    </v-layout>
</v-app>
</template>

<script setup>
</script>