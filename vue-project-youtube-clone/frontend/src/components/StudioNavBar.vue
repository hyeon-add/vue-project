<template>
  <nav>
    <v-app-bar app clipped-left class="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="black--text" to="/">Vuetube</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y left>
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
      </v-menu>

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
                :alt="GE_USER_DATA.channelName" />>
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
                    :alt="GE_USER_DATA.channelName" />>
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
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list-item exact router to="/studio">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>대시보드</v-list-item-title>
      </v-list-item>
      <v-list-item router to="/studio/videos">
        <v-list-item-icon>
          <v-icon>mdi-play-box-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>콘텐츠</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <!-- 비디오 업로드 모달 -->
    <UploadVideoModal
      :openDialog="statusDialogUploadVideo"
      v-on:closeDialog="closeDialogUploadVideo"></UploadVideoModal>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import UploadVideoModal from '@/components/Modal/UploadVideoModal.vue';

export default {
  name: 'StudioNavBar',

  data: () => ({
    drawer: true,
    statusDialogUploadVideo: false,
  }),

  components: {
    UploadVideoModal,
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
    // 비디오 업로드 모달 열기
    openDialogUploadVideo() {
      console.log('-- open');
      this.statusDialogUploadVideo = true;
    },
    closeDialogUploadVideo() {
      console.log('-- close');
      this.statusDialogUploadVideo = false;
    },
  },
};

// app: 컴포넌트를 어플리케이션 레이아웃은 한 부분으로 지정. 컨텐츠 크기를 동적으로 맞추는데 사용됨
// clipped-left: v-navigation-drawer를 왼쪽부터 잘리도록 지정
// dense: 툴바 컨텐츠와 확장의 높이를 줄임 64px -> 48px
// depressed: 버튼 박스의 그림자를 없앰
// fab: 버튼 둥글게
// flat: 버튼의 배경색을 없앰
// icon: 버튼이 아이콘임을 지정 - round & flat

// v-menu: template v-slot:activator="{ on }" 사용
// v-btn: v-on="on"

// v-divider: 직선
</script>
<style></style>
