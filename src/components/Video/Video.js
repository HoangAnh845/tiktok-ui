import React, { useEffect, useRef, useState } from "react";
import "~/index.css"
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCheckCircle, faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import Image from "~/components/Image";
import config from '~/config';
import Button from '../Button/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from "~/components/SuggestedAccounts/AccountPreview/AccountPreview";
// import AccountPreview from '~/components/AccountPreview/AccountPreview';

const cx = classNames.bind(styles);
//   <VideoContent {...data} />
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


const VideoInfo = ({ avatar, idName, nickName, music, content }) => {
    return (
        <div className="flex flex-row">
            <Tippy
                interactive delay={[800, 0]}
                offset={[-20, 0]} // Xác định độ lệch của phần tử tippy.
                placement="bottom" // Định vị tippy so với phần tử tham chiếu của nó.
                render={renderPreview}>
                <Image
                    className="w-[50px] h-[50px] rounded-full cursor-pointer"
                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c0e5acb353efad347ae0ba5a87574f1d~c5_100x100.jpeg?x-expires=1682481600&x-signature=u7LcRH3wa2ZOKvzoogBBgVaU%2BZo%3D"
                    alt="Nguyen Van A"
                    // Nếu không ảnh sẽ lấy ảnh này hoặc lấy ảnh mặc định 
                    fallback="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                />
            </Tippy>

            <div className="ml-3 min-w-[68%]">
                <div>
                    <Link to={config.routes.profile} className="text-3xl font-bold hover:underline mr-1.5">
                        {"idName"}
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </Link>

                    <Link to={config.routes.profile} className="text-1xl">
                        {"nickName"}
                    </Link>
                </div>
                <div className='my-2'>{"content"}</div>
                <div className="flex flex-row items-center ">
                    <FontAwesomeIcon className="mr-3" icon={faMusic} />
                    Nhạc nền
                </div>
            </div>
            <div>
                <Button outline>Follow</Button>
            </div>
        </div>

    );
};


const VideoContent = ({ video, like, cmt, share }) => {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
    const handleVideo = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <div className="flex flex-row">
            <video
                ref={videoRef}
                onClick={handleVideo}
                className="w-[80%] max-h-[600px] ml-[50px] rounded-md mt-4"
                src="https://player.vimeo.com/progressive_redirect/playback/734294953/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=bd7067339b90fbb7639f04da2a7c3f0d3483c7100dcbe4c63d686eb850c1fc8f"
                loop
            // controls
            />
            <div className="flex flex-col justify-end ml-7">
                <div className="text-center mb-4">
                    <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center">
                        <FontAwesomeIcon className="text-xl" icon={faHeart} />
                    </div>
                    <span>{like}</span>
                </div>
                <div className="text-center mb-4">
                    <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center">
                        <FontAwesomeIcon className="text-xl text-center" icon={faComment} />
                    </div>
                    <span>{cmt}</span>
                </div>
                <div className="text-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center">
                        <FontAwesomeIcon className="text-xl text-center" icon={faShare} />
                    </div>
                    <span>{share}</span>
                </div>
            </div>
        </div>
    );
};

function Video({ data }) {
    return (
        <div className="snap-start max-w-[600px]  border-b-2 border-gray-200 pb-10 pt-10">
            <VideoInfo {...data} />
            <VideoContent {...data} />
        </div>
    );
}

export default Video;