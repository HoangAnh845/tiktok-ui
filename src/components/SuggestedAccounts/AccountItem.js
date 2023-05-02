import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from "~/components/Image";
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div
                // tabIndex xác định rõ ràng thứ tự điều hướng cho các phần tử có thể đặt tiêu điểm (thường là các liên kết và điều khiển biểu mẫu) trong một trang.
                tabIndex="-1"  // sẽ không thể được truy cập bằng phím tab trên bàn phím. Điều này có nghĩa là, người dùng không thể trực tiếp tập trung (focus) vào phần tử HTML này bằng phím tab trên bàn phím.
                {...props}
            >
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive delay={[800, 0]}
                offset={[-20, 0]} // Xác định độ lệch của phần tử tippy.
                placement="bottom" // Định vị tippy so với phần tử tham chiếu của nó.
                render={renderPreview}>
                <div className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1660665600&x-signature=hToDdYbvevi4S9Fn5tdnI%2Bk0%2BkM%3D"
                        alt=""

                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>quocnguyenphu</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Quốc Nguyễn Phú</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default AccountItem;