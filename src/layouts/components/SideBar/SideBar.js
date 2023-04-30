import classNames from 'classnames/bind';
import styles from "./SideBar.module.scss"

// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);

function SideBar() {
    return <aside className={cx('wrapper')}>
        <h2>SideBar</h2>
    </aside>;
}

export default SideBar;