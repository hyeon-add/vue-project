<template>
  <nav>
    <v-app-bar app clipped-left class="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="black--text" :to="{ name: 'Home' }"
          >VuetubeStudio</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn outlined tile color="grey darken-1" class="mr-5" v-on="on">
            <v-icon left color="red" size="26">mdi-video-plus</v-icon>
            만들기
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item @click="openDialogUploadVideo">
              <v-list-item-icon>
                <v-icon>mdi-upload</v-icon>
              </v-list-item-icon>
              <v-list-item-title>동영상 업로드</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu> -->

      <v-btn
        outlined
        rounded
        color="blue"
        router
        to="/signin"
        v-if="!GE_LOGIN_STATUS">
        <v-icon left size="26">mdi-account-circle</v-icon>
        로그인
      </v-btn>

      <v-menu offset-y v-else>
        <template v-slot:activator="{ on }">
          <v-btn
            depressed
            fab
            small
            color="red white--text"
            class="font-weight-bold"
            v-on="on">
            <v-avatar v-if="GE_USER_DATA.photoUrl !== 'no-photo.jpg'">
              <img
                :src="`${GE_URL}/uploads/avatar/${GE_USER_DATA.photoUrl}`"
                :alt="GE_USER_DATA.channelName" />
            </v-avatar>

            <span v-else>{{ channelAvatar }}</span>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar
                small
                color="red white--text"
                class="align-center d-flex font-weight-bold justify-center">
                <v-avatar v-if="GE_USER_DATA.photoUrl !== 'no-photo.jpg'">
                  <img
                    :src="`${GE_URL}/uploads/avatar/${GE_USER_DATA.photoUrl}`"
                    :alt="GE_USER_DATA.channelName" />
                </v-avatar>

                <span v-else>{{ channelAvatar }}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  GE_USER_DATA.channelName
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  GE_USER_DATA.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="mt-3"></v-divider>

            <v-list-item @click="openVideoModal">
              <v-list-item-icon>
                <v-icon>mdi-video-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>동영상 업로드</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item router :to="`/channel/${GE_USER_DATA.id}`">
              <v-list-item-icon>
                <v-icon>mdi-account-box-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>내 채널</v-list-item-title>
            </v-list-item>
            <v-list-item router to="/studio">
              <v-list-item-icon>
                <v-icon>mdi-youtube-studio</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Vuetube 스튜디오</v-list-item-title>
            </v-list-item>
            <v-list-item @click="AC_SIGN_OUT">
              <v-list-item-icon>
                <v-icon>mdi-login-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item router to="/setting">
              <v-list-item-icon>
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>설정</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list-item exact router to="/VuetubeStudio">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>대시보드</v-list-item-title>
      </v-list-item>
      <v-list-item router to="/VuetubeStudio/contents">
        <v-list-item-icon>
          <v-icon>mdi-play-box-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>콘텐츠</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <!-- 비디오 업로드 모달 -->
    <VideoModal
      :openDialog="statusModal"
      v-on:closeDialog="closeVideoModal"></VideoModal>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import VideoModal from '@/components/Modal/VideoModal.vue';

export default {
  name: 'StudioNavBar',

  data: () => ({
    drawer: true,
    statusModal: false,
  }),

  components: {
    VideoModal,
  },

  computed: {
    ...mapGetters({
      GE_URL: 'GE_URL',
      GE_USER_DATA: 'GE_USER_DATA',
      GE_LOGIN_STATUS: 'GE_LOGIN_STATUS',
    }),
    channelAvatar() {
      const setChannelAvatar = this.$store.getters.GE_USER_DATA.channelName
        .split('')[0]
        .toUpperCase();
      console.log('setChannelAvatar : ', setChannelAvatar);
      return setChannelAvatar;
    },
  },

  methods: {
    ...mapActions({
      // 로그아웃
      AC_SIGN_OUT: 'AC_SIGN_OUT',
    }),

    openVideoModal() {
      this.statusModal = true;
      console.log('-- open : ', this.statusModal);
    },
    closeVideoModal() {
      this.statusModal = false;
      console.log('-- close : ', this.statusModal);
    },
  },
};
</script>
<style></style>
