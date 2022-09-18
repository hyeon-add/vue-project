import Api from '@/services/Api';

export default {
  signIn(credentials) {
    return Api().post('auth/login', credentials);
  },
  signUp(data) {
    return Api().post('auth/register', data);
  },
  getUserData(token) {
    return Api().post('auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
