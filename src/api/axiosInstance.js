import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && !error.config.__isRetryRequest) {
      error.config.__isRetryRequest = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post("/auth/refresh", {
          token: refreshToken,
        });
        localStorage.setItem("token", response.data.token);
        error.config.headers["Authorization"] = `Bearer ${response.data.token}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
