import * as request from '~/utils/request';

export const search = async (q, type = 'less') => {
    try {
        // Hàm sử dụng await để đợi cho kết quả trả về từ hàm request.get, một hàm HTTP GET request sử dụng thư viện Axios.
        const res = await request.get('users/search', {
            params: {
                q, // là chuỗi tìm kiếm
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};