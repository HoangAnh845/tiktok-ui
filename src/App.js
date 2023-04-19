// Sử dụng chúng trong ứng dụng React của mình để tạo và quản lý các tuyến đường của trang web
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// BrowserRouter được định danh (alias) như là Router, nó là một component sử dụng cho routing trong React, cung cấp một giao diện đơn giản để định nghĩa và quản lý các đường dẫn URL trong ứng dụng.
// Routes là một component cha chứa nhiều Route components, và được sử dụng để định nghĩa các tuyến đường cho ứng dụng.
// Route là một component con của Routes, được sử dụng để định nghĩa một tuyến đường cụ thể, và xác định component được hiển thị khi tuyến đường đó được truy cập.
import { publicRoutes } from '~/routes/index.js'
import { DefaultLayout } from '~/components/Layout/DefaultLayout';
// import { HeaderOnly } from './components/Layout/HeaderOnly';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            // Nếu không có Layout được set thì sẽ lấy Layout mặc định 
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            };
            console.log("LOG__V____S__", route.layout);
            console.log("LOG__V_____", Layout);
            // const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.comment;
            return <Route key={index} path={route.path} element={
              <Layout children={<Page />}></Layout>
            } />
          })}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
