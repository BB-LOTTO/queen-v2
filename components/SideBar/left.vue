<template>
    <div>
        <v-sheet rounded="lg" elevation="1">
            <v-list rounded="lg">
                <v-list-subheader>Hello, {{ isUser() }}</v-list-subheader>
          
                <v-list-item
                  v-for="(item, i) in leftMenus"
                  :key="i"
                  :value="item"
                  color="primary"
                  rounded="sm" :to="item.to"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
          
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>

                <v-list-item
                  variant="plain"
                  rounded="sm"
                  to="#"
                  @click="logout"
                >
                  <template v-slot:prepend>
                    <v-icon>mdi mdi-logout</v-icon>
                  </template>
          
                  <v-list-item-title>ออกจากระบบ</v-list-item-title>
                </v-list-item>
              </v-list>
        </v-sheet>
    </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { signOut, data } = useAuth()
const { mdAndUp } = useDisplay()
const leftMenus = [
    { title: 'โปรไฟล์', to: '/dashboard/profile', icon: 'mdi-account-circle'},
    { title: 'กระเป๋าเงิน', to: '/dashboard/wallet', icon: 'mdi-wallet' },
    { title: 'รายการแทง', to: '/dashboard/profile', icon:'mdi-list-status' },
]
// const userState = useState('user', () => { username: data.user.username ?? null })

const isUser = () => {
  if(data.value && data.value.status === 'OK') return data.value.user.username
  else logout()
}

async function logout() {
    await signOut({
      callbackUrl: '/login',
      redirect: true
    })
}
</script>
