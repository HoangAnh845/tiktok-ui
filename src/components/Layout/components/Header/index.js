import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
/* ----------------------------------------- */
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Button from '~/components/Button';
import styles from "./Header.module.scss"
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from "~/components/Image";
import Search from '~/components/Layout/components/Search';
import { Link } from 'react-router-dom';
import config from '~/config';

// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]

function Header() {

    const currentUser = true;


    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    }

    // Khi người dùng đăng nhập 
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ]


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} ><img src={images.logo} alt='Logo tiktok' /></Link>
                {/* Search */}
                {<Search />}

                <div className={cx('actions')}>
                    {//delay={[0, 50]} 
                        currentUser ? (
                            <>
                                <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('badge')}>12</span>
                                    </button>
                                </Tippy>
                            </>
                        ) :
                            (
                                <>
                                    <Button text>Upload</Button>
                                    <Button primary >Log in</Button> {/* leftIcon={<FontAwesomeIcon icon={faSign} />} */}
                                </>
                            )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {
                            currentUser ? (
                                <Image
                                    className={cx('user-avatar')}
                                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c0e5acb353efad347ae0ba5a87574f1d~c5_100x100.jpeg?x-expires=1682481600&x-signature=u7LcRH3wa2ZOKvzoogBBgVaU%2BZo%3D"
                                    alt="Nguyen Van A"
                                    // Nếu không ảnh sẽ lấy ảnh này hoặc lấy ảnh mặc định 
                                    fallback="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )
                        }
                    </Menu>
                </div>

            </div>
        </header >
    );
}

export default Header;