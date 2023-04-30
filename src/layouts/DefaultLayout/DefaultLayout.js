import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from "./DefaultLayout.module.scss"
import Header from "../components/Header/Header";
import SideBar from "~/layouts/components/SideBar";

// Hàm bind() trong classNames cho phép bạn ràng buộc một đối tượng vào tên lớp. 
// Trong trường hợp này, đối tượng được ràng buộc là "styles". Điều này có nghĩa là khi bạn gọi hàm cx() sau này, nó sẽ tự động thêm tiền tố "styles" vào tên lớp bạn truyền vào.
// VD: btn-primary
const cx = classNames.bind(styles);
// Chứa tất cả layout mặc định
export const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx("container")}>
                <SideBar />
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;