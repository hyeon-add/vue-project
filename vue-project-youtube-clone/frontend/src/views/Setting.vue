<template>
  <v-container fluid class="full-height pa-10">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form @submit.prevent="handleSubmit(submitData)">
        <p>채널 이름</p>
        <ValidationProvider
          name="채널 이름"
          rules="required"
          v-slot="{ errors }">
          <v-text-field
            outlined
            type="text"
            :error-messages="errors"
            v-model="channelName"></v-text-field>
        </ValidationProvider>

        <ValidationProvider name="프로필" rules="required" v-slot="{ error }">
          <v-file-input
            accept="image/*"
            :error-messages="error"
            v-model="avatar"></v-file-input>
        </ValidationProvider>

        <v-btn :disabled="invalid" type="submit">수정</v-btn>
      </form>
    </ValidationObserver>

    <!-- <p>이메일</p>
    <v-text-field disabled outlined type="text" v-model="email"></v-text-field> -->
    <!-- <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form @submit.prevent="handleSubmit(submitUpdateData)">
        <ValidationProvider
          name="채널 이름"
          rules="required"
          v-slot="{ errors }">
          <v-text-field
            outlined
            type="text"
            label="채널 이름"
            :error-messages="errors"
            v-model="formData.channelName"></v-text-field>
        </ValidationProvider>

        <v-btn type="submit" :disabled="invalid">수정</v-btn>
      </form>
    </ValidationObserver> -->
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Validate from '@/mixins/Validate.vue';
import axios from 'axios';
// import axios from 'axios';

export default {
  name: 'Setting',
  mixins: [Validate],
  data: () => ({
    avatar: [],

    channelName: '',
    email: '',
    // formData: {
    //   email: '',
    //   channelName: '',
    // },
  }),
  computed: {
    ...mapGetters({
      GE_USER_DATA: 'GE_USER_DATA',
    }),
  },
  methods: {
    async submitData() {
      const axiosBody = {
        channelName: this.channelName,
        email: this.email,
      };
      console.log('submitData - axiosBody', axiosBody);

      const photoFormData = new FormData();
      photoFormData.append('avatar', this.avatar, this.avatar.name);
      console.log('submitData - photoUrl : ', this.avatar, this.avatar.name);
      // process.env.VUE_APP_URL/uploads/avatar/

      await axios
        .put(process.env.VUE_APP_API + '/auth/avatar', photoFormData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          console.log('submitData - response : ', response);
        })
        .catch((error) => {
          console.log('submitData - error : ', error);
        });

      await axios
        .put(process.env.VUE_APP_API + '/auth/updatedetails', axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          console.log('submitData - response : ', response);
          localStorage.setItem('user', JSON.stringify(response.data.data));
        })
        .catch((error) => {
          console.log('submitData - error : ', error);
        });
    },
    async submitUpdateData() {
      const axiosBody = this.formData;
      console.log('submitUpdateData - axiosBody : ', axiosBody);

      await this.$store
        .dispatch('AC_UPDATE_USER_DATA', axiosBody)
        .then((response) => {
          console.log('submitUpdateData - response : ', response);
        })
        .catch((error) => {
          console.log('submitUpdateData - error : ', error);
        });
    },
  },
  mounted() {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData);
    this.channelName = userData.channelName;
    this.email = userData.email;
    // this.formData.email = this.GE_USER_DATA.email;
    // this.formData.channelName = this.GE_USER_DATA.channelName;
  },
};
</script>
<style></style>
