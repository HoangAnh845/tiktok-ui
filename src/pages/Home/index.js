// import db from "../../firebase";
import "~/index.css"
import Video from '~/components/Video/Video';
//style={{ "height": "2000px" }}
function Home() {
    return <div className='pt-4'>
        <div id="focus"
            tabIndex="1"
            className="flex flex-col items-center snap-y snap-mandatory overflow-scroll h-screen overflow-x-hidden">
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
        </div>

    </div>;
}

export default Home;