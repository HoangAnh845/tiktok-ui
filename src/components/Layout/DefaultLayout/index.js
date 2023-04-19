import Header from "../components/Header";
import SideBar from "./SideBar";

// Chứa tất cả layout mặc định
export const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <SideBar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

// export default DefaultLayout;