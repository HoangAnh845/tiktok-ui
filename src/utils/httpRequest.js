// Tạo ra một instance của axios, sử dụng nó để gửi các yêu cầu mạng đến một URL cơ sở cụ thể và xuất nó ra để có thể sử dụng trong các module khác
import axios from "axios";

// process.env là một biến toàn cục mà được cung cấp bởi Node.js và được sử dụng để truy cập các biến môi trường của hệ thống. 
// Các biến môi trường là các biến được đặt trên hệ thống của bạn và có thể được sử dụng để đặt cấu hình ứng dụng của bạn
// console.log("LOG___", process.env);

const httpRequest = axios.create({ // Tạo một instance của axios để gửi các yêu cầu mạng
    baseURL: process.env.REACT_APP_BASE_URL, // Đặt URL cơ sở cho các yêu cầu
});

export const get = async (path, options = {}) => { // Xác định một hàm `get` nhận vào đường dẫn (path) và các tùy chọn (options)
    const response = await httpRequest.get(path, options); // Sử dụng instance axios `request` để gửi một yêu cầu GET đến đường dẫn được chỉ định và với các tùy chọn được cung cấp (mặc định là rỗng). Sau đó, lưu trữ phản hồi vào biến `response`
    return response.data // Trả về dữ liệu phản hồi được trả về từ server
}

export default httpRequest;