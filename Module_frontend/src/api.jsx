// api.js hoặc service.js
import axios from 'axios';

const axiosInstance = axios.create();

// Interceptor để kiểm tra token trước khi gửi mọi yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const expirationTime = localStorage.getItem('expTime');

        if (token && expirationTime) {
            const currentTime = new Date().getTime();
            if (currentTime < parseInt(expirationTime, 10)) {
                config.headers['Authorization'] = `Bearer ${token}`;
            } else {
                // Token đã hết hạn, xóa token và thực hiện chuyển hướng đến trang đăng nhập
                localStorage.removeItem('token');
                localStorage.removeItem('expTime');
                localStorage.removeItem('id')
                window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
