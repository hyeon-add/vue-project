import Api from '@/services/Api';

export default {
  signIn(credentials) {
    return Api().post('auth/login', credentials);
  },
  signUp(data) {
    return Api().post('auth/register', data);
  },
  signOut(token) {
    return Api().post('auth/logout', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getUserData(token) {
    return Api().post('auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateUserData(data) {
    return Api().put('auth/updatedetails', data);
  },
  updateAvatar(formData) {
    return Api().put('auth/avatar', formData);
  },
};
