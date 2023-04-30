import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from "./AccountItem.module.scss"
import { Link } from 'react-router-dom'; //  Tạo các liên kết giữa các trang trong ứng dụng.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from "~/components/Image";


// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link
            to={`/@${data.nickname}`} // Chỉ định đường dẫn (path) của trang sẽ được chuyển đến khi liên kết được nhấp vào
            className={cx('wrapper')}>

            {
                <Image
                    className={cx('avatar')}
                    src={data.avatar}
                    alt={data.nickname}
                    // Nếu không ảnh sẽ lấy ảnh này hoặc lấy ảnh mặc định 
                    fallback="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                />
            }
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

// Định nghĩa kiểu dữ liệu và yêu cầu bắt buộc cho prop
AccountItem.propTypes = {
    data: PropTypes.object.isRequired, // isRequired: để đảm bảo cảnh báo
    // được hiển thị nếu chỗ dựa không được cung cấp.
};

export default AccountItem;