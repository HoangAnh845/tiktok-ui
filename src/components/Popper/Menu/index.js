
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => { }

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) { // Nếu không có gì truyền vào tham số của hàm thì sẽ lấy giá trị của mặc định của tham số đã gán

    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory((prev) => [...prev, item.children])
                } else {
                    onChange(item);
                }
            }} />
        })
    }

    return (
        <Tippy
            delay={[0, 1500]}
            interactive
            placement='bottom-end'
            hideOnClick={hideOnClick} // Quyết định khi click có ẩn tippy đi hay không 
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* Nếu lơn cấp 1 sẽ hiển thị header */}
                        {history.length > 1 && <Header title="Language" onBack={() => {
                            // Cắt phần tử cuối để quay về cấp 1 
                            setHistory((prev) => prev.slice(0, prev.length - 1))
                        }} />}
                        <div className={cx("menu-body")}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            // Comeback quay về cấp 1 khi đang thực ở cấp hai và hover ra ngoài
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy >
    );
}

export default Menu;