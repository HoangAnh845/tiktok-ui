import classNames from 'classnames/bind';
import styles from "./Button.module.scss"
import { Link } from 'react-router-dom';

// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);

function Button({ to, href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    onClick,
    leftIcon,
    rightIcon,
    ...passProps }) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps
    };

    // Xoá sk click của thẻ đi khi thẻ đó bị disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            // startsWith() xác định xem một chuỗi có bắt đầu bằng các ký tự của một chuỗi đã chỉ định
            if (key.startsWith('on') && typeof props[key] === 'function')
                delete props[key];
        })
    }
    // Xác định thẻ cần dùng dựa vào props
    if (to) {
        props.to = to;
        Comp = Link
    } else if (href) {
        props.href = href;
        Comp = 'a';
    };

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        rounded,
        disabled,
        small,
        large
    })
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;