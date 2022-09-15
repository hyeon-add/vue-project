import Api from "@/services/Api";

export default {
  signIn(data) {
    return Api().post("auth/login", data);
  },
  signUp(data) {
    return Api().post("auth/register", data);
  },
  getCurrentUser(token) {
    return Api().post("auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
