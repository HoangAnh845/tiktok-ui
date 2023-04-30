import Header from "../components/Header";
// Chứa tất cả layout mặc định
export const HeaderOnly = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

// export default DefaultLayout;