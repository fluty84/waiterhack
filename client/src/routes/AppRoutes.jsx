import IndexPage from "../pages/IndexPage";
import RegisterPage from "../pages/registerPage/RegisterPage";

const { Routes, Route } = require("react-router-dom");



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage></IndexPage>}/>
      <Route path="/restaurante/registro" element={<RegisterPage></RegisterPage>}></Route>
    </Routes>
  );
};

export default AppRoutes;
