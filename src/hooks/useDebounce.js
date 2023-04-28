import { useState, useEffect } from "react";

// Áp dụng kỹ thuật debounce cho một giá trị nhận được 
/* 
    - Hàm xử lý được gắn vào sự kiện người dùng nhưng không được gọi trực tiếp. 
    - Thay vào đó, một thời gian đợi (thường là vài trăm millisecond) được thiết lập và hàm xử lý sẽ chỉ được gọi sau khi thời gian đợi đó đã kết thúc.
    - Giúp giảm số lượng lượt gọi hàm xử lý khi sự kiện xảy ra liên tục trong một khoảng thời gian ngắn, do đó giảm tải cho ứng dụng và cải thiện hiệu suất.
*/
/* 
    Ví dụ: khi người dùng nhập liệu vào ô tìm kiếm, 
    - Chúng ta không muốn gọi hàm tìm kiếm mỗi khi người dùng nhập một ký tự mới.
    - Thay vào đó, chúng ta có thể sử dụng debounce để gọi hàm tìm kiếm sau một khoảng thời gian đợi nhất định, ví dụ sau 300ms kể từ khi người dùng nhập liệu mới.
*/
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return debouncedValue;
}

export default useDebounce;