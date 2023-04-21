import classNames from 'classnames/bind';
import styles from "./Menu.module.scss"
import Button from "~/components/Button"

// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (<Button className={cx('menu-item')} leftIcon={data.icon} to={data.to}>{data.title}</Button>);
}

export default MenuItem;