import IndexPage from "../pages/IndexPage/IndexPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import CreateOrder from "../components/CreateOrder/CreateOrder";
import CreateMenu from "../components/createMenu/CreateMenu";
import Basket from "../pages/CustomerPages/Basket";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/restaurante/registro" element={<RegisterPage />}></Route>
        <Route path="/restaurante/:id/menu" element={<CreateMenu />}></Route>

        <Route
          path="/:_id/:tableId/customer-order"
          element={<CreateOrder></CreateOrder>}
        ></Route>
        <Route
          path="/:_id/:tableId/display-order"
          element={<Basket></Basket>}
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
