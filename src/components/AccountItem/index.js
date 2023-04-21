import classNames from 'classnames/bind';
import styles from "./AccountItem.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/05aa222706c452c8ad0ea7d2e719a745~c5_100x100.jpeg?x-expires=1682175600&x-signature=suIObk6%2BLkSVWqbylh0ddmJZuE8%3D" alt='Hoa' />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;