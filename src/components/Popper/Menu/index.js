
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
// import Header from './Header';
import styles from './Menu.module.scss';
// import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {

    const renderItems = () => {
        return items.map((item, index) => (
            <MenuItem key={index} data={item} />
        ))
    }

    return (
        <Tippy
            delay={[0, 7000]}
            interactive
            placement='bottom-end'
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}>
            {children}
        </Tippy>
    );
}

export default Menu;