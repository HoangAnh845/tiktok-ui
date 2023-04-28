import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from "./Search.module.scss"
/* -------------------- */
import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import * as request from "~/utils/request"

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

    // Lần đầu debounced sẽ nhận giá trị là chuỗi rỗng 
    // Các lần tiếp theo sẽ nhận giá trị khi người dùng gõ 
    const debounced = useDebounce(searchValue, 500); // Dùng để delay gửi rì quét lên api tránh trường hợp tìm kiếm từng từ bị rì quét liên tục 

    useEffect(() => { // Hành động cần thực hiện: thực thi sau khi component được render hoặc một giá trị trong component thay đổi.

        // Kiểm tra nếu giá trị từ khóa được nhập vào mà = rỗng thì sẽ không lấy api 
        if (!debounced.trim()) {
            // setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced); // data api lấy được             
            setSearchResult(result);

            setLoading(false);
            // try {
            //     const res = await request.get(`users/search`, {
            //         /* 
            //             ${
            //                 //dùng để mã hóa các ký tự không an toàn trong URL. VD: "&", "=", "?" và "+",...
            //                 encodeURIComponent(debounced)
            //             } &type=less
            //         */

            //         params: {
            //             q: debounced,
            //             type: 'less'
            //         }
            //     });
            //     setSearchResult(res.data)
            //     setLoading(false)
            // } catch (error) {
            //     setLoading(false)
            // }

            // .then((res) => res.json()) //  để trích xuất dữ liệu dưới định dạng JSON từ phản hồi.
            // .then((res) => {
            //     console.log("LOG___res___", res);
            //     // Khi gọi api thành công 
            //     setSearchResult(res.data); // lưu trữ kết quả tìm kiếm và khi nó được cập nhật, component sẽ được render lại với dữ liệu mới.
            //     setLoading(false);
            // })
            // .catch(() => {
            //     setLoading(false)
            // })
        };

        fetchApi()
    },
        // Một mảng các phụ thuộc (dependencies)
        // Nếu các giá trị trong mảng này thay đổi, useEffect sẽ được gọi lại.
        [debounced]
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

    // Xử lý dấu cách: Khi người dùng nhập một ký tự mới cho phép người dùng cách 
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) { // Nếu người nhập kí tự không phải dấu cách sẽ cho họ nhập thôngtin 
            setSearchValue(searchValue)
        }

    }

    return (
        <HeadlessTippy // một component được sử dụng để hiển thị popover chứa kết quả tìm kiếm
            interactive // Xác định xem tippy có nội dung tương tác bên trong hay không, để có thể di chuột qua và nhấp vào bên trong mà không bị ẩn
            visible={showResult && searchResult.length > 0} // Hiển thị khung tìm kiếm
            render={(attrs) => { // Tùy chỉnh sử dụng. Tạo DOM phần tử nhỏ của riêng bạn

                return <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}> Accounts </h4>
                        {
                            searchResult.map(function (result) {
                                return <AccountItem key={result.id} data={result} />
                            })
                        }
                    </PopperWrapper>
                </div>
            }}
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
                    onChange={handleChange}
                    // Hiển ô tìm kiếm khi Focus vào ô tìm kiếm 
                    onFocus={() => setShowResult(true)}
                />
                { // Nếu người dùng nhập nội dung tìm kiếm sẽ có nút clear
                    !!searchValue && !loading && < button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                }

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>

            </div>
        </HeadlessTippy >
    );
}

export default Search;