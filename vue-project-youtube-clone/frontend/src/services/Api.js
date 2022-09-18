import axios from 'axios';

export default () => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_URL}/api/v1`,
  });

  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // 응답 인터셉터 (then, catch로 처리되기 전에 요청이나 응답을 가로챌 수 있음)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('axios-error : ', error);
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        location.reload();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// 비동기 처리
// 자바스크립트의 비동기 처리란 ‘특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성’
