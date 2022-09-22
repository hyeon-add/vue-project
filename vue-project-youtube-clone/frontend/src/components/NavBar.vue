<template>
  <nav>
    <v-app-bar app clipped-left flat class="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="black--text" to="/VuetubeStudio"
          >Vuetube</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

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

      <!-- <v-menu v-else offset-y>
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
        <v-list class="MenuStyle">
          <v-list-item>
            <v-avatar v-if="GE_USER_DATA.photoUrl !== 'no-photo.jpg'">
              <img
                :src="`${GE_URL}/uploads/avatar/${GE_USER_DATA.photoUrl}`"
                :alt="GE_USER_DATA.channelName" />>
            </v-avatar>
          </v-list-item>
          <v-list-item
            ><router-link to="/VuetubeStudio"
              >Vutube 스튜디오</router-link
            ></v-list-item
          >
          <v-list-item @click="signOut">로그아웃</v-list-item>
        </v-list>
      </v-menu> -->

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

            <v-list-item router :to="`/channel/${GE_USER_DATA.id}`">
              <v-list-item-icon>
                <v-icon>mdi-account-box-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>내 채널</v-list-item-title>
            </v-list-item>
            <v-list-item router to="/VuetubeStudio">
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
      <v-list dense nav>
        <v-list-item router to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>홈</v-list-item-title>
        </v-list-item>
        <v-list-item router to="/subscriptions">
          <v-list-item-icon>
            <v-icon>mdi-youtube-subscription</v-icon>
          </v-list-item-icon>
          <v-list-item-title>구독</v-list-item-title>
        </v-list-item>

        <v-divider class="my-3"></v-divider>

        <v-list-item router to="/history">
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-title>시청 기록</v-list-item-title>
        </v-list-item>

        <v-divider class="my-3"></v-divider>

        <v-subheader>구독</v-subheader>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavBar',

  data: () => ({
    drawer: true,
  }),

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
      AC_SIGN_OUT: 'AC_SIGN_OUT',
    }),
    async signOut() {
      await axios
        .post(
          process.env.VUE_APP_API + '/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          console.log('signOut - response : ', response);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .catch((error) => {
          console.log('signOut - error : ', error);
        });
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
<style>
.MenuStyle {
  width: 300px;
}
</style>
