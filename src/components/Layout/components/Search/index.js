import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from "./Search.module.scss"

// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);

function Search() {

    // trạng thái dữ liệu 
    const [searchValue, setSearchValue] = useState(''); // lưu trữ giá trị của từ khóa tìm kiếm được nhập vào.
    const [searchResult, setSearchResult] = useState([]); //lưu trữ kết quả tìm kiếm được trả về từ API
    const [showResult, setShowResult] = useState(true); // quyết định xem kết quả tìm kiếm có nên hiển thị hay không.
    const [loading, setLoading] = useState(false); // quyết định xem nút loading có nên hiển thị hay không.

    useEffect(() => { // Hành động cần thực hiện: thực thi sau khi component được render hoặc một giá trị trong component thay đổi.

        // Kiểm tra nếu giá trị từ khóa được nhập vào mà = rỗng thì sẽ không lấy api 
        if (!searchValue.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true);

        fetch(
            `https://tiktok.fullstack.edu.vn/api/users/search?q=${
            //dùng để mã hóa các ký tự không an toàn trong URL. VD: "&", "=", "?" và "+",...
            encodeURIComponent(searchValue)
            }&type=less`
        )
            .then((res) => res.json()) //  để trích xuất dữ liệu dưới định dạng JSON từ phản hồi.
            .then((res) => {
                // Khi gọi api thành công 
                setSearchResult(res.data); // lưu trữ kết quả tìm kiếm và khi nó được cập nhật, component sẽ được render lại với dữ liệu mới.
                setLoading(false);
            })
            .catch(() => {
                setLoading(false)
            })
    },
        // Một mảng các phụ thuộc (dependencies)
        // Nếu các giá trị trong mảng này thay đổi, useEffect sẽ được gọi lại.
        [searchValue]
    );

    // Tạo một tham chiếu (reference) tới một phần tử trên giao diện người dùng
    const inputRef = useRef();

    // Dùng cho xử lý nút clear nội dung tìm kiếm
    const handleClear = () => {
        // Sét lại value trống cho ô input nhập 
        setSearchValue('');
        // Xóa luôn khung kết quả tìm kiếm
        setSearchResult([])
        // Sau khi xóa thông tin tìm kiếm sẽ focus lại ô tìm kiếm để người dùng tiếp tục tìm thông tin 
        inputRef.current.focus();
    };

    // Xử lý khi click bên ngoài ẩn kết quả tìm kiếm đi 
    const handleHideResult = () => {
        setShowResult(false);
    };



    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0} // Hiển thị khung tìm kiếm
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}> Accounts </h4>
                        {
                            searchResult.map(function (result) {
                                return <AccountItem key={result.id} data={result} />
                            })
                        }
                    </PopperWrapper>
                </div>
            )}
            // Click bên ngoài nút tippy
            onClickOutside={handleHideResult}
        >

            <div className={cx('search')}>
                <input
                    ref={inputRef} // Nhận lại thành phần DOM Input
                    value={searchValue}
                    placeholder='Search accounts and videos'
                    spellCheck={false} // Chek chính tả
                    // Nếu có người dùng nhập 
                    onChange={e => setSearchValue(e.target.value)}
                    // Hiển ô tìm kiếm khi Focus vào ô tìm kiếm 
                    onFocus={() => setShowResult(true)}
                />
                { // Nếu người dùng nhập nội dung tìm kiếm sẽ có nút clear
                    !!searchValue && !loading && < button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                }

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy >
    );
}

export default Search;