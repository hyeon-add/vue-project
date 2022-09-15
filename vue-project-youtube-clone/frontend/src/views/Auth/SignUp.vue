<template>
  <v-container
    fluid
    class="fill-height white"
  >
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="8"
        md="8"
        lg="7"
        class="ma-auto"
      >
        <v-card
          outlined
          class="pa-10"
        >
          <v-card-title>Vuetube</v-card-title>
          <v-card-subtitle>회원가입</v-card-subtitle>
          <v-card-text>
            <form @submit.prevent="signUp">
              <v-text-field
                outlined
                type="email"
                label="이메일"
                v-model="email"
              ></v-text-field>
              <v-text-field
                outlined
                label="채널 이름"
                v-model="channelName"
              ></v-text-field>
              <v-text-field
                outlined
                type="password"
                label="비밀번호"
                v-model="password"
              ></v-text-field>
              <v-text-field
                outlined
                type="password"
                label="비밀번호 확인"
                v-model="confirmPassword"
              ></v-text-field>

              <div class="d-flex justify-end">
                <v-btn
                  depressed
                  right
                  color="primary"
                  class="blue"
                  type="submit"
                  :loading="loading"
                  >가입하기</v-btn
                >
              </div>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "SignUp",

  data: () => ({
    channelName: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
  }),
  methods: {
    async signUp() {
      if (this.loading) return;
      if (this.password !== this.confirmPassword) {
        this.password = false;
        this.confirmPassword = false;

        return;
      }
      this.loading = true;

      const axiosBody = {
        email: this.email,
        channelName: this.channelName,
        password: this.password,
      };
      console.log("auth/register - axiosBody : ", axiosBody);
      await axios
        .post(process.env.VUE_APP_API + "/auth/register", axiosBody)
        .then(async (response) => {
          console.log("auth/register - response : ", response);
          localStorage.setItem("token", response.data.token);

          await axios
            .post(
              process.env.VUE_APP_API + "/auth/me",
              {},
              {
                headers: {
                  Authorization: `Bearer ${response.data.token}`,
                },
              }
            )
            .then((_response) => {
              console.log("/auth/me - _response : ", _response);
              localStorage.setItem("user", JSON.stringify(_response.data));

              this.$router.push({ name: "Home" });
            })
            .catch((_error) => {
              console.log("/auth/me - _error : ", _error);
              this.channelName = false;
              this.email = false;
              this.password = false;
              this.confirmPassword = false;
              this.loading = false;
            });
        })
        .catch((error) => {
          console.log("auth/register - error : ", error);
          this.channelName = false;
          this.email = false;
          this.password = false;
          this.confirmPassword = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style></style>
