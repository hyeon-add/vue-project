<template>
  <v-container
    fluid
    class="fill-height white"
  >
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="5"
        lg="4"
        class="ma-auto"
      >
        <v-card
          outlined
          class="pa-10"
        >
          <v-card-title>Vuetube</v-card-title>
          <v-card-subtitle>로그인</v-card-subtitle>
          <v-card-text>
            <form @submit.prevent="signIn">
              <v-text-field
                outlined
                type="email"
                label="이메일"
                v-model="email"
              ></v-text-field>
              <v-text-field
                outlined
                type="password"
                label="비밀번호"
                v-model="password"
              ></v-text-field>

              <div class="d-flex justify-space-between">
                <v-btn
                  text
                  color="primary"
                  class="pl-0"
                  router
                  to="signup"
                  >계정 만들기</v-btn
                >
                <v-btn
                  depressed
                  color="primary"
                  class="blue"
                  type="submit"
                  :loading="loading"
                  >로그인</v-btn
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
  name: "SignIn",

  data: () => ({
    email: "",
    password: "",
    loading: false,
  }),
  methods: {
    async signIn() {
      if (this.loading) return;
      this.loading = true;

      const axiosBody = {
        email: this.email,
        password: this.password,
      };
      console.log("auth/login - axiosBody : ", axiosBody);
      await axios
        .post(process.env.VUE_APP_API + "/auth/login", axiosBody)
        .then(async (response) => {
          console.log("auth/login - response : ", response);
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
              this.email = false;
              this.password = false;
              this.loading = false;
            });
        })
        .catch((error) => {
          console.log("auth/login - error : ", error);
          this.email = false;
          this.password = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style></style>
