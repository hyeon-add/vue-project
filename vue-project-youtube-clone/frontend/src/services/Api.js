import axios from "axios";

export default () => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_URL}/api/v1`,
  });

  const token = localStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("axios-error : ", error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        location.reload();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
