import PropTypes from 'prop-types';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired, // có thể là bất kỳ kiểu dữ liệu nào trong React (ví dụ: string, number, boolean, array, object, hoặc các thành phần React)
    // isRequired: bắt buộc
};

export default GlobalStyles;