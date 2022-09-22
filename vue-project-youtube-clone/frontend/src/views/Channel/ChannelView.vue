<template>
  <h1>{{ userId }}</h1>
</template>
<script>
import axios from 'axios';

export default {
  name: 'ChannelView',
  data: () => ({}),
  computed: {
    userId() {
      return this.$router.currentRoute.params.id;
    },
  },
  methods: {
    async getUserData() {
      // const userId = this.$router.currentRoute.params.id;
      console.log('userId : ', this.userId);

      await axios
        .get(process.env.VUE_APP_API + '/users/' + this.userId, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          console.log('getUserData - response : ', response);
        })
        .catch((error) => {
          console.log('getUserData - error : ', error);
        });
    },
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.getUserData();
      }
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>
<style></style>
