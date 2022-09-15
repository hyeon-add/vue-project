<template>
  <nav>
    <v-app-bar
      app
      clipped-left
      flat
      class="white"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn
        outlined
        rounded
        color="blue"
        router
        to="/signin"
      >
        <v-icon
          left
          size="26"
          >mdi-account-circle</v-icon
        >
        로그인
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
    ></v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  name: "NavBar",

  data: () => ({
    drawer: true,
  }),
};
</script>
<style></style>
