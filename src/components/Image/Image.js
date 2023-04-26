
// Đoạn mã này là một functional component trong ReactJS, được sử dụng để render một ảnh với một fallback nếu ảnh không tải được.
import PropTypes from 'prop-types'; //để kiểm tra kiểu dữ liệu của props được truyền vào component.
import {
    useState,
    forwardRef // HOC (Higher Order Component) trong React giúp truyền ref từ component cha vào component con.
} from 'react';
import classNames from 'classnames';
import images from '~/assets/images'; //  object chứa các ảnh trong project. Các props của component
import styles from './Image.module.scss';


// Sử dụng forwardRef để truyền ref từ component cha vào component con.
const Image = forwardRef((
    {
        src, alt, className,
        fallback: customFallback // Dùng ES6 đổi tên tham số 
        = images.noImage, // lấy ảnh mặc định 
        ...props
    }, ref) => {

    // Xử lý khi đường link ảnh bị lỗi sẽ lấy ảnh mặc định  
    const [fallback, setFallback] = useState('');
    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
