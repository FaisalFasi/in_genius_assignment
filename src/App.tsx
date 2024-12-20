import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/homePage";
import store from "./store/store";
import CourseDetailPage from "./pages/courseDetailPage";
import Layout from "./components/layout";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
