import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";

const { Routes, Route } = require("react-router-dom");



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />}/>
      <Route path="/restaurante/registro" element={<RegisterPage/>}></Route>
    </Routes>
  );
};

export default AppRoutes;
