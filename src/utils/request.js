// Tạo ra một instance của axios, sử dụng nó để gửi các yêu cầu mạng đến một URL cơ sở cụ thể và xuất nó ra để có thể sử dụng trong các module khác
import axios from "axios";

const request = axios.create({ // Tạo một instance của axios để gửi các yêu cầu mạng
    baseURL: 'https://tiktok.fullstack.edu.vn/api/', // Đặt URL cơ sở cho các yêu cầu
});

export const get = async (path, options = {}) => { // Xác định một hàm `get` nhận vào đường dẫn (path) và các tùy chọn (options)
    const response = await request.get(path, options); // Sử dụng instance axios `request` để gửi một yêu cầu GET đến đường dẫn được chỉ định và với các tùy chọn được cung cấp (mặc định là rỗng). Sau đó, lưu trữ phản hồi vào biến `response`
    return response.data // Trả về dữ liệu phản hồi được trả về từ server
}

export default request;